import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/Clock';

ReactDOM.render(
    <React.StrictMode>
        <Clock />
    </React.StrictMode>,
    document.getElementById('root')
);

setTimeout(() => {
    ReactDOM.render(
        <React.StrictMode>
            <div><p>Clock is removed from the DOM.</p></div>
        </React.StrictMode>,
        document.getElementById('root')
    );
}, 5000);
