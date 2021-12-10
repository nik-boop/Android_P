package com.example.to_do_list;

import androidx.appcompat.app.AppCompatActivity;

import android.content.*;
import android.os.Bundle;
import android.view.*;
import android.widget.*;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, AdapterView.OnItemClickListener{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // получаем экземпляр элемента ListView
        ListView listView = findViewById(R.id.category);

        // определяем строковый массив
        String[] catNames = getResources().getStringArray(R.array.cat_names);

        // используем адаптер данных
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this,
                android.R.layout.simple_list_item_1, catNames);

        listView.setAdapter(adapter);
        listView.setOnItemClickListener(this);
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        Intent intent;
        intent = new Intent(this, Category.class);
        intent.putExtra("Category", i);
        intent.putExtra("category", "ПЯТАЯ КАТЕГОРИЯ");
        startActivity(intent);
    }

    @Override
    public void onClick(View view) {

    }
}