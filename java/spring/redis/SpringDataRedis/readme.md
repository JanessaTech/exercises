This demos shows how to use redis as no sql database to operate CRUD

1. Install redis
2. Run SpringDataRedisApplication
3. Do CRUD operations

- Show all students:
   1. url: http://127.0.0.1:8080/demo (GET)
- Add a student
   1. url: http://127.0.0.1:8080/demo (POST)
   2. Json </br>
      {
      "id": "1",
      "name":"jane",
      "grade":10
      }
- Delete a student
   1. url : http://127.0.0.1:8080/demo/1  (DELETE)