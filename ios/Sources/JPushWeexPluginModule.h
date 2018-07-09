//
//  JPushWeexPluginModule.h
//  WeexPluginTemp
//
//  Created by HuminiOS on 18/6/14.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WeexSDK.h>

#import "WXJPushActionQueue.h"

#define kJPFDidReceiveRemoteNotification  @"kJPFDidReceiveRemoteNotification"

#define kJPFOpenNotification @"kJPFOpenNotification" // 通过点击通知事件
#define kJPFOpenNotificationToLaunchApp @"kJPFOpenNotificationToLaunchApp" // 通过点击通知启动应用

@interface JPushWeexPluginModule : NSObject<WXModuleProtocol>
- (void)setupWithOption:(NSDictionary *)launchingOption
                 appKey:(NSString *)appKey
                channel:(NSString *)channel
       apsForProduction:(BOOL)isProduction;
@end
