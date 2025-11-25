package com.codealpha.travel;

import com.google.gson.Gson;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
public class IpService {

    // We use ipinfo.io as suggested in the PDF. 
    // Note: This works without a token for limited requests.
    private static final String API_URL = "https://ipinfo.io/json";

    public LocationData getLocation() {
        try {
            // 1. Create HTTP Client (Java 11+)
            HttpClient client = HttpClient.newHttpClient();

            // 2. Build Request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(API_URL))
                    .GET()
                    .build();

            // 3. Send Request and get Response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                // 4. Parse JSON using Gson (Requirement)
                Gson gson = new Gson();
                return gson.fromJson(response.body(), LocationData.class);
            } else {
                System.err.println("Error: API returned code " + response.statusCode());
                return null;
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }
}