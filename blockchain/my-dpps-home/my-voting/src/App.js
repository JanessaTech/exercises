import Home from "./components/Home";
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="home" element={<Home/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
