# jpush-weex-plugin

## Install

### iOS

- 通过 Pod 安装

```
$ pod install JPushWeexPlugin --save
```
- 将 [./src/index.js](./src/index.js) 文件添加到自己的工程中。

- 在 Appdelegate.m 中添加如下代码

  ```objective-c
  // 1. 添加头文件
  #ifdef NSFoundationVersionNumber_iOS_9_x_Max
  #import <UserNotifications/UserNotifications.h>
  #endif
  #import <JPush/JPUSHService.h>
  #import <JpushWeexPluginModule.h>

  // 2. 应用启动的时候初始化插件，(这个地方很重要)
  - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
  {
  // your code

      [[[JpushWeexPluginModule alloc] init] setupWithOption:launchOptions
                                                      appKey:@"a1703c14b186a68a66ef86c1"
                                                     channel:nil
                                            apsForProduction:nil];
  }

  // 3. 添加接收事件代码
  - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
  {
      [JPUSHService registerDeviceToken:deviceToken];
  }

  - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
  {
      [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  }

  - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
  {
      [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object: notification.userInfo];
  }

  - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler
  {
      [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  }
  ```


### Android



## APIs

参考 [./src/index.js](./src/index.js).

## Usage

导入 [index.js](./src/index.js) 文件。

```javascript
import JPush from './src/index.js';

JPush.init()
```

Examples: [examples](./examples/index.vue)

