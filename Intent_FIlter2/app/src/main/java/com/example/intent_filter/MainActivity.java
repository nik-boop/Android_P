package com.example.intent_filter;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.*;
import android.os.Bundle;
import android.view.*;
import android.widget.*;

public class MainActivity extends AppCompatActivity {
    TextView tvName;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        tvName = findViewById(R.id.tvName);
    }
    public void onClick(View v) {
        Intent intent;
        EditText etLName = (EditText) findViewById(R.id.etLName);
        switch(v.getId()) {
            case R.id.btnTime:
                intent = new Intent("com.example.intent.action.showtime");
                intent.putExtra("lname", etLName.getText().toString());
                startActivity(intent);
                break;
            case R.id.btnDate:
                intent = new Intent("com.example.intent.action.showdate");
                intent.putExtra("lname", etLName.getText().toString());
                startActivity(intent);
                break;
            case (R.id.btnName):
                intent = new Intent(this, NameActivity.class);
                startActivityForResult(intent, 1);
                break;
        }
    }
    @SuppressLint("MissingSuperCall")
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (data == null) {return;}
        String name = data.getStringExtra("name");
        tvName.setText("Your name is " + name);
    }
}