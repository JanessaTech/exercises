var events = require('events');

function case1() {
    var eventEmitter = new events.EventEmitter();

    var connectHandler  = function connected() {
        console.log('connection successfully')
        eventEmitter.emit('data received')
    }

    var receivedHandler = function received() {
        console.log('data received succesfully.')
    }

    // bind event handlers
    eventEmitter.on('connection', connectHandler )
    eventEmitter.on('data received', receivedHandler)


    eventEmitter.emit('connection')

    console.log("program is ended")
}

function case2() {
    var eventEmitter = new events.EventEmitter();
    var listener1 = function listener1() {
        console.log('listener1 is executed')
    }
    var listener2  = function listener2() {
        console.log('listener2 is executed')
    }
    eventEmitter.addListener('connection', listener1)
    eventEmitter.on('connection', listener2)

    var numListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection')
    console.log(numListeners + " Listner(s) listening to connection event");

    eventEmitter.emit('connection')

    eventEmitter.removeListener('connection', listener1)

    numListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection')
    console.log(numListeners + " Listner(s) listening to connection event");

    console.log("Program Ended.");
}

    //case1()
    case2()


