1. Install redis
   - Edit docker-compose -f docker-compose-redis-sentiel.yml, set REDIS_MASTER_HOST to be the ip of your running machine
   - Run command (assume docker is installed already):
```aidl
docker-compose -f docker-compose-redis-sentiel.yml up -d
```
2. Run StringRedisTemplateUsageTests in IDE
3. Check data recorded in redis
   - Go to you docker machine (assume ip is 192.168.1.107)
   - Run: redis-cli -h 192.168.1.107 -a password
   - Input "keys *"