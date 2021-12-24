package com.example.overwork_test;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.util.Log;

public class MainActivity extends AppCompatActivity {
    EditText day;
    EditText month;
    EditText year;
    EditText sex;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //Отключаем темную тему приложения
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);

        day = (EditText) findViewById(R.id.day);
        month = (EditText) findViewById(R.id.month);
        year = (EditText) findViewById(R.id.year);
        sex = (EditText) findViewById(R.id.sex);
    }

    public void ShowResults (View v) {
        Log.i("mylog", "go");
        EditText question_3 = findViewById(R.id.up);
        EditText question_6 = findViewById(R.id.down);
        Intent intent = new Intent(this, Results.class);
        String[] person_credentials = {day.getText().toString(),
                month.getText().toString(),
                year.getText().toString(),
                sex.getText().toString()};
        if (question_3.getText().length() > 0 && question_6.getText().length() > 0) {
            String pulse_lie = question_3.getText().toString();
            String pulse_stand = question_6.getText().toString();
            intent.putExtra("first_value", pulse_lie);
            intent.putExtra("second_value", pulse_stand);
        }
        intent.putExtra("credentials", person_credentials);
        startActivity(intent);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        menu.setGroupVisible(R.id.new_game_group, false);
        return super.onPrepareOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.menu_exit) {
            finish();
        }
        return super.onOptionsItemSelected(item);
    }

}