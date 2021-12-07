package com.example.useprofiletocopyresource;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class UseProfileToCopyResourceApplication {

    public static void main(String[] args) {
        UseProfileToCopyResourceApplication application = new UseProfileToCopyResourceApplication();
        Properties prop = application.loadProperties("application.properties");
        prop.forEach((k, v) -> System.out.println(k + ":" + v));
    }
    public Properties loadProperties(String filePath) {
        Properties properties = new Properties();
        try{
            InputStream resouceStream = getClass().getClassLoader().getResourceAsStream(filePath);
            properties.load(resouceStream);
        } catch (IOException ex) {
            System.out.println("Unable to load properties file : " + filePath);
        }
        return properties;
    }
}
