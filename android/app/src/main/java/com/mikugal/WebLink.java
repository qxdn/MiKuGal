package com.mikugal;


import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Browser;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.Iterator;
import java.util.Map;

public class WebLink extends ReactContextBaseJavaModule {

    public WebLink(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @ReactMethod
    public void openURL(String url, ReadableMap headers, Promise promise){
        if (url == null || url.isEmpty()) {
            promise.reject(new JSApplicationIllegalArgumentException("Invalid URL: " + url));
            return;
        }

        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url).normalizeScheme());
            Bundle bundle = new Bundle();
            for (Iterator<Map.Entry<String, Object>> it = headers.getEntryIterator(); it.hasNext(); ) {
                Map.Entry<String, Object> entry = it.next();
                bundle.putString(entry.getKey(),entry.getValue().toString());
            }
            intent.putExtra(Browser.EXTRA_HEADERS,bundle);
            sendOSIntent(intent,false);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(
                    new JSApplicationIllegalArgumentException(
                            "Could not open URL '" + url + "': " + e.getMessage()));
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "WebLink";
    }

    private void sendOSIntent(Intent intent, Boolean useNewTaskFlag) {
        Activity currentActivity = getCurrentActivity();

        String selfPackageName = getReactApplicationContext().getPackageName();
        ComponentName componentName =
                intent.resolveActivity(getReactApplicationContext().getPackageManager());
        String otherPackageName = (componentName != null ? componentName.getPackageName() : "");

        // If there is no currentActivity or we are launching to a different package we need to set
        // the FLAG_ACTIVITY_NEW_TASK flag
        if (useNewTaskFlag || currentActivity == null || !selfPackageName.equals(otherPackageName)) {
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        }

        if (currentActivity != null) {
            currentActivity.startActivity(intent);
        } else {
            getReactApplicationContext().startActivity(intent);
        }
    }
}
