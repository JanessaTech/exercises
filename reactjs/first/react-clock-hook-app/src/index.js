import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from "./components/Clock";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Clock />
  </React.StrictMode>
);

setTimeout(() => {
    root.render(
        <React.StrictMode>
            <div><p>Clock is removed from the DOM.</p></div>
        </React.StrictMode>
    );
}, 5000);