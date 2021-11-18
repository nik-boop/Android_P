package com.example.guess_number;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.renderscript.Sampler;
import android.view.View;
import android.widget.*;

public class MainActivity extends AppCompatActivity {
    private int max;
    private int min;
    private int chislo;
    private int modansver;
    private TextView tvInfo;
    private EditText etInput;
    private Button bControl;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        tvInfo = (TextView)findViewById(R.id.textView1);
        etInput = (EditText)findViewById(R.id.editText1);
        bControl = (Button)findViewById(R.id.button1);
        max = 100;
        min = 1;
        chislo = (int)(Math.random()*((max-min)+1))+min;
        modansver = 2;

    }

    public void onClick(View view){
        int ansver;
        try {
            ansver = Integer.parseInt(etInput.getText().toString());
        }
        catch (Exception e) {
            tvInfo.setText(getResources().getString(R.string.error));
            return;
        }

        if (modansver == 0) {
            chislo = (int)(Math.random()*((max-min)+1))+min;
            bControl.setText(getResources().getString(R.string.input_value));
            tvInfo.setText(getResources().getString(R.string.try_to_guess));
        }

        if (ansver > 100){
            modansver = 2;
        }
        else {
            if (ansver > chislo) {
                modansver = 1;
            } else {
                if (ansver < chislo) {
                    modansver = -1;
                } else {
                    modansver = 0;
                }
            }
        }
        switch (modansver){
            case -1:
                tvInfo.setText(getResources().getString(R.string.behind));
                break;
            case 0:
                tvInfo.setText(getResources().getString(R.string.hit));
                bControl.setText(getResources().getString(R.string.play_more));
                break;
            case 1:
                tvInfo.setText(getResources().getString(R.string.ahead));
                break;
            case 2:
                tvInfo.setText(getResources().getString(R.string.error));
                break;
        }
    }

}