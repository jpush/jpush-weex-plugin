<template>
	<div class="wrapper">
		<scroller class="scroller">

			<text class="greeting">JPush weex plugin demo</text>
			<div @click="init" class="button">
				<text style="color:#fff"> Init </text>
			</div>
			<div @click="getRegistrationID" class="button">
				<text style="color:#fff"> getRegistrationID </text>
			</div>

			<div @click="applyPushAuthority" class="button">
				<text style="color:#fff">applyPushAuthority</text>
			</div>

			<div @click="stopPush" class="button">
				<text style="color:#fff">stopPush</text>
			</div>

			<div @click="resumePush" class="button">
				<text style="color:#fff">resumePush</text>
			</div>

			<div @click="createAction" class="button">
				<text style="color:#fff">setbadge</text>
			</div>

			<div @click="setTag" class="button">
				<text style="color:#fff">setTag</text>
			</div>

			<div @click="cleanTag" class="button">
				<text style="color:#fff">cleanTag</text>
			</div>


			<div @click="addTags" class="button">
				<text style="color:#fff">addTags</text>
			</div>

			<div @click="deleteTags" class="button">
				<text style="color:#fff">deleteTags</text>
			</div>

			<div @click="getAllTags" class="button">
				<text style="color:#fff">getAllTags</text>
			</div>

			<div @click="setAlias" class="button">
				<text style="color:#fff">setAlias</text>
			</div>

			<div @click="deleteAlias" class="button">
				<text style="color:#fff">deleteAlias</text>
			</div>

			<div @click="clearAllNotifications" class="button">
				<text style="color:#fff">clearAllNotifications</text>
			</div>

			<div @click="getLaunchAppNotification" class="button">
				<text style="color:#fff">getLaunchAppNotification</text>
			</div>
		</scroller>	
  </div>
</template>

<style>
	.wrapper {
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 424px;
    height: 200px;
  }
  .greeting {
    text-align: center;
    margin-top: 20px;
		line-height: 80px;
    font-size: 36px;
    color: #41B883;
  }
  .message {
    margin: 30px;
		margin-top:70px;	
    font-size: 26px;
    color: #727272;
  }
	.button {
		margin: 20px;
		padding:20px;
		background-color:#1ba1e2;
		color:#fff;
	}
</style>

<script>	
	import JPush from '../src/index.js';

	
	JPush.addReceiveNotificationListener(function (notification) {
		console.log('vue console111' + JSON.stringify(notification))
	})

	JPush.addReceiveNotificationListener(function (notification) {
		console.log('vue console2222' + JSON.stringify(notification))
	})

	JPush.init() // 初始化 JPush 插件，如果没有调用这个方法，JS 端将不会收到相关事件。
	JPush.applyPushAuthority() // 申请推送权限

	module.exports = {
		data: {
			logo: 'http://img1.vued.vanthink.cn/vued08aa73a9ab65dcbd360ec54659ada97c.png',
		},
		methods: {
			createAction: function() {
				JPush.setBadge(88)
			},
			init: function() {
				JPush.init()
			},
			getRegistrationID: function() {
				JPush.getRegistrationID( (res) => {
					console.log('getRegistrationID' + JSON.stringify(res))
				})
			},
			applyPushAuthority: function() {
				JPush.applyPushAuthority();
			},
			stopPush: function() {
				JPush.stopPush();
			},
			resumePush: function() {
				JPush.resumePush();
			},
			setTag: function() {
				JPush.setTags(['11','22','33'], (res) => {
					console.log('setTag' + JSON.stringify(res))
				}, (err) => {
					console.log('error' + JSON.stringify(err))
				})
			},
			cleanTag: function() {
				JPush.cleanTags((res) => {
					console.log('cleanTags' + JSON.stringify(res))
				}, (err) => {
					console.log('error' + JSON.stringify(err))
				})
			},
			addTags: function() {
				JPush.addTags(['11','22','33'], (res) => {
					console.log('setTag' + JSON.stringify(res))
				}, (err) => {
					console.log('error' + JSON.stringify(err))
				})
			},
			deleteTags: function() {
				JPush.deleteTags(['11','22','33'], (res) => {
					console.log('setTag' + JSON.stringify(res))
				}, (err) => {
					console.log('error' + JSON.stringify(err))
				})
			},
			getAllTags: function() {
				JPush.getAllTags((res) => {
					console.log('cleanTags' + JSON.stringify(res))
				}, (err) => {
					console.log('error' + JSON.stringify(err))
				})
			},
			setAlias: function() {
				JPush.setAlias('thealias', (res) => {
					console.log('setAlias' + JSON.stringify(res))
				}, (err) => {
					console.log('error' + JSON.stringify(err))
				})
			},
			deleteAlias: function() {
				// JPush.deleteAlias((res) => {
				// 	console.log('deleteAlias' + JSON.stringify(res))
				// }, (err) => {
				// 	console.log('error' + JSON.stringify(err))
				// });

				JPush.deleteAlias((res) => {
					console.log('cleanTags' + JSON.stringify(res))
				}, (err) => {
					console.log('error' + JSON.stringify(err))
				})
			},
			clearAllNotifications: function() {
				JPush.clearAllNotifications();
			},
			getLaunchAppNotification: function() {
				JPush.getLaunchAppNotification((not) => {
					console.log('getLaunchAppNotification' + JSON.stringify(not));
				})
			}
		}
	}
</script>

<style scoped>
  .scroller {
		width: 700px;
    height: 1200px;
    margin: 10px;
  }
</style>