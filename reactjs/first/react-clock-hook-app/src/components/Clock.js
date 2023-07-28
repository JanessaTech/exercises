import React, { useState, useEffect } from 'react';

function Clock() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    useEffect(
        () => {
            let setTime = () => {
                console.log("setTime is called");
                setCurrentDateTime(new Date());
            }
            let interval = setInterval(setTime, 1000);
            return () => {
                console.log("timer is stopped");
                clearInterval(interval);
            }
        },
        []
    );

    return (
        <div><p>The current time is {currentDateTime.toString()}</p></div>
    );
}
export default Clock;