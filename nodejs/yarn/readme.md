## How to create a TS project using yarn from 0

```
yarn init
yarn install
yarn config set strict-ssl false

---here are some yarn commands to install package
yarn add typescript ts-node --dev
--- once done, restore strict-ssl

yarn config set strict-ssl true
tsc --init

--create a ts file name hello.ts under src
npx ts-node .\src\hello.ts
```
