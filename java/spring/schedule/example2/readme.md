This demo shows how to dynamically modify schedule during running

How to run:
- Run Example2Application in IDE
- To modify schedule, open postman, submit request: http://127.0.0.1:8080/updateCron?cron=0/2 * * * * ?  (POST)
  The shedule will be changed from 0/10 * * * * ? to 0/2 * * * * ?