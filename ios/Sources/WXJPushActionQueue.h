//
//  WXJPushActionQueue.h
//  JpushWeexPlugin
//
//  Created by oshumini on 2018/6/26.
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WeexSDK.h>

/**
 * 缓存类，
 * JS 未启动时 缓存接收的事件（notificaation he customMessage）。
 * JPush 未成功登陆时通过该类来缓存 JS 的操作。
 */
@interface WXJPushActionQueue : NSObject
@property BOOL isJSDidLoad;
@property NSDictionary* openedRemoteNotification;
@property NSDictionary* openedLocalNotification;
@property(strong,nonatomic)NSMutableArray<WXModuleKeepAliveCallback>* getRidCallbackArr;

+ (nonnull instancetype)sharedInstance;


- (void)postNotification:(NSNotification *)notification;
- (void)scheduleNotificationQueue;

- (void)postGetRidCallback:(WXModuleKeepAliveCallback) getRidCallback;
- (void)scheduleGetRidCallbacks;

@end
