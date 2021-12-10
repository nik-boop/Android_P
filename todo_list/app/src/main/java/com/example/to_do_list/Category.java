package com.example.to_do_list;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.*;
import android.widget.*;

import java.util.*;

public class Category extends AppCompatActivity implements View.OnClickListener {
    private ListView listView;
    public EditText editText;
    // Создаём пустой массив для хранения планов
    private ArrayList<String> plans = new ArrayList<>();
    // Создаём адаптер ArrayAdapter, чтобы привязать массив к ListView
    private ArrayAdapter<String> adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_category);
        editText = (EditText) findViewById(R.id.editText);
        // получаем экземпляр элемента ListView
        listView = (ListView) findViewById(R.id.plans);
        editText = (EditText) findViewById(R.id.editText);
        adapter = new ArrayAdapter<>(this,
                android.R.layout.simple_list_item_1, plans);
        // Привяжем массив через адаптер к ListView
        listView.setAdapter(adapter);
        // Прослушиваем нажатия клавиш
        editText.setOnKeyListener(new View.OnKeyListener() {
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (event.getAction() == KeyEvent.ACTION_DOWN)
                    if (keyCode == KeyEvent.KEYCODE_ENTER) {
                        plans.add(0, editText.getText().toString());
                        adapter.notifyDataSetChanged();
                        editText.setText("");
                        return true;
                    }
                return false;
            }
        });
    }
    @Override
    public void onClick(View view) {

    }
}