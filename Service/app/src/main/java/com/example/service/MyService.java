package com.example.service;



import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;


public class MyService extends Service {

    final String DEBUG = "SERVICE";

    public class MyBinder extends Binder {
        MyService getService() {
            return MyService.this;
        }
    }


    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(DEBUG, "Service has started");
    }

    @Override
    public IBinder onBind(Intent intent) {
        final IBinder mBinder = new MyBinder();
        Log.d(DEBUG, "Service binded");
        return mBinder;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(DEBUG, "onStartCommand: " + intent + flags + " startId: " + startId);
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(DEBUG, "Service has been destroyed!");
    }

    public boolean onUnbind(Intent intent) {
        Log.d(DEBUG, "MyService onUnbind");
        return super.onUnbind(intent);
    }

    public int MyService() {

        int number = 0;
        while (number < 9999) {
            number ++;
            Log.d(DEBUG, "Number: " + number);
        }
        return 0;

    }
    public int MS(){
        return 1;
    }
}