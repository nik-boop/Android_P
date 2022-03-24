package com.example.broadcast;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

public class MyReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        Log.i("My_log", "Start BR");

        Toast.makeText(context, "Обнаружено сообщение: " + intent.getStringExtra("com.example.broadcast.Message"),
               Toast.LENGTH_SHORT).show();

        Log.i("My_log", "End BR");

    }

}