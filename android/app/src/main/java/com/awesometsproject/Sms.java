package com.awesometsproject;

import android.database.Cursor;
import android.net.Uri;
import android.provider.Telephony;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.Promise;


public class Sms extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;


  public Sms(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  public String getName(){
    return "Sms";
  }

  @ReactMethod
  public void getSms(Integer filterCount, Boolean isShowAll, final Promise promise) {
    Uri uri = Uri.parse(isShowAll?"content://sms/":"content://sms/inbox");
    Cursor cursor = getReactApplicationContext().getContentResolver().query(uri, null, null, null, null);

    WritableArray smsArray = new WritableNativeArray();
    int count = 0;

    if (cursor != null && cursor.moveToFirst()) {
      do {
        WritableMap sms = new WritableNativeMap();
        String address = cursor.getString(cursor.getColumnIndexOrThrow(Telephony.Sms.ADDRESS));
        String body = cursor.getString(cursor.getColumnIndexOrThrow(Telephony.Sms.BODY));
        sms.putString("address", address);
        sms.putString("body", body);
        smsArray.pushMap(sms);
        count++;
      } while (cursor.moveToNext() && count < filterCount);
      cursor.close();
    }

    promise.resolve(smsArray);
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