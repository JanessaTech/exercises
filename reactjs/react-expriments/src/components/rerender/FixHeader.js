import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom'
import Component1 from './Component1'
import Component2 from './Component2'
import Main from './Main'

export default function FixHeader() {
  return (
    <Router>
            <Main>
              <Routes>
                    <Route index  element={<Component1/>} />
                    <Route path="reactjs1" element={<Component1/>} />
                    <Route path="reactjs2" element={<Component2/>} />
              </Routes>
            </Main> 
    </Router>
  )
}

