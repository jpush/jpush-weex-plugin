//
//  WXJPushActionQueue.m
//  JpushWeexPlugin
//
//  Created by oshumini on 2018/6/26.
//

#import "WXJPushActionQueue.h"
#import "JpushWeexPluginModule.h"
#import <JPush/JPUSHService.h>

@interface WXJPushActionQueue () {
    NSMutableArray<NSNotification *>* _notificationQueue;
}

@end

@implementation WXJPushActionQueue

+ (nonnull instancetype)sharedInstance {
    static WXJPushActionQueue* sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [self new];
    });
    
    return sharedInstance;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.isJSDidLoad = NO;
        _notificationQueue = [NSMutableArray new];
        self.getRidCallbackArr = [NSMutableArray new];
    }
    
    return self;
}

- (void)postNotification:(NSNotification *)notification {
    if (!_notificationQueue) return;
    [_notificationQueue insertObject: notification atIndex:0];
}

- (void)scheduleNotificationQueue {
    for (NSNotification *notification in _notificationQueue) {
        [[NSNotificationCenter defaultCenter] postNotificationName:notification.name object: [notification object]];
    }
    [_notificationQueue removeAllObjects];
}

- (void)postGetRidCallback:(WXModuleKeepAliveCallback) getRidCallback {
    if (!self.getRidCallbackArr) return;
    [self.getRidCallbackArr addObject:getRidCallback];
}

- (void)scheduleGetRidCallbacks {
    if (self.getRidCallbackArr.count == 0) return;
    for (WXModuleKeepAliveCallback callback in self.getRidCallbackArr) {
        callback([JPUSHService registrationID], false);
    }
    [self.getRidCallbackArr removeAllObjects];
    
}
@end
