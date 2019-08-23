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

      [[[JPushWeexPluginModule alloc] init] setupWithOption:launchOptions
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

目前支持本地集成，将 android/library 下载到本地,参考下面步骤配置：

- 修改setting.gradle配置：

> your weex project/android/setting.gradle

```java
  include ":jpush-weex-plugin"
  project (':jpush-weex-plugin').projectDir = new File("../../android/library") // 替换成下你载的插件路径

```

- 修改 app 下的 build.gradle 配置：

> your weex project/android/app/build.gradle

```java
android {
    defaultConfig {
        applicationId "yourApplicationId"
        ...
        manifestPlaceholders = [
                JPUSH_APPKEY: "yourAppKey",         //在此替换你的APPKey
                JPUSH_CHANNEL: "developer-default"  //在此替换你的channel
        ]
    }
}

...
dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation project(':jpush-weex-plugin')  // 添加 jpush weex 插件依赖

}
```

同时在 AndridManifest.xml 中添加如下代码

```
      <meta-data
          android:name="JPUSH_CHANNEL"
          android:value="${JPUSH_CHANNEL}" />
      <meta-data
          android:name="JPUSH_APPKEY"
          android:value="${JPUSH_APPKEY}" />
```

**操作完成后点击 AndroidStudio 的构建**

- 在 Application 中注册 JPush 插件

```
import org.weex.plugin.jpushweexplugin.JpushWeexPluginModule;
...
public class WXApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();
    ...
    WXSDKEngine.registerModule("jpushWeexPlugin", JpushWeexPluginModule.class);
  }

  ...
}

```

## APIs

参考 [./src/index.js](./src/index.js).

## Usage

导入 [index.js](./src/index.js) 文件。

```javascript
import JPush from "./src/index.js";

JPush.init();
```

Examples: [examples](./examples/index.vue)
