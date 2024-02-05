import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { useEffect } from "react";
import Root from "./components/ComponentTree/Root";
import InfiniteScrollDemo from "./components/InfiniteScrollDemo";
import StateUpdate from "./components/StateUpdate";
import UseCallbackDemo from "./components/UseCallbackDemo";
import RootComponent from "./components/UseContextUsage/RootComponent";
import UseEffectDemo from "./components/UseEffectDemo";
import UseMemo from "./components/UseMemo";
import UseReducerDemo from "./components/UseReducerDemo";
import UseRefDemo from "./components/UseRefDemo";
import Main from './components/rerender/Main';
import Component1 from './components/rerender/Component1';
import Component2 from './components/rerender/Component2';
import { Box } from '@mui/material';
import Header from './components/rerender/Header';
import FixHeader from './components/rerender/FixHeader';
function App() {
  // return (
  //   <Router>
  //           <Main>
  //             <Routes>
  //                   <Route index  element={<Component1/>} />
  //                   <Route path="reactjs1" element={<Component1/>} />
  //                   <Route path="reactjs2" element={<Component2/>} />
  //             </Routes>
  //           </Main> 
  //   </Router>
  // )

  return (
    <div>
      {/* <UseCallbackDemo/> */}
      {/* <UseMemo/> */}
      {/* <UseRefDemo/> */}
      {/* <RootComponent/> */}
      {/* <UseReducerDemo/> */}
      {/* <Root/> */}
      {/* <UseEffectDemo/> */}
      {/* <StateUpdate/> */}
      {/* <InfiniteScrollDemo /> */}
      <FixHeader/>
    </div>
  );
}

export default App;
