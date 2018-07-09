//
//  JpushWeexPluginModule.m
//  WeexPluginTemp
//
//  Created by  on 17/3/14.
//  Copyright © 2017年 . All rights reserved.
//

#import "JPushWeexPluginModule.h"
#import <WeexPluginLoader/WeexPluginLoader.h>
#import <JPush/JPUSHService.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

@interface JPushWeexPluginModule() <JPUSHRegisterDelegate>
@property(assign, nonatomic)BOOL isJPushDidLogin;
@property(strong, nonatomic)WXModuleKeepAliveCallback receiveNotificationCallback;
@property(strong, nonatomic)WXModuleKeepAliveCallback receiveCustomMessageCallback;
@property(strong, nonatomic)WXModuleKeepAliveCallback openNotificationCallback;
@end

@implementation JpushWeexPluginModule

WX_PlUGIN_EXPORT_MODULE(jpushWeexPlugin, JpushWeexPluginModule)

+ (id)allocWithZone:(NSZone *)zone {
    static JpushWeexPluginModule *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

- (void)setupWithOption:(NSDictionary *)launchingOption
                 appKey:(NSString *)appKey
                channel:(NSString *)channel
       apsForProduction:(BOOL)isProduction {
    [JPUSHService setupWithOption:launchingOption
                           appKey:appKey
                          channel:channel
                 apsForProduction:isProduction];
    
    [WXJPushActionQueue sharedInstance].openedRemoteNotification = [launchingOption objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    
    if ([launchingOption objectForKey:UIApplicationLaunchOptionsLocalNotificationKey]) {
        UILocalNotification *localNotification = [launchingOption objectForKey:UIApplicationLaunchOptionsLocalNotificationKey];
        [WXJPushActionQueue sharedInstance].openedLocalNotification = localNotification.userInfo;
    }
}

- (id)init {
    self = [super init];
    
    NSNotificationCenter *defaultCenter = [NSNotificationCenter defaultCenter];
    
    [defaultCenter removeObserver:self];
    
    [defaultCenter addObserver:self
                      selector:@selector(networkConnecting:)
                          name:kJPFNetworkIsConnectingNotification
                        object:nil];
    
    [defaultCenter addObserver:self
                      selector:@selector(networkRegister:)
                          name:kJPFNetworkDidRegisterNotification
                        object:nil];
    
    [defaultCenter addObserver:self
                      selector:@selector(networkDidSetup:)
                          name:kJPFNetworkDidSetupNotification
                        object:nil];
    [defaultCenter addObserver:self
                      selector:@selector(networkDidClose:)
                          name:kJPFNetworkDidCloseNotification
                        object:nil];
    [defaultCenter addObserver:self
                      selector:@selector(networkDidLogin:)
                          name:kJPFNetworkDidLoginNotification
                        object:nil];
    [defaultCenter addObserver:self
                      selector:@selector(networkDidReceiveMessage:)
                          name:kJPFNetworkDidReceiveMessageNotification
                        object:nil];
    [defaultCenter addObserver:self
                      selector:@selector(receiveRemoteNotification:)
                          name:kJPFDidReceiveRemoteNotification
                        object:nil];
    
    [defaultCenter addObserver:self
                      selector:@selector(openNotification:)
                          name:kJPFOpenNotification
                        object:nil];
    
    return self;
}

- (void)dealloc {
    _isJPushDidLogin = NO;
    _receiveNotificationCallback = nil;
    _receiveCustomMessageCallback = nil;
    _openNotificationCallback = nil;
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)networkConnecting:(NSNotification *)notification {
    _isJPushDidLogin = false;
    
}

- (void)networkRegister:(NSNotification *)notification {
    _isJPushDidLogin = false;
}

- (void)networkDidSetup:(NSNotification *)notification {
    _isJPushDidLogin = false;
}

- (void)networkDidClose:(NSNotification *)notification {
    _isJPushDidLogin = false;
}


- (void)networkDidLogin:(NSNotification *)notification {
    _isJPushDidLogin = YES;
    [[WXJPushActionQueue sharedInstance] scheduleGetRidCallbacks];
}

- (void)networkDidReceiveMessage:(NSNotification *)notification {
    if ([WXJPushActionQueue sharedInstance].isJSDidLoad == YES) {
        NSDictionary *obj = [notification object];
        self.receiveCustomMessageCallback([self jpushFormatNotification:obj], true);
    } else {
        [[WXJPushActionQueue sharedInstance] postNotification:notification];
    }
}

- (void)receiveRemoteNotification:(NSNotification *)notification {
    if ([WXJPushActionQueue sharedInstance].isJSDidLoad == YES) {
        NSDictionary *obj = [notification object];
        self.receiveNotificationCallback([self jpushFormatNotification:obj], true);
    } else {
        [[WXJPushActionQueue sharedInstance] postNotification:notification];
    }
}

- (void)openNotification:(NSNotification *)notification {
    if ([WXJPushActionQueue sharedInstance].isJSDidLoad == YES) {
        NSDictionary *obj = [notification object];
        self.openNotificationCallback([self jpushFormatNotification:obj], true);
    } else {
        [[WXJPushActionQueue sharedInstance] postNotification:notification];
    }
}

- (NSMutableDictionary *)jpushFormatNotification:(NSDictionary *)dic {
    if (!dic) {
        return @[].mutableCopy;
    }
    if (dic.count == 0) {
        return @[].mutableCopy;
    }
    
    if (dic[@"aps"]) {
        return [self jpushFormatAPNSDic:dic];
    } else {
        return [self jpushFormatLocalNotificationDic:dic];
    }
}

- (NSMutableDictionary *)jpushFormatLocalNotificationDic:(NSDictionary *)dic {
    return [NSMutableDictionary dictionaryWithDictionary:dic];
}

- (NSMutableDictionary *)jpushFormatAPNSDic:(NSDictionary *)dic {
    NSMutableDictionary *extras = @{}.mutableCopy;
    for (NSString *key in dic) {
        if([key isEqualToString:@"_j_business"]      ||
           [key isEqualToString:@"_j_msgid"]         ||
           [key isEqualToString:@"_j_uid"]           ||
           [key isEqualToString:@"actionIdentifier"] ||
           [key isEqualToString:@"aps"]) {
            continue;
        }
        // 和 android 统一将 extras 字段移动到 extras 里面
        extras[key] = dic[key];
    }
    NSMutableDictionary *formatDic = dic.mutableCopy;
    formatDic[@"extras"] = extras;
    
    // 新增 应用状态
    switch ([UIApplication sharedApplication].applicationState) {
        case UIApplicationStateInactive:
            formatDic[@"appState"] = @"inactive";
            break;
        case UIApplicationStateActive:
            formatDic[@"appState"] = @"active";
            break;
        case UIApplicationStateBackground:
            formatDic[@"appState"] = @"background";
            break;
        default:
            break;
    }
    return formatDic;
}


WX_EXPORT_METHOD(@selector(setup:receiveCustomMsg:openNotification:))
- (void)setup:(WXModuleKeepAliveCallback) receiveNotificationCallback
        receiveCustomMsg:(WXModuleKeepAliveCallback) receiveCustomMessageCallback
        openNotification:(WXModuleKeepAliveCallback) openNotificationCallback {
    self.receiveNotificationCallback = receiveNotificationCallback;
    self.receiveCustomMessageCallback = receiveCustomMessageCallback;
    self.openNotificationCallback = openNotificationCallback;
    
    [WXJPushActionQueue sharedInstance].isJSDidLoad = YES;
    [[WXJPushActionQueue sharedInstance] scheduleNotificationQueue];
    
    if ([WXJPushActionQueue sharedInstance].openedRemoteNotification != nil) {
        [[NSNotificationCenter defaultCenter] postNotificationName:kJPFOpenNotificationToLaunchApp object:[WXJPushActionQueue sharedInstance].openedRemoteNotification];
    }
    
    if ([WXJPushActionQueue sharedInstance].openedLocalNotification != nil) {
        [[NSNotificationCenter defaultCenter] postNotificationName:kJPFOpenNotificationToLaunchApp object:[WXJPushActionQueue sharedInstance].openedLocalNotification];
    }
    
    if (_isJPushDidLogin) {
        [[NSNotificationCenter defaultCenter] postNotificationName:kJPFNetworkDidLoginNotification object:nil];
    } else {
        [[NSNotificationCenter defaultCenter] postNotificationName:kJPFNetworkDidCloseNotification object:nil];
    }
}
WX_EXPORT_METHOD(@selector(applyPushAuthority))
- (void)applyPushAuthority {
    JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
    entity.types = JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSound;
    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
}

WX_EXPORT_METHOD(@selector(setTags:success:fail:))
-(void)setTags: (NSArray *)tags
       success: (WXModuleKeepAliveCallback)success
          fail: (WXModuleKeepAliveCallback)fail {
    NSSet *tagSet;
    
    if (tags != NULL) {
        tagSet = [NSSet setWithArray:tags];
    }
    
    [JPUSHService setTags:tagSet completion:^(NSInteger iResCode, NSSet *iTags, NSInteger seq) {
        if (iResCode == 0) {
            success(@{@"tags": [iTags allObjects] ?: @[],
                 @"errorCode": @(0)}, false);
        } else {
            fail(@{@"errorCode": @(iResCode)}, false);
        }
    } seq: 0];
}

WX_EXPORT_METHOD(@selector(cleanTags:fail:))
-(void)cleanTags: (WXModuleKeepAliveCallback)success
           fail: (WXModuleKeepAliveCallback)fail {
    [JPUSHService cleanTags:^(NSInteger iResCode, NSSet *iTags, NSInteger seq) {
        if (iResCode == 0) {
            success(@{@"tags": iTags ? [iTags allObjects] : @[],
                 @"errorCode": @(0)}, false);
        } else {
            fail(@{@"errorCode": @(iResCode)}, false);
        }
    } seq: 0];
}

WX_EXPORT_METHOD(@selector(addTags:success:fail:))
-(void)addTags: (NSArray *)tags
       success: (WXModuleKeepAliveCallback)success
          fail: (WXModuleKeepAliveCallback)fail {
    NSSet *tagSet;
    
    if (tags != NULL) {
        tagSet = [NSSet setWithArray:tags];
    }
    
    [JPUSHService addTags:tagSet completion:^(NSInteger iResCode, NSSet *iTags, NSInteger seq) {
        if (iResCode == 0) {
            success(@{@"tags": [iTags allObjects] ?: @[],
                         @"errorCode": @(0)}, false);
        } else {
            fail(@{@"errorCode": @(iResCode)}, false);
        }
    } seq: 0];
}

WX_EXPORT_METHOD(@selector(deleteTags:success:fail:))
-(void)deleteTags: (NSArray *)tags
          success: (WXModuleKeepAliveCallback)success
             fail: (WXModuleKeepAliveCallback)fail {
    NSSet *tagSet;
    
    if (tags != NULL) {
        tagSet = [NSSet setWithArray:tags];
    }
    [JPUSHService deleteTags:tagSet completion:^(NSInteger iResCode, NSSet *iTags, NSInteger seq) {
        if (iResCode == 0) {
            success(@{@"tags": [iTags allObjects] ?: @[],
                 @"errorCode": @(0)}, false);
        } else {
            fail(@{@"errorCode": @(iResCode)}, false);
        }
    } seq: 0];
}

WX_EXPORT_METHOD(@selector(getAllTags:fail:))
- (void)getAllTags: (WXModuleKeepAliveCallback)success
              fail:(WXModuleKeepAliveCallback)fail {
    [JPUSHService getAllTags:^(NSInteger iResCode, NSSet *iTags, NSInteger seq) {
        if (iResCode == 0) {
            success(@{@"tags": iTags ? [iTags allObjects] : @[],
                         @"errorCode": @(0)
                         }, false);
        } else {
            fail(@{@"errorCode": @(iResCode)}, false);
        }
    } seq: 0];
}

WX_EXPORT_METHOD(@selector(setAlias:success:fail:))
-(void)setAlias: (NSString *)alias
        success: (WXModuleKeepAliveCallback)success
           fail: (WXModuleKeepAliveCallback)fail {
    
    [JPUSHService setAlias:alias completion:^(NSInteger iResCode, NSString *iAlias, NSInteger seq) {
        if (iResCode == 0) {
            success(@{@"alias": iAlias ?: @"",
                  @"errorCode": @(0)}, false);
        } else {
            fail(@{@"errorCode": @(iResCode)}, false);
        }
    } seq: 0];
}

WX_EXPORT_METHOD(@selector(deleteAlias:fail:))
-(void)deleteAlias: (WXModuleKeepAliveCallback)success
              fail: (WXModuleKeepAliveCallback)fail {
    
    [JPUSHService deleteAlias:^(NSInteger iResCode, NSString *iAlias, NSInteger seq) {
        if (iResCode == 0) {
            success(@{@"alias": iAlias ?: @"",
                  @"errorCode": @(0)}, false);
        } else {
            fail(@{@"errorCode": @(iResCode)}, false);
        }
    } seq: 0];
}

WX_EXPORT_METHOD(@selector(setBadge:))
-(void)setBadge: (NSNumber *)badge {
    [[UIApplication sharedApplication] setApplicationIconBadgeNumber: badge.integerValue];
    [JPUSHService setBadge: badge.integerValue > 0 ? badge.integerValue: 0];
    
}

WX_EXPORT_METHOD(@selector(stopPush))
-(void)stopPush {
    [[UIApplication sharedApplication] unregisterForRemoteNotifications];
}

WX_EXPORT_METHOD(@selector(resumePush))
-(void)resumePush {
    [self applyPushAuthority];
}

WX_EXPORT_METHOD(@selector(clearAllNotifications))
-(void)clearAllNotifications {
    [[UIApplication sharedApplication] setApplicationIconBadgeNumber: 0];
}

WX_EXPORT_METHOD(@selector(getLaunchAppNotification:))
-(void)getLaunchAppNotification: (WXModuleKeepAliveCallback)callback {
    NSDictionary *notification;
    if ([WXJPushActionQueue sharedInstance].openedRemoteNotification != nil) {
        notification = [self jpushFormatNotification: [WXJPushActionQueue sharedInstance].openedRemoteNotification];
        callback(notification, false);
        return;
    }
    
    if ([WXJPushActionQueue sharedInstance].openedLocalNotification != nil) {
        notification = [self jpushFormatNotification:[WXJPushActionQueue sharedInstance].openedLocalNotification];
        callback(notification, false);
        return;
    }
    
    callback(@{}, false);
}

WX_EXPORT_METHOD(@selector(getRegistrationID:))
-(void)getRegistrationID: (WXModuleKeepAliveCallback)callback {
#if TARGET_IPHONE_SIMULATOR//模拟器
    NSLog(@"simulator can not get registrationid");
    callback(@[@""], false);
#elif TARGET_OS_IPHONE//真机
    if (_isJPushDidLogin) {
        callback([JPUSHService registrationID], false);
    } else {
        [[WXJPushActionQueue sharedInstance] postGetRidCallback:callback];
    }
    
#endif
}


#ifdef NSFoundationVersionNumber_iOS_9_x_Max
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler
{
    NSDictionary * userInfo = notification.request.content.userInfo;
    if ([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [JPUSHService handleRemoteNotification:userInfo];
        [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
    }
    
    completionHandler(UNNotificationPresentationOptionAlert |
                      UNNotificationPresentationOptionSound |
                      UNNotificationPresentationOptionBadge);
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler
{
    NSDictionary * userInfo = response.notification.request.content.userInfo;
    if ([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [JPUSHService handleRemoteNotification:userInfo];
        [[NSNotificationCenter defaultCenter] postNotificationName:kJPFOpenNotification object:userInfo];
    }
    
    completionHandler();
}
#endif

@end
