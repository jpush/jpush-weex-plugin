const jpushWeexPlugin = weex.requireModule('jpushWeexPlugin');

var EventHandlers = {
    receiveNotification: [],
    openNotification: [],/** supported in iOS 10+  */
    receiveMessage: []  
};

const JPush = {
    /**
     * 初始化 JPush 必须先初始化才能执行其他操作(比如接收事件传递)
     */
    init: function() {
        jpushWeexPlugin.setup(function (notification) {
            for (var index in EventHandlers.receiveNotification) {
                EventHandlers.receiveNotification[index].apply(undefined, [notification])
              }
        }, function (notification) {
            for (var index in EventHandlers.openNotification) {
                EventHandlers.openNotification[index].apply(undefined, [notification])
              }
        }, function (message) {
            for (var index in EventHandlers.receiveMessage) {
                EventHandlers.receiveMessage[index].apply(undefined, [message])
              }
        });
    },
    /**
     * 申请推送权限当，注意这个方法只会向用户弹出一次推送权限请求（如果用户不同意，之后只能用户到设置页面里面勾选相应权限），需要开发者选择合适的时机调用。
     */
    applyPushAuthority: function () {
        jpushWeexPlugin.applyPushAuthority();
    },
    /**
     * 设置 Tag （会覆盖之前设置的 tags）
     * 
     * @param {Array} params = [String]
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    setTags: function(params, success, fail) {
        jpushWeexPlugin.setTags(params,success, fail);
    },
    /**
     * 清空所有 tags。
     * 
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    cleanTags: function(success, fail) {
        jpushWeexPlugin.cleanTags(success, fail);
    },
    /**
     * 在原有 tags 的基础上添加 tags
     * 
     * @param {Array} tags = [String]
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    addTags: function(params, success, fail) {
        jpushWeexPlugin.addTags(params, success, fail);
    },
    /**
     * 删除指定的 tags
     * 
     * @param {Array} tags = [String]
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    deleteTags: function(params, success, fail) {
        jpushWeexPlugin.deleteTags(params, success, fail);
    },
    /**
     * 获取所有当前绑定的 tags
     * 
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    getAllTags: function(success, fail) {
        jpushWeexPlugin.getAllTags(success, fail);
    },
    /**
     * 重置 alias.
     * 
     * @param {String} alias
     * 
     * @param {Function} success = ({"alias":String,"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    setAlias: function(params, success, fail) {
        jpushWeexPlugin.setAlias(params, success, fail);
    },
    /**
     * 删除原有 alias
     * 
     * @param {Function} success = ({"alias":String,"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    deleteAlias: function(success, fail) {
        jpushWeexPlugin.deleteAlias(success, fail);
    },
    /**
     * iOS Only
     * 设置应用 Badge（小红点）
     * 
     * @param {Int} badge
     */
    setBadge: function(params) {
        jpushWeexPlugin.setBadge(params);
    },
    /**
     * 停止接收推送，调用该方法后应用将不再受到推送，如果想要重新收到推送可以调用 resumePush。
     */
    stopPush: function() {
        jpushWeexPlugin.stopPush();
    },
    /**
     * 恢复推送功能。
     */
    resumePush: function() {
        jpushWeexPlugin.resumePush();
    },
    /**
     * 清空通知栏上的所有通知。
     */
    clearAllNotifications: function () {
        jpushWeexPlugin.clearAllNotifications();
    },
    /**
     * iOS Only
     * 点击推送启动应用的时候原生会将该 notification 缓存起来，该方法用于获取缓存 notification
     * 注意：notification 可能是 remoteNotification 和 localNotification，两种推送字段不一样。
     * 如果不是通过点击推送启动应用，比如点击应用 icon 直接启动应用，notification 会返回 @{}。
     * @param {Function} callback = (Object) => {}
     */
    getLaunchAppNotification: function(callback) {
        jpushWeexPlugin.getLaunchAppNotification(callback);
    },
    /**
     * 获取 RegistrationId, JPush 可以通过制定 RegistrationId 来进行推送。
     * 
     * * @param {Function} callback = (String) => {}
     */
    getRegistrationID: function(callback) {
        jpushWeexPlugin.getRegistrationID(callback);
    },
    /**
     * 监听：接收推送通知事件
     * 
     * @param {} listener = (Object）=> {}
     */
    addReceiveNotificationListener: function(listener) {
        EventHandlers.receiveNotification.push(listener);
    },
    /**
     * 取消监听：接收推送通知事件
     * 
     * @param {Function} listener = (Object）=> {}
     */
    removeReceiveNotificationListener: function(listener) {
        var handlerIndex = EventHandlers.receiveNotification.indexOf(listener)
        if (handlerIndex >= 0) {
          EventHandlers.receiveNotification.splice(handlerIndex, 1);
        }
    },
    /**
     * 添加监听：点击推送通知事件（iOS 10+ 才提供这个事件）
     * 
     * @param {Function} listener = (Object）=> {}
     */
    addReceiveOpenNotificationListener: function (listener) {
        EventHandlers.openNotification.push(listener);
    },
    /**
     * 取消监听：点击推送通知事件
     * 
     * @param {Function} listener = (Object）=> {}
     */
    removeReceiveOpenNotificationListener: function (listener) {
        var handlerIndex = EventHandlers.openNotification.indexOf(listener);
        if (handlerIndex >= 0) {
          EventHandlers.openNotification.splice(handlerIndex, 1);
        }
    },
    /**
     * 添加监听：自定义消息后事件，JPush 会和服务端建立一条长连接用于发送自定义消息（不走 apns 通道）
     * 
     * @param {Function} listener = (Object）=> {}
     */
    addReceiveCustomMsgListener: function (listener) {
        EventHandlers.receiveMessage.push(listener);
    },
    /**
     * 取消监听：自定义消息后事件
     */
    removeReceiveCustomMsgListener: function (listener) {
        var handlerIndex = EventHandlers.receiveMessage.indexOf(listener);
        if (handlerIndex >= 0) {
          EventHandlers.receiveMessage.splice(handlerIndex, 1);
        }
    }
}

module.exports = JPush;