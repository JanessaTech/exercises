About this demo
------------------------------
This demo shows us how to generate a jwt token and how to verify it using public key or certificate file </br>
1. Run GeneratorKeyPairs to generate private/public key pair
2. Save the content of private key into resources/private_key.pem (empty the old content before pour the new content)
3. Save the content of public key into resources/public_key.pem (empty the old content before pour the new content)
4. Copy private_key.pem onto your linux machine, run the command below to generate certificate.pem
```aidl
openssl req -x509 -key private_key.pem -subj /CN=client.example.com -days 1000 > certificate.pem
```
5. Copy the content of certificate.pem into resources/certificate.pem
6. Run JwtDemo. We will see a token generated based on the private_key.pem you just created. 
   Then immediately the token is verified by the public_key.pem you just created. You will see the output like this:
```aidl
eyJraWQiOiJteS1rZXktaWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJzb21lLUF1ZGllbmNlIn0.CiIgtFYilC1yF7cXlnlzIdMzVJQrWxUKyJCIlRD_uAaySrsAjW5_N1GWi8SJJJ6dqrCWwQB_gUf8IJoLCclBGFq2SfcMg_mD6Uo0mWm0qeMGxeUFknKbh3H2FyXSOUdAi8YUaZ2EWuNPdWpx1cYr2kBjSVzEf9cg1YoTKDAh7DU_jdLFvsGQ9ft34GtcTR0BJexvldbJbVmzMzN5-fAvXxj11XIuiemfF3Ec_QxFKSj7MtCirPIIDw2INlYHySXBhyEzToGB_cizoDg25_b4vYu4kKRQImDc2hveAJqE7NzepPZrq0HOjIYVAAJxq0_rFOutjeemWAijyO7QWHAPPQ
verified
```
7. If you want to verify the token by using certificate.pem, comment code at line 105 in JwtDemo
   Uncomment codes from line 107-102 in JwtDemo, then run in JwtDemo, you will the output like this:
```aidl
eyJraWQiOiJteS1rZXktaWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJzb21lLUF1ZGllbmNlIn0.CiIgtFYilC1yF7cXlnlzIdMzVJQrWxUKyJCIlRD_uAaySrsAjW5_N1GWi8SJJJ6dqrCWwQB_gUf8IJoLCclBGFq2SfcMg_mD6Uo0mWm0qeMGxeUFknKbh3H2FyXSOUdAi8YUaZ2EWuNPdWpx1cYr2kBjSVzEf9cg1YoTKDAh7DU_jdLFvsGQ9ft34GtcTR0BJexvldbJbVmzMzN5-fAvXxj11XIuiemfF3Ec_QxFKSj7MtCirPIIDw2INlYHySXBhyEzToGB_cizoDg25_b4vYu4kKRQImDc2hveAJqE7NzepPZrq0HOjIYVAAJxq0_rFOutjeemWAijyO7QWHAPPQ
verified
```


Reference:
------------
Run the command below to get public key from certificate.pem
openssl x509 -pubkey -noout -in certificate.pem  > newpubkey.pem
