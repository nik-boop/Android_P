package com.example.overwork_test;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import org.jsoup.nodes.Document;
import java.io.IOException;

import org.jsoup.Jsoup;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import android.util.Log;

public class Results extends AppCompatActivity {

    TextView MetricsDescription;
    String[] credentials;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_results);
        MetricsDescription = findViewById(R.id.metrics_description);
        Intent intent = getIntent();

        credentials = intent.getStringArrayExtra("credentials");
        String first_value = intent.getStringExtra("first_value");
        String second_value = intent.getStringExtra("second_value");

        // Формирование запроса
        String data = String.format("day=%s&month=%s&year=%s&sex=%s&m1=%s&m2=%s", credentials[0], credentials[1], credentials[2], credentials[3],first_value, second_value);

        try {
            overwork_api(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void overwork_api(String data) throws IOException {
        MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
        OkHttpClient client = new OkHttpClient();
        RequestBody body = RequestBody.create(mediaType, data);
        Request request = new Request.Builder()
                .url("http://abashin.ru/cgi-bin/ru/tests/burnout")
                .method("POST", body)
                .addHeader("Host", "abashin.ru")
                .addHeader("Connection", "close")
                .addHeader("Cache-Control", "max-age=0")
                .addHeader("DNT", "1")
                .addHeader("Upgrade-Insecure-Requests", "1")
                .addHeader("Accept", "text/html,application/xhtml+xml,application/xml;" +
                        "q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9")
                .addHeader("Accept-Encoding", "deflate")
                .addHeader("Accept-Language", "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7")
                .addHeader("Content-Type", "application/x-www-form-urlencoded")
                .addHeader("Content-Length", "43")
                .build();
        // Поток отправки запроса и обработки ответа (обновляет tv при получении ответа 200)
        // Создаем callback (метод обратного вызова) каждый раз, когда отправляем форму через ВВОД
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    String message = response.body().string();
                    // Парсинг html body из ответа
                    Document html_response = Jsoup.parse(message);
                    String format_message = html_response.text();
                    // Обновление интерфейса при получении ответа
                    Log.i("mylog",message);
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            MetricsDescription.setText(format_message);
                        }
                    });;
                }
            }
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }
        });
    }

}
