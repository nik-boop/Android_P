package com.example.service;

import com.example.service.MyService.MyBinder;


import androidx.appcompat.app.AppCompatActivity;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.lang.reflect.Type;

public class MainActivity extends AppCompatActivity {

    MyService myService;
    int service_flag;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ServiceConnection mConnection = new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName className, IBinder service) {
                MyBinder binder = (MyBinder) service;
                myService = binder.getService();
            }

            @Override
            public void onServiceDisconnected(ComponentName arg0) {

            }
        };
        service_flag = 0;
        Button btnStartService = findViewById(R.id.btnStartService);
        Button btnBindService = findViewById(R.id.btnBindService);
        Button btnKillService = findViewById(R.id.btnKillService);
        Button btnGoService = findViewById(R.id.btnGoService);
        Intent start_service = new Intent(MainActivity.this, MyService.class);

        btnStartService.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startService(start_service);
                service_flag = 1;

            }
        });

        btnBindService.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                bindService(start_service, mConnection, Context.BIND_AUTO_CREATE);
                service_flag = -1;

            }
        });

        btnKillService.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (service_flag == 1){
                    stopService(start_service);
                    service_flag = 0;
                }
                else if (service_flag == -1){
                    unbindService(mConnection);
                    service_flag = 0;
                }
                else{
                    Toast.makeText(MainActivity.this, "Сервис не запущен", Toast.LENGTH_SHORT).show();
                }


            }
        });
        btnGoService.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (myService != null){
                    int number = myService.MyService();
                    Toast.makeText(MainActivity.this, "Completed " + number, Toast.LENGTH_SHORT).show();
                }
                else{
                    Toast.makeText(MainActivity.this, "Сервис не вызван ", Toast.LENGTH_SHORT).show();
                }

            }
        });

    };
}