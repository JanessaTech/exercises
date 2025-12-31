import EventEmitter from "events";

interface MyEmitterEvents {
    'kick': (jobId: number, startAt: string) => void
}

interface MyEmitter {
    on<U extends keyof MyEmitterEvents>(event: U, listener: MyEmitterEvents[U]): this;
    emit<U extends keyof MyEmitterEvents>(event: U, ...args: Parameters<MyEmitterEvents[U]>): boolean;
} 
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()



myEmitter.on('kick', (jobId, startAt) => {
    console.log(`kick: ${jobId}, ${startAt}`)
})
myEmitter.emit('kick', 123, new Date().toISOString())

//npx ts-node .\src\EventEmitterDemo.ts