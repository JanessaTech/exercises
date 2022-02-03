This demo shows how we use activemq to send/receive message. </br>

How to run it:
1. Install activemq. username and password are admin/admin
2. Go to common project, run mvn install
3. Go to producer project, run ProducerApplication
4. Go to consumer project, run ConsumerApplication
5. Open postman, send/receive message via post/get request:
    - Send message:
      - url : http://127.0.0.1:8081/producer/message
      - json body: </br>
        {
        "studentId": "1",
        "name": "jane1",
        "rollNumber": "111"
        }

    - Received message
        - url : http://127.0.0.1:8082/consumer/message
        - json body: </br>
          {
          "studentId": "1",
          "name": "jane1",
          "rollNumber": "111"
          }
6. You could launch activemq console to check messages in queue:
    - http://your-activemq-server-ip:8161/admin/queues.jsp