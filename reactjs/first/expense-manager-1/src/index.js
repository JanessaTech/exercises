import React from 'react';
import ReactDOM from 'react-dom';
//import HelloWorld from './components/HelloWorld';

function Greeting() {
    var cTime = new Date().toTimeString()
    return <div>Current time is {cTime}</div>
}
/*
ReactDOM.render(
    <Greeting/>,
    document.getElementById('root')
);*/
var cTime = new Date().toTimeString();
ReactDOM.render(
    <div><p>The current time(1) is {cTime}</p></div>,
    document.getElementById('root')
);