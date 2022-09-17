package com.jwt.example;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.RSAKeyProvider;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

public class JwtDemo {
    private RSAPrivateKey _priv = null;
    private RSAPublicKey _pub = null;
    private String kid = "my-key-id";

    private RSAKeyProvider buildRSAKeyProvider() {
        RSAKeyProvider provider = new RSAKeyProvider() {
            @Override
            public RSAPublicKey getPublicKeyById(String keyId) {
                return _pub;
            }

            @Override
            public RSAPrivateKey getPrivateKey() {
                return _priv;
            }

            @Override
            public String getPrivateKeyId() {
                return kid;
            }
        };

        return provider;
    }

    void setRSAPrivateKey() throws IOException {
        String filepathPrivateKey = "jwt/src/main/resources/private_key.pem";
        RSAPrivateKey privateKey = (RSAPrivateKey) PemUtils.readPrivateKeyFromFile(filepathPrivateKey, "RSA");
        _priv = privateKey;
    }

    void setRSAPublicKey() throws IOException {
        String filepathPublicKey = "jwt/src/main/resources/public_key.pem";
        RSAPublicKey publicKey = (RSAPublicKey)PemUtils.readPublicKeyFromFile(filepathPublicKey, "RSA");
        _pub = publicKey;
    }

    String generateToken(){
        RSAKeyProvider provider = buildRSAKeyProvider();
        Algorithm algorithm = Algorithm.RSA256(provider);
        String token = JWT.create()
                .withAudience("some-Audience")
                .sign(algorithm);
        return token;
    }

    void verifyToken(String token) {
        RSAKeyProvider provider = buildRSAKeyProvider();

        Algorithm algorithm = Algorithm.RSA256(provider);
        JWTVerifier verifier = JWT.require(algorithm)
                .withAudience("some-Audience")
                .build();
        verifier.verify(token);
    }

    private void setRSAPublicKeyFromCert() throws CertificateException, FileNotFoundException {
        String filepathPrivateKey = "jwt/src/main/resources/certificate.pem";
        InputStream inputStream = new FileInputStream(filepathPrivateKey);
        CertificateFactory f = CertificateFactory.getInstance("X.509");
        X509Certificate certificate = (X509Certificate)f.generateCertificate(inputStream);
        _pub =  (RSAPublicKey)certificate.getPublicKey();
    }

    static void verifyByPublicKey(JwtDemo jwtDemo) throws IOException {
        jwtDemo.setRSAPrivateKey();
        String token = jwtDemo.generateToken();
        System.out.println("---------------------new token-----------------");
        System.out.println(token);
        jwtDemo.setRSAPublicKey();
        jwtDemo.verifyToken(token);
        System.out.println("verified");
    }

    static void verifyByCertFile(JwtDemo jwtDemo) throws IOException, CertificateException {
        jwtDemo.setRSAPrivateKey();
        String token = jwtDemo.generateToken();
        System.out.println("---------------------new token-----------------");
        System.out.println(token);
        jwtDemo.setRSAPublicKeyFromCert();
        jwtDemo.verifyToken(token);
        System.out.println("verified");
    }

    public static void main(String[] args) throws IOException {
        JwtDemo jwtDemo = new JwtDemo();
        verifyByPublicKey(jwtDemo);

       /*try {
            verifyByCertFile(jwtDemo);
        } catch (CertificateException e) {
            e.printStackTrace();
        }*/
    }
}
