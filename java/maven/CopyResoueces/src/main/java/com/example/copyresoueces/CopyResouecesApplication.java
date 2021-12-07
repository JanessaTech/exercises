package com.example.copyresoueces;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

//@SpringBootApplication
public class CopyResouecesApplication {

    public static void main(String[] args) {
        CopyResouecesApplication app = new CopyResouecesApplication();
        Properties properties = app.loadProperties("application.properties");
        properties.forEach( (k, v) ->
                System.out.println(k + ":" + v));
    }

    private Properties loadProperties(String filePath) {
        Properties properties = new Properties();
        try{
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream(filePath);
            properties.load(inputStream);
        }catch (IOException ex) {
            System.out.println("Can not find " + filePath);
        }
        return properties;

    }

}
