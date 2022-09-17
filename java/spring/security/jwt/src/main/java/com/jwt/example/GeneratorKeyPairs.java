package com.jwt.example;

import org.bouncycastle.util.io.pem.PemObject;
import org.bouncycastle.util.io.pem.PemWriter;

import java.io.IOException;
import java.io.StringWriter;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

public class GeneratorKeyPairs {
    static void generateKeyPair() throws NoSuchAlgorithmException, IOException {
        KeyPair keyPair = generateRSAKeyPair();
        RSAPrivateKey priv = (RSAPrivateKey) keyPair.getPrivate();
        RSAPublicKey pub = (RSAPublicKey) keyPair.getPublic();

        String privateKey = writePem(priv.getEncoded(), "RSA PRIVATE KEY");
        String publicKey = writePem(pub.getEncoded(), "RSA PUBLIC KEY");

        System.out.println("---------------privateKey---------------");
        System.out.println(privateKey);
        System.out.println();
        System.out.println("-----------------publicKey---------------");
        System.out.println(publicKey);
    }

    private static KeyPair generateRSAKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);

        return generator.generateKeyPair();
    }

    private static String writePem(byte[] encoded, String description)
            throws IOException {
        StringWriter writer = new StringWriter();
        PemWriter pemWriter = new PemWriter(writer);
        pemWriter.writeObject(new PemObject(description, encoded));
        pemWriter.flush();
        pemWriter.close();
        return writer.toString();
    }

    public static void main(String[] args) {
        try {
            generateKeyPair();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
