import React, { useState } from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
const App = () => {
    const [isOpen, setIsOpen] = useState(false)
    function handleToggle() {
        setIsOpen(value => !value)
    }
    return(
        <div>
            <button onClick={handleToggle}>Toggle drawer</button>
            <Drawer open={isOpen} onClose={handleToggle} direction='right'> Hello, Janessa</Drawer>
        </div>
    )
}

export default App

// See https://reactjsexample.com/a-modern-navigation-drawer-with-react/
