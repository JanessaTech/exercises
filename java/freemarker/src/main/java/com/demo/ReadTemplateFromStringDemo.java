package com.demo;

import freemarker.cache.FileTemplateLoader;
import freemarker.cache.StringTemplateLoader;
import freemarker.core.HTMLOutputFormat;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class ReadTemplateFromStringDemo {

    private static String TEMPLATE_NAME = "template_name";
    static Configuration create(final String basePath) throws IOException {
        Configuration cfg = new Configuration();
        cfg.setDefaultEncoding("UTF-8");
        cfg.setOutputFormat(HTMLOutputFormat.INSTANCE);
        cfg.setAutoEscapingPolicy(Configuration.ENABLE_IF_SUPPORTED_AUTO_ESCAPING_POLICY);
        cfg.setTemplateLoader(new FileTemplateLoader(new File(basePath)));
        return cfg;
    }

    static Template getTemplate(Configuration configuration, Locale locale, String name) {
        try {
            return configuration.getTemplate(name, locale);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    static void write() throws IOException, TemplateException {
        Configuration cfg = new Configuration();
        cfg.setDefaultEncoding("UTF-8");
        cfg.setOutputFormat(HTMLOutputFormat.INSTANCE);
        cfg.setAutoEscapingPolicy(Configuration.ENABLE_IF_SUPPORTED_AUTO_ESCAPING_POLICY);

        String templateString = "" +
                "<html>\n" +
                "    <head></head>\n" +
                "    <body>\n" +
                "    名称：${verificationCode}\n" +
                "    </body>\n" +
                "</html>";

        StringTemplateLoader stringTemplateLoader = new StringTemplateLoader();
        stringTemplateLoader.putTemplate("template", templateString);
        cfg.setTemplateLoader(stringTemplateLoader);

        Template template = cfg.getTemplate("template", "utf-8");

        Map<String, Object> map = new HashMap<>();
        map.put("verificationCode", "123456");
        StringWriter writer = new StringWriter();

        template.process(map, writer);

        System.out.println(writer.toString());
    }

    public static void main(String[] args) {
        try {
            write();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TemplateException e) {
            e.printStackTrace();
        }
    }
}
