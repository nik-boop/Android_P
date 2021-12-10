package com.example.work_with_img;

import androidx.appcompat.app.AppCompatActivity;

import android.content.*;
import android.os.Bundle;
import android.view.*;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    ListView listView = (ListView) findViewById(R.id.list);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ListView listView = findViewById(R.id.list);

        // определяем строковый массив
        String[] catNames = getResources().getStringArray(R.array.cat_names);

        // используем адаптер данных
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this,
                android.R.layout.simple_list_item_1, catNames);

        listView.setAdapter(adapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View itemClicked, int position,
                                    long id) {
                TextView textView = (TextView) itemClicked;
                String strText = textView.getText().toString(); // получаем текст нажатого элемента

            }
        });


    }

    public void onClick(View v) {
        int a = 1;

        switch (v.getId()) {
            case (R.id.btnFirst):
                Intent first_category = new Intent(this, Category.class);
                first_category.putExtra("category", "ПЕРВАЯ КАТЕГОРИЯ");
                startActivity(first_category);
                break;
            case (R.id.btnSecond):
                Intent second_category = new Intent(this, Category.class);
                second_category.putExtra("category", "ВТОРАЯ КАТЕГОРИЯ");
                startActivity(second_category);
                break;
            case (R.id.btnThird):
                Intent third_category = new Intent(this, Category.class);
                third_category.putExtra("category", "ТРЕТЬЯ КАТЕГОРИЯ");
                startActivity(third_category);
                break;
            case (R.id.btnFourth):
                Intent fourth_category = new Intent(this, Category.class);
                fourth_category.putExtra("category", "ЧЕТВЕРТАЯ КАТЕГОРИЯ");
                startActivity(fourth_category);
                break;
            case (R.id.btnFifth):
                Intent fifth_category = new Intent(this, Category.class);
                fifth_category.putExtra("category", "ПЯТАЯ КАТЕГОРИЯ");
                startActivity(fifth_category);
                break;
        }


    }
}