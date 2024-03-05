package com.awesometsproject;

import android.widget.Toast;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;
import java.util.HashMap;

public class SnowToast extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public SnowToast(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  public String getName(){
    return "SnowToast";
  }

  /**
   * getConstants 返回了需要导出给JavaScript环境使用的常量，还是非常好用的
   *
   * 这个是不一定需要实现的，没有也能用，毕竟只是一个常量
   */
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }



  /**
   * 使用 @ReactMethod 装饰器处理的函数，可以在JavaScript环境直接使用
   */
  @ReactMethod
  public void show(String message, final boolean isShortDuration) {
    int duration = isShortDuration ? Toast.LENGTH_SHORT : Toast.LENGTH_LONG;
    Toast.makeText(getReactApplicationContext(),message,duration).show();
  }

  /**
   * 支持传递 回调函数的 Toast 方法
   *
   * final 表示 常量
   */
  @ReactMethod
  public void callBackShow(String message, final boolean isShortDuration,final Callback callback) {
    int duration = isShortDuration ? Toast.LENGTH_SHORT : Toast.LENGTH_LONG;

    Toast.makeText(getReactApplicationContext(),message,duration).show();

    new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
      @Override
      public void run() {
        /**
         * 使用 invoke 方法可以触发回调函数
         */
        callback.invoke("Toast closed");
      }
    }, 3000);
  }

  private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";

  @ReactMethod
  public void promiseShow(String message, final boolean isShortDuration,final Promise promise){
    int duration = isShortDuration ? Toast.LENGTH_SHORT : Toast.LENGTH_LONG;

    Toast.makeText(getReactApplicationContext(), message, duration).show();

    new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
      @Override
      public void run() {
        promise.resolve("Toast closed");
      }
    }, 3000);
  }

  @ReactMethod
  public void eventShow(String message, final boolean isShortDuration){
    int duration = isShortDuration ? Toast.LENGTH_SHORT : Toast.LENGTH_LONG;

    Toast.makeText(getReactApplicationContext(), message, duration).show();

    new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
      @Override
      public void run() {
        show("事件即将触发",false);
        sendEvent(reactContext,"ToastClose","Toast has close");
      }
    }, 3000);
  }

  /**
   * 内部调用的发送事件
   */
  private void sendEvent(ReactContext reactContext, String eventName, String params){
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,params);
  }

  /**
   * 这个方法是提供给 JS 层面调用的 只需要定义即可
   */
  @ReactMethod
  public void addListener(String eventName) {

  }

  /**
   * 这个方法是提供给 JS 层面调用的 只需要定义即可
   */
  @ReactMethod
  public void removeListeners(Integer count) {

  }
}