package com.example.intent_filter;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class NameActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_name);
    }

    public void onClick(View v) {
        EditText etName = (EditText) findViewById(R.id.etName);
        Intent intent = new Intent();
        intent.putExtra("name", etName.getText().toString());
        setResult(RESULT_OK, intent);
        finish();
    }

}