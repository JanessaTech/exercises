## About this project

This project provides the baseline framework, which could be used to develop new features in a fast way.

The project provides the following basic features:

- The main language is typescript
- Centralized Json format for Http response
- Global process for error handing
- Integration with MongoDB
- The clear architecture by using layers of controller, service, dao etc
- Centralized message configration to support adding new custom message in a friendly way
- Support authentication and authorization by using JWT
- Support to define new middlewares in an extendable way
- Support logger
- Support configration under different devepoment stage: local, testnet and mainnet
- Support file uploading

## How to install

```
npm install
```

## How to start app

```
npm run build
npm run ts-start-local
npm run ts-start-testnet
npm run ts-start-mainnet
npm run start
```
