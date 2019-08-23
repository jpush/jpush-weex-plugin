package org.weex.plugin.jpushweexplugin;

import android.app.ActivityManager;
import android.app.AppOpsManager;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.os.Build;
import android.os.Bundle;
import android.util.SparseArray;

import com.alibaba.weex.plugin.annotation.WeexModule;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.jpush.android.api.JPushInterface;
import cn.jpush.android.api.JPushMessage;
import cn.jpush.android.service.JPushMessageReceiver;

@WeexModule(name = "jpushWeexPlugin")
public class JpushWeexPluginModule extends WXModule {

    private static String TAG = "JpushWeexPluginModule";
    private Context mContext;
    private static String mEvent;
    private static String mRidEvent;
    private static String mConnectEvent;
    private static Bundle mCachedBundle;
    private static Bundle mRidBundle;
    private static Bundle mConnectCachedBundle;

    private final static String RECEIVE_NOTIFICATION = "receiveNotification";
    private final static String RECEIVE_CUSTOM_MESSAGE = "receivePushMsg";
    private final static String OPEN_NOTIFICATION = "openNotification";
    private final static String RECEIVE_REGISTRATION_ID = "getRegistrationId";
    private final static String CONNECTION_CHANGE = "connectionChange";

    private static SparseArray<JSCallback> sCacheMap = new SparseArray<>();
    private static JSCallback mGetRidCallback;

    private static JSCallback mReceiveNotification;
    private static JSCallback mOpenNotification;
    private static JSCallback mReceiveMessage;

    @JSMethod (uiThread = true)
    public void setup(JSCallback receiveNotification,JSCallback openNotification,JSCallback receiveMessage) {

        mContext=mWXSDKInstance.getContext();


        JPushInterface.init(mContext);
        mReceiveNotification =receiveNotification;
        mOpenNotification =openNotification;
        mReceiveMessage = receiveMessage;
        sendEvent();

        Logger.i(TAG, "init Jpush.");

    }

    @JSMethod (uiThread = true)
    public void setDebugMode(boolean debug) {
        JPushInterface.setDebugMode(debug);
        Logger.SHUTDOWNLOG = !debug;
        Logger.SHUTDOWNTOAST = !debug;
        Logger.i(TAG, "setDebugMode:"+debug);
    }

    @JSMethod (uiThread = true)
    public void stopPush() {
        mContext = mWXSDKInstance.getContext();
        JPushInterface.stopPush(mWXSDKInstance.getContext());
        Logger.i(TAG, "Stop push");
    }

    @JSMethod (uiThread = true)
    public void hasPermission(JSCallback callback) {
        callback.invoke(hasPermission("OP_POST_NOTIFICATION"));
    }



    @JSMethod (uiThread = true)
    public void resumePush() {
        mContext =  mWXSDKInstance.getContext();
        JPushInterface.resumePush( mWXSDKInstance.getContext());
        Logger.i(TAG, "Resume push");
    }

    @JSMethod (uiThread = true)
    public void crashLogOFF() {
        JPushInterface.stopCrashHandler( mWXSDKInstance.getContext());
    }

    @JSMethod (uiThread = true)
    public void crashLogON() {
        JPushInterface.initCrashHandler(mWXSDKInstance.getContext());
    }



