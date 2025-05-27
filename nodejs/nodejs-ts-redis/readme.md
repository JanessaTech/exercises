### How to create nodejs(express) with typescript from 0

```
npm init -y
npm install express
npm install typescript @types/node @types/express --save-dev
npm install ts-node --save-dev
npm install nodemon --save-dev
tsc --init

------ below start to config redis -------
npm install redis ioredis
npm install @types/redis --save-dev
npm install dotenv
```

## How to run

```
npm start
or
npm run dev
```

## In postman

Once the server is up, send request in postman to interact with redis:

```
GET   http://127.0.0.1:3000/cache/mykey

```

## Install and start redis in docker bedore starting node

```
run command:
docker-compose -f docker-compose-redis-sentiel.yml up -d

Test installation:
redis-cli -h 192.168.0.200 -a password
SET runoobkey redis  => OK
get runoobkey   => "redis"
ping  => pong
```
