package com.example.main_menu;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.*;
import android.widget.*;

public class MainActivity extends AppCompatActivity {
    // Элементы экрана
    TextView tv;
    CheckBox chb;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // находим элементы
        tv = (TextView) findViewById(R.id.textView);
        chb = (CheckBox) findViewById(R.id.chbExtMenu);
    }
    /*
        @Override
        public boolean onCreateOptionsMenu(Menu menu) {
            // TODO Auto-generated method stub
            // добавляем пункты меню
            menu.add(0, 1, 0, "add");
            menu.add(0, 2, 0, "edit");
            menu.add(0, 3, 3, "delete");
            menu.add(1, 4, 1, "copy");
            menu.add(1, 5, 2, "paste");
            menu.add(1, 6, 4, "exit");

            return super.onCreateOptionsMenu(menu);
        }
        */
        // обновление меню
        @Override
        public boolean onPrepareOptionsMenu(Menu menu) {
            // TODO Auto-generated method stub
            // пункты меню с ID группы = 1 видны, если в CheckBox стоит галка
            menu.setGroupVisible(R.id.group1, chb.isChecked());
            return super.onPrepareOptionsMenu(menu);
        }

        // обработка нажатий
        @Override
        public boolean onOptionsItemSelected(MenuItem item) {
            if (item.getItemId() == R.id.menu_exit){
                finish();
            }
            // TODO Auto-generated method stub
            StringBuilder sb = new StringBuilder();

            // Выведем в TextView информацию о нажатом пункте меню
            sb.append("Item Menu");
            sb.append("\r\n groupId: " + String.valueOf(item.getGroupId()));
            sb.append("\r\n itemId: " + String.valueOf(item.getItemId()));
            sb.append("\r\n order: " + String.valueOf(item.getOrder()));
            sb.append("\r\n title: " + item.getTitle());
            tv.setText(sb.toString());

            return super.onOptionsItemSelected(item);
        }


    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.mymenu, menu);
        return super.onCreateOptionsMenu(menu);
    }

}