    private static void sendEvent() {
        if (mEvent != null) {
            Logger.i(TAG, "Sending event : " + mEvent);
            Map<String,Object> map = new HashMap<>();
            switch (mEvent) {
                case RECEIVE_CUSTOM_MESSAGE:

                    map.put("id", mCachedBundle.getInt(JPushInterface.EXTRA_NOTIFICATION_ID));
                    map.put("message", mCachedBundle.getString(JPushInterface.EXTRA_MESSAGE));
                    map.put("content", mCachedBundle.getString(JPushInterface.EXTRA_MESSAGE));
                    map.put("content_type", mCachedBundle.getString(JPushInterface.EXTRA_CONTENT_TYPE));
                    map.put("title", mCachedBundle.getString(JPushInterface.EXTRA_TITLE));
                    map.put("extras", mCachedBundle.getString(JPushInterface.EXTRA_EXTRA));
                    mReceiveMessage.invokeAndKeepAlive(map);
                    break;
                case RECEIVE_NOTIFICATION:
                    map.put("id", mCachedBundle.getInt(JPushInterface.EXTRA_NOTIFICATION_ID));
                    map.put("alertContent", mCachedBundle.getString(JPushInterface.EXTRA_ALERT));
                    map.put("extras", mCachedBundle.getString(JPushInterface.EXTRA_EXTRA));
                    mReceiveNotification.invokeAndKeepAlive(map);
                    break;
                case OPEN_NOTIFICATION:
                    map.put("id", mCachedBundle.getInt(JPushInterface.EXTRA_NOTIFICATION_ID));
                    map.put("alertContent", mCachedBundle.getString(JPushInterface.EXTRA_ALERT));
                    map.put("extras", mCachedBundle.getString(JPushInterface.EXTRA_EXTRA));
                    mOpenNotification.invokeAndKeepAlive(map);
                    break;
            }

            mEvent = null;
            mCachedBundle = null;
        }

//        if (mRidEvent != null) {
//            Logger.i(TAG, "Sending ridevent : " + mRidEvent);
//            if (mGetRidCallback != null) {
//                mGetRidCallback.invoke(mRidBundle.getString(JPushInterface.EXTRA_REGISTRATION_ID));
//                mGetRidCallback = null;
//            }
//            mWXSDKInstance.fireGlobalEventCallback(mRidEvent, mRidBundle.getString(JPushInterface.EXTRA_REGISTRATION_ID));
//            mRidEvent = null;
//            mRidBundle = null;
//        }
//
//        if (mConnectEvent != null) {
//            Logger.i(TAG, "Sending connectevent : " + mConnectEvent);
//            if (mConnectCachedBundle != null) {
//                mRAC.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(mConnectEvent,
//                        mConnectCachedBundle.getBoolean(JPushInterface.EXTRA_CONNECTION_CHANGE, false));
//            }
//            mConnectEvent = null;
//            mConnectCachedBundle = null;
//        }
    }


    /**
     * JPush v3.0.7 Add this API
     * See document https://docs.jiguang.cn/jpush/client/Android/android_api/#aliastag for detail
     * Set tags
     * @param tags tags array
     * @param callback callback
     */
    @JSMethod (uiThread = true)
    public void setTags(final String[] tags, final JSCallback callback) {
        int sequence = getSequence();
        Logger.i(TAG, "sequence: " + sequence);
        sCacheMap.put(sequence, callback);
        Logger.i(TAG, "tag: " + tags[0]);
        Set<String> tagSet = getSet(tags);
        JPushInterface.setTags(mWXSDKInstance.getContext(), sequence, tagSet);
    }

    private int getSequence() {
        SimpleDateFormat sdf = new SimpleDateFormat("MMddHHmmss");
        String date = sdf.format(new Date());
        return Integer.valueOf(date);
    }

    /**
     * JPush v3.0.7 Add this API
     * See document https://docs.jiguang.cn/jpush/client/Android/android_api/#aliastag for detail
     * @param tags tags to be added
     * @param callback callback
     */
    @JSMethod (uiThread = true)
    public void addTags(String[]  tags, JSCallback callback) {
        int sequence = getSequence();
        Logger.i(TAG, "tags to be added: " + tags.toString() + " sequence: " + sequence);
        sCacheMap.put(sequence, callback);
        Set<String> tagSet = getSet(tags);
        JPushInterface.addTags(mWXSDKInstance.getContext(), sequence, tagSet);
    }

    /**
     * JPush v3.0.7 Add this API
     * See document https://docs.jiguang.cn/jpush/client/Android/android_api/#aliastag for detail
     * @param tags tags to be deleted
     * @param callback callback
     */
    @JSMethod (uiThread = true)
    public void deleteTags(String[] tags, JSCallback callback) {
        int sequence = getSequence();
        Logger.i(TAG, "tags to be deleted: " + tags.toString() + " sequence: " + sequence);
        sCacheMap.put(sequence, callback);
        Set<String> tagSet = getSet(tags);
        JPushInterface.deleteTags(mWXSDKInstance.getContext(), sequence, tagSet);
    }

    /**
     *  JPush v3.0.7 Add this API
     * See document https://docs.jiguang.cn/jpush/client/Android/android_api/#aliastag for detail
     * Clean all tags
     * @param callback callback
     */
    @JSMethod (uiThread = true)
    public void cleanTags(JSCallback callback) {
        int sequence = getSequence();
        sCacheMap.put(sequence, callback);
        Logger.i(TAG, "Will clean all tags, sequence: " + sequence);
        JPushInterface.cleanTags(mWXSDKInstance.getContext(), sequence);
    }

    /**
     *  JPush v3.0.7 Add this API
     * See document https://docs.jiguang.cn/jpush/client/Android/android_api/#aliastag for detail
     * Get all tags
     * @param callback callback
     */
    @JSMethod (uiThread = true)
    public void getAllTags(JSCallback callback) {
        int sequence = getSequence();
        sCacheMap.put(sequence, callback);
        Logger.i(TAG, "Get all tags, sequence: " + sequence);
        JPushInterface.getAllTags(mWXSDKInstance.getContext(), sequence);
    }


    /**
     *  JPush v3.0.7 Add this API
     * See document https://docs.jiguang.cn/jpush/client/Android/android_api/#aliastag for detail
     * Set alias
     * @param alias alias to be set
     */
    @JSMethod (uiThread = true)
    public void setAlias(String alias, JSCallback callback) {
        int sequence = getSequence();
        Logger.i(TAG, "Set alias, sequence: " + sequence);
        sCacheMap.put(sequence, callback);
        JPushInterface.setAlias(mWXSDKInstance.getContext(), sequence, alias);
    }

    /**
     *  JPush v3.0.7 Add this API
     * See document https://docs.jiguang.cn/jpush/client/Android/android_api/#aliastag for detail
     * Delete alias
     * @param callback callback
     */
    @JSMethod (uiThread = true)
    public void deleteAlias(JSCallback callback) {
        int sequence = getSequence();
        Logger.i(TAG,"Delete alias, sequence: " + sequence);
        sCacheMap.put(sequence, callback);
        JPushInterface.deleteAlias(mWXSDKInstance.getContext(), sequence);
    }

    /**
     *  JPush v3.0.7 Add this API
     * See document https://docs.jiguang.cn/jpush/client/Android/android_api/#aliastag for detail
     * Get alias
     * @param callback callback
     */
    @JSMethod (uiThread = true)
    public void getAlias(JSCallback callback) {
        int sequence = getSequence();
        Logger.i(TAG,"Get alias, sequence: " + sequence);
        sCacheMap.put(sequence, callback);
        JPushInterface.getAlias(mWXSDKInstance.getContext(), sequence);
    }

    private Set<String> getSet(String[] strArray) {
        Set<String> tagSet = new LinkedHashSet<>();
        for (int i = 0; i < strArray.length; i++) {
            if (!ExampleUtil.isValidTagAndAlias(strArray[i])) {
                Logger.w(TAG, strArray[i]+" is invalid tag !");

            }
            tagSet.add(strArray[i]);
        }
        return tagSet;
    }

    /**
     * Get registration id, different from JPushModule.addGetRegistrationIdListener, this
     * method has no calling limits.
     *
     * @param callback callback with registrationId
     */
    @JSMethod (uiThread = true)
    public void getRegistrationID(JSCallback callback) {
        try {
            String id = JPushInterface.getRegistrationID(mWXSDKInstance.getContext());
            Logger.i(TAG, "getRegistrationID:"+id);
            if (id != null) {
                callback.invoke(id);
            } else {
                mGetRidCallback = callback;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @JSMethod (uiThread = true)
    public void getConnectionState(JSCallback callback) {
        callback.invoke(JPushInterface.getConnectionState(mWXSDKInstance.getContext()));
    }

    /**
     * Clear all notifications, suggest invoke this method while exiting app.
     */
    @JSMethod (uiThread = true)
    public void clearAllNotifications() {
        JPushInterface.clearAllNotifications(mWXSDKInstance.getContext());
    }



    /**
     * Clear specified notification
     *
     * @param id the notification id
     */
    @JSMethod (uiThread = true)
    public void clearNotificationById(int id) {
        try {
            JPushInterface.clearNotificationById(mWXSDKInstance.getContext(), id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @JSMethod (uiThread = true)
    public void setLatestNotificationNumber(int number) {
        try {
            mContext = mWXSDKInstance.getContext();
            JPushInterface.setLatestNotificationNumber(mContext, number);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 接收自定义消息,通知,通知点击事件等事件的广播
     * 文档链接:http://docs.jiguang.cn/client/android_api/
     */
    public static class JPushReceiver extends BroadcastReceiver {

        public JPushReceiver() {
        }

        @Override
        public void onReceive(Context context, Intent data) {

            if (JPushInterface.ACTION_MESSAGE_RECEIVED.equals(data.getAction())) {
                mCachedBundle = data.getExtras();
                try {
                    String message = data.getStringExtra(JPushInterface.EXTRA_MESSAGE);
                    Logger.i(TAG, "收到自定义消息: " + message);
                    mEvent = RECEIVE_CUSTOM_MESSAGE;
                    if (mReceiveMessage != null) {
                        sendEvent();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else if (JPushInterface.ACTION_NOTIFICATION_RECEIVED.equals(data.getAction())) {
                mCachedBundle = data.getExtras();
                try {
                    // 通知内容
                    String alertContent = mCachedBundle.getString(JPushInterface.EXTRA_ALERT);
                    // extra 字段的 json 字符串
                    String extras = mCachedBundle.getString(JPushInterface.EXTRA_EXTRA);
                    Logger.i(TAG, "收到推送下来的通知: " + alertContent);
                    Logger.i(TAG, "extras: " + extras);
                    mEvent = RECEIVE_NOTIFICATION;
                    if (mReceiveNotification != null) {
                        sendEvent();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else if (JPushInterface.ACTION_NOTIFICATION_OPENED.equals(data.getAction())) {
                mCachedBundle = data.getExtras();
                try {
                    Logger.d(TAG, "用户点击打开了通知");
                    // 通知内容
                    String alertContent = mCachedBundle.getString(JPushInterface.EXTRA_ALERT);
                    // extra 字段的 json 字符串
                    String extras = mCachedBundle.getString(JPushInterface.EXTRA_EXTRA);
                    Intent intent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                    intent.putExtras(mCachedBundle);
                    context.startActivity(intent);
                    mEvent = OPEN_NOTIFICATION;
                    if (mOpenNotification != null) {
                        sendEvent();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    Logger.i(TAG, "Shouldn't access here");
                }
                // 应用注册完成后会发送广播，在 JS 中 JPushModule.addGetRegistrationIdListener 接口可以第一时间得到 registrationId
                // After JPush finished registering, will send this broadcast, use JPushModule.addGetRegistrationIdListener
                // to get registrationId in the first instance.
            } else if (JPushInterface.ACTION_REGISTRATION_ID.equals(data.getAction())) {
                mRidBundle = data.getExtras();
                try {
                    mRidEvent = RECEIVE_REGISTRATION_ID;
//                    if (mRAC != null) {
                        sendEvent();
//                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else if (JPushInterface.ACTION_CONNECTION_CHANGE.equals(data.getAction())) {
                mConnectCachedBundle = data.getExtras();
                try {
                    mConnectEvent = CONNECTION_CHANGE;
//                    if (mRAC != null) {
                        sendEvent();
//                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public static class MyJPushMessageReceiver extends JPushMessageReceiver {

        @Override
        public void onTagOperatorResult(Context context, JPushMessage jPushMessage) {
            String log = "action - onTagOperatorResult, sequence:" + jPushMessage.getSequence()
                    + ", tags: " + jPushMessage.getTags();
            Logger.i(TAG, log);
            Logger.toast(context, log);
            Logger.i(TAG,"tags size:"+jPushMessage.getTags().size());
            JSCallback callback = sCacheMap.get(jPushMessage.getSequence());
            if (null != callback) {
                Map<String, Object> map = new HashMap<>();
                Set<String> tags = jPushMessage.getTags();
                String[] array = tags.toArray(new String[0]);

                map.put("tags", array);
                map.put("errorCode", jPushMessage.getErrorCode());
                callback.invoke(map);
                sCacheMap.remove(jPushMessage.getSequence());
            } else {
                Logger.i(TAG, "Unexpected error, null callback!");
            }
            super.onTagOperatorResult(context, jPushMessage);
        }
        @Override
        public void onCheckTagOperatorResult(Context context,JPushMessage jPushMessage){
            String log = "action - onCheckTagOperatorResult, sequence:" + jPushMessage.getSequence()
                    + ", checktag: " + jPushMessage.getCheckTag();
            Logger.i(TAG, log);
            Logger.toast(context, log);
            JSCallback callback = sCacheMap.get(jPushMessage.getSequence());
            if (null != callback) {
                Map<String, Object> map = new HashMap<>();
                map.put("errorCode", jPushMessage.getErrorCode());
                map.put("tag", jPushMessage.getCheckTag());
                map.put("bindState", jPushMessage.getTagCheckStateResult());
                callback.invoke(map);
                sCacheMap.remove(jPushMessage.getSequence());
            } else {
                Logger.i(TAG, "Unexpected error, null callback!");
            }
            super.onCheckTagOperatorResult(context, jPushMessage);
        }
        @Override
        public void onAliasOperatorResult(Context context, JPushMessage jPushMessage) {
            String log = "action - onAliasOperatorResult, sequence:" + jPushMessage.getSequence()
                    + ", alias: " + jPushMessage.getAlias();
            Logger.i(TAG, log);
            Logger.toast(context, log);
            JSCallback callback = sCacheMap.get(jPushMessage.getSequence());
            if (null != callback) {
                Map<String, Object> map = new HashMap<>();
                map.put("alias", jPushMessage.getAlias());
                map.put("errorCode", jPushMessage.getErrorCode());
                callback.invoke(map);
                sCacheMap.remove(jPushMessage.getSequence());
            } else {
                Logger.i(TAG, "Unexpected error, null callback!");
            }
            super.onAliasOperatorResult(context, jPushMessage);
        }
    }

//    private static boolean isApplicationRunningBackground(final Context context) {
//        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
//        List<ActivityManager.RunningTaskInfo> tasks = am.getRunningTasks(1);
//        if (!tasks.isEmpty()) {
//            ComponentName topActivity = tasks.get(0).topActivity;
//            if (!topActivity.getPackageName().equals(context.getPackageName())) {
//                return true;
//            }
//        }
//        return false;
//    }

//    @JSMethod (uiThread = true)
//    public void jumpToPushActivity(String activityName) {
//        Logger.d(TAG, "Jumping to " + activityName);
//        try {
//            Intent intent = new Intent();
//            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            intent.setClassName(mRAC, mRAC.getPackageName() + "." + activityName);
//            mRAC.startActivity(intent);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//    }

//    @JSMethod (uiThread = true)
//    public void jumpToPushActivityWithParams(String activityName, ReadableMap map) {
//        Logger.d(TAG, "Jumping to " + activityName);
//        try {
//            Intent intent = new Intent();
//            if (null != map) {
//                while (map.keySetIterator().hasNextKey()) {
//                    String key = map.keySetIterator().nextKey();
//                    String value = map.getString(key);
//                    intent.putExtra(key, value);
//                }
//            }
//            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            intent.setClassName(mRAC, mRAC.getPackageName() + "." + activityName);
//            mRAC.startActivity(intent);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }





    private boolean hasPermission(String appOpsServiceId) {

        Context context = mWXSDKInstance.getContext();
        if (Build.VERSION.SDK_INT >= 24) {
            NotificationManager mNotificationManager = (NotificationManager) context.getSystemService(
                    Context.NOTIFICATION_SERVICE);
            return mNotificationManager.areNotificationsEnabled();
        }else if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT){
            AppOpsManager mAppOps = (AppOpsManager) context.getSystemService(Context.APP_OPS_SERVICE);
            ApplicationInfo appInfo = context.getApplicationInfo();

            String pkg = context.getPackageName();
            int uid = appInfo.uid;
            Class appOpsClazz;

            try {
                appOpsClazz = Class.forName(AppOpsManager.class.getName());
                Method checkOpNoThrowMethod = appOpsClazz.getMethod("checkOpNoThrow", Integer.TYPE, Integer.TYPE,
                        String.class);
                Field opValue = appOpsClazz.getDeclaredField(appOpsServiceId);
                int value = opValue.getInt(Integer.class);
                Object result = checkOpNoThrowMethod.invoke(mAppOps, value, uid, pkg);
                return Integer.parseInt(result.toString()) == AppOpsManager.MODE_ALLOWED;
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }

        return false;
    }


}