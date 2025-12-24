var message:string = "Hello World" 
console.log(message)
const connectionId = `conn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
console.log(connectionId)

//npx ts-node .\src\hello.ts