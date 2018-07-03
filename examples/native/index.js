// { "framework": "Vue" } 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(1)
)
__vue_styles__.push(__webpack_require__(2)
)

/* script */
__vue_exports__ = __webpack_require__(3)

/* template */
var __vue_template__ = __webpack_require__(5)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/HuminiOS/Desktop/myproject/weex/jpush-weex-plugin/examples/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-088b570f"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "justifyContent": "center",
    "alignItems": "center"
  },
  "logo": {
    "width": "424",
    "height": "200"
  },
  "greeting": {
    "textAlign": "center",
    "marginTop": "20",
    "lineHeight": "80",
    "fontSize": "36",
    "color": "#41B883"
  },
  "message": {
    "marginTop": "70",
    "marginRight": "30",
    "marginBottom": "30",
    "marginLeft": "30",
    "fontSize": "26",
    "color": "#727272"
  },
  "button": {
    "marginTop": "20",
    "marginRight": "20",
    "marginBottom": "20",
    "marginLeft": "20",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "backgroundColor": "#1ba1e2",
    "color": "#ffffff"
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  "scroller": {
    "width": "700",
    "height": "1200",
    "marginTop": "10",
    "marginRight": "10",
    "marginBottom": "10",
    "marginLeft": "10"
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.addReceiveNotificationListener(function (notification) {
	console.log('vue console111' + JSON.stringify(notification));
}); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

_index2.default.addReceiveNotificationListener(function (notification) {
	console.log('vue console2222' + JSON.stringify(notification));
});

_index2.default.init(); // 初始化 JPush 插件，如果没有调用这个方法，JS 端将不会收到相关事件。
_index2.default.applyPushAuthority(); // 申请推送权限

module.exports = {
	data: {
		logo: 'http://img1.vued.vanthink.cn/vued08aa73a9ab65dcbd360ec54659ada97c.png'
	},
	methods: {
		createAction: function createAction() {
			_index2.default.setBadge(88);
		},
		init: function init() {
			_index2.default.init();
		},
		getRegistrationID: function getRegistrationID() {
			_index2.default.getRegistrationID(function (res) {
				console.log('getRegistrationID' + JSON.stringify(res));
			});
		},
		applyPushAuthority: function applyPushAuthority() {
			_index2.default.applyPushAuthority();
		},
		stopPush: function stopPush() {
			_index2.default.stopPush();
		},
		resumePush: function resumePush() {
			_index2.default.resumePush();
		},
		setTag: function setTag() {
			_index2.default.setTags(['11', '22', '33'], function (res) {
				console.log('setTag' + JSON.stringify(res));
			}, function (err) {
				console.log('error' + JSON.stringify(err));
			});
		},
		cleanTag: function cleanTag() {
			_index2.default.cleanTags(function (res) {
				console.log('cleanTags' + JSON.stringify(res));
			}, function (err) {
				console.log('error' + JSON.stringify(err));
			});
		},
		addTags: function addTags() {
			_index2.default.addTags(['11', '22', '33'], function (res) {
				console.log('setTag' + JSON.stringify(res));
			}, function (err) {
				console.log('error' + JSON.stringify(err));
			});
		},
		deleteTags: function deleteTags() {
			_index2.default.deleteTags(['11', '22', '33'], function (res) {
				console.log('setTag' + JSON.stringify(res));
			}, function (err) {
				console.log('error' + JSON.stringify(err));
			});
		},
		getAllTags: function getAllTags() {
			_index2.default.getAllTags(function (res) {
				console.log('cleanTags' + JSON.stringify(res));
			}, function (err) {
				console.log('error' + JSON.stringify(err));
			});
		},
		setAlias: function setAlias() {
			_index2.default.setAlias('thealias', function (res) {
				console.log('setAlias' + JSON.stringify(res));
			}, function (err) {
				console.log('error' + JSON.stringify(err));
			});
		},
		deleteAlias: function deleteAlias() {
			// JPush.deleteAlias((res) => {
			// 	console.log('deleteAlias' + JSON.stringify(res))
			// }, (err) => {
			// 	console.log('error' + JSON.stringify(err))
			// });

			_index2.default.deleteAlias(function (res) {
				console.log('cleanTags' + JSON.stringify(res));
			}, function (err) {
				console.log('error' + JSON.stringify(err));
			});
		},
		clearAllNotifications: function clearAllNotifications() {
			_index2.default.clearAllNotifications();
		},
		getLaunchAppNotification: function getLaunchAppNotification() {
			_index2.default.getLaunchAppNotification(function (not) {
				console.log('getLaunchAppNotification' + JSON.stringify(not));
			});
		}
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jpushWeexPlugin = weex.requireModule('jpushWeexPlugin');

var EventHandlers = {
    receiveNotification: [],
    openNotification: [], /** supported in iOS 10+  */
    receiveMessage: []
};

var JPush = {
    /**
     * 初始化 JPush 必须先初始化才能执行其他操作(比如接收事件传递)
     */
    init: function init() {
        jpushWeexPlugin.setup(function (notification) {
            for (var index in EventHandlers.receiveNotification) {
                EventHandlers.receiveNotification[index].apply(undefined, [notification]);
            }
        }, function (notification) {
            for (var index in EventHandlers.openNotification) {
                EventHandlers.openNotification[index].apply(undefined, [notification]);
            }
        }, function (message) {
            for (var index in EventHandlers.receiveMessage) {
                EventHandlers.receiveMessage[index].apply(undefined, [message]);
            }
        });
    },
    /**
     * 申请推送权限当，注意这个方法只会向用户弹出一次推送权限请求（如果用户不同意，之后只能用户到设置页面里面勾选相应权限），需要开发者选择合适的时机调用。
     */
    applyPushAuthority: function applyPushAuthority() {
        jpushWeexPlugin.applyPushAuthority();
    },
    /**
     * 设置 Tag （会覆盖之前设置的 tags）
     * 
     * @param {Array} params = [String]
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    setTags: function setTags(params, success, fail) {
        jpushWeexPlugin.setTags(params, success, fail);
    },
    /**
     * 清空所有 tags。
     * 
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    cleanTags: function cleanTags(success, fail) {
        jpushWeexPlugin.cleanTags(success, fail);
    },
    /**
     * 在原有 tags 的基础上添加 tags
     * 
     * @param {Array} tags = [String]
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    addTags: function addTags(params, success, fail) {
        jpushWeexPlugin.addTags(params, success, fail);
    },
    /**
     * 删除指定的 tags
     * 
     * @param {Array} tags = [String]
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    deleteTags: function deleteTags(params, success, fail) {
        jpushWeexPlugin.deleteTags(params, success, fail);
    },
    /**
     * 获取所有当前绑定的 tags
     * 
     * @param {Function} success = ({"tags":[String],"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    getAllTags: function getAllTags(success, fail) {
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
    setAlias: function setAlias(params, success, fail) {
        jpushWeexPlugin.setAlias(params, success, fail);
    },
    /**
     * 删除原有 alias
     * 
     * @param {Function} success = ({"alias":String,"errorCode":int}) => {  }
     * @param {Function} fail = ({"errorCode":int}) => {  }
     */
    deleteAlias: function deleteAlias(success, fail) {
        jpushWeexPlugin.deleteAlias(success, fail);
    },
    /**
     * iOS Only
     * 设置应用 Badge（小红点）
     * 
     * @param {Int} badge
     */
    setBadge: function setBadge(params) {
        jpushWeexPlugin.setBadge(params);
    },
    /**
     * 停止接收推送，调用该方法后应用将不再受到推送，如果想要重新收到推送可以调用 resumePush。
     */
    stopPush: function stopPush() {
        jpushWeexPlugin.stopPush();
    },
    /**
     * 恢复推送功能。
     */
    resumePush: function resumePush() {
        jpushWeexPlugin.resumePush();
    },
    /**
     * 清空通知栏上的所有通知。
     */
    clearAllNotifications: function clearAllNotifications() {
        jpushWeexPlugin.clearAllNotifications();
    },
    /**
     * iOS Only
     * 点击推送启动应用的时候原生会将该 notification 缓存起来，该方法用于获取缓存 notification
     * 注意：notification 可能是 remoteNotification 和 localNotification，两种推送字段不一样。
     * 如果不是通过点击推送启动应用，比如点击应用 icon 直接启动应用，notification 会返回 @{}。
     * @param {Function} callback = (Object) => {}
     */
    getLaunchAppNotification: function getLaunchAppNotification(callback) {
        jpushWeexPlugin.getLaunchAppNotification(callback);
    },
    /**
     * 获取 RegistrationId, JPush 可以通过制定 RegistrationId 来进行推送。
     * 
     * * @param {Function} callback = (String) => {}
     */
    getRegistrationID: function getRegistrationID(callback) {
        jpushWeexPlugin.getRegistrationID(callback);
    },
    /**
     * 监听：接收推送通知事件
     * 
     * @param {} listener = (Object）=> {}
     */
    addReceiveNotificationListener: function addReceiveNotificationListener(listener) {
        EventHandlers.receiveNotification.push(listener);
    },
    /**
     * 取消监听：接收推送通知事件
     * 
     * @param {Function} listener = (Object）=> {}
     */
    removeReceiveNotificationListener: function removeReceiveNotificationListener(listener) {
        var handlerIndex = EventHandlers.receiveNotification.indexOf(listener);
        if (handlerIndex >= 0) {
            EventHandlers.receiveNotification.splice(handlerIndex, 1);
        }
    },
    /**
     * 添加监听：点击推送通知事件（iOS 10+ 才提供这个事件）
     * 
     * @param {Function} listener = (Object）=> {}
     */
    addReceiveOpenNotificationListener: function addReceiveOpenNotificationListener(listener) {
        EventHandlers.openNotification.push(listener);
    },
    /**
     * 取消监听：点击推送通知事件
     * 
     * @param {Function} listener = (Object）=> {}
     */
    removeReceiveOpenNotificationListener: function removeReceiveOpenNotificationListener(listener) {
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
    addReceiveCustomMsgListener: function addReceiveCustomMsgListener(listener) {
        EventHandlers.receiveMessage.push(listener);
    },
    /**
     * 取消监听：自定义消息后事件
     */
    removeReceiveCustomMsgListener: function removeReceiveCustomMsgListener(listener) {
        var handlerIndex = EventHandlers.receiveMessage.indexOf(listener);
        if (handlerIndex >= 0) {
            EventHandlers.receiveMessage.splice(handlerIndex, 1);
        }
    }
};

module.exports = JPush;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('scroller', {
    staticClass: ["scroller"]
  }, [_c('text', {
    staticClass: ["greeting"]
  }, [_vm._v("JPush weex plugin demo")]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.init
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v(" Init ")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.getRegistrationID
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v(" getRegistrationID ")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.applyPushAuthority
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("applyPushAuthority")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.stopPush
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("stopPush")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.resumePush
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("resumePush")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.createAction
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("setbadge")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.setTag
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("setTag")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.cleanTag
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("cleanTag")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.addTags
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("addTags")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.deleteTags
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("deleteTags")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.getAllTags
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("getAllTags")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.setAlias
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("setAlias")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.deleteAlias
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("deleteAlias")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.clearAllNotifications
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("clearAllNotifications")])]), _c('div', {
    staticClass: ["button"],
    on: {
      "click": _vm.getLaunchAppNotification
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("getLaunchAppNotification")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);