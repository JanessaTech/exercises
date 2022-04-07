package com.demo;

import freemarker.cache.FileTemplateLoader;
import freemarker.core.HTMLOutputFormat;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

// read template from file
public class ReadTemplateFromFileDemo {
    static Configuration create(final String basePath) throws IOException {
        Configuration cfg = new Configuration();
        cfg.setDefaultEncoding("UTF-8");
        cfg.setOutputFormat(HTMLOutputFormat.INSTANCE);
        cfg.setAutoEscapingPolicy(Configuration.ENABLE_IF_SUPPORTED_AUTO_ESCAPING_POLICY);
        cfg.setTemplateLoader(new FileTemplateLoader(new File(basePath)));
        return cfg;
    }

    static Template getTemplate(Configuration configuration,  Locale locale, String name) {
        try {
            return configuration.getTemplate(name, locale);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    static void write() throws IOException, TemplateException {
        StringWriter writer = new StringWriter();

        Locale locale = new Locale("en","US");
        String templateName = "verification.html";

        String basePath = "D:/alasta/experiment-for-new-platform/email-template";

        Map<String, Object> map = new HashMap<>();
        map.put("verificationCode", "123456");

        Configuration configuration = create(basePath);

        Template template = getTemplate(configuration, locale, templateName);
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
