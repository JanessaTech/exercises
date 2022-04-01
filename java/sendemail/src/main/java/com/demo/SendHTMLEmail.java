package com.demo;


import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

public class SendHTMLEmail {

        static void send() throws EmailException {
            String smtpServer = "smtp.gmail.com";
            int smptPort = 587;
            String smtpUser = "lvlajzhao1983@gmail.com";
            String smtpPassword = "NiC$4603";

            String subject = "my subject";
            String contents = "my content";

            int timeOut = 20;
            int socketTimeOut = 20;

            String recipientEmailAddress = "juanzhao.xian@gmail.com";


            HtmlEmail email = new HtmlEmail();
            email.setHostName(smtpServer);
            email.setSmtpPort(smptPort);
            email.setStartTLSEnabled(true);

            email.setSocketConnectionTimeout(timeOut * 1000);
            email.setSocketTimeout(socketTimeOut * 1000);

            email.setAuthentication(smtpUser, smtpPassword);

            email.addTo(recipientEmailAddress);
            email.setFrom(smtpUser);

            email.setSubject(subject);
            email.setHtmlMsg(contents);

            email.setDebug(true);
            email.send();
        }


        public static void main(String[] args){
            //How many loops will go depends on your network quality
            // it will always say "trying to connect to host "smtp.gmail.com", port 587, isSSL false:
            // if you network cannot access to smtp.gmail.com
            while(true) {
                try {

                    send();
                    
                    break;
                } catch (EmailException e) {
                    e.printStackTrace();
                }
            }


        }

}
