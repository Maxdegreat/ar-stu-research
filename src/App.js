// install dependicies # DONE ... the npm installs look at package.jason to find them
// import dependencies # DONE ... line 10 and so on
// set up web cam Done
// define references to those Done
// load posenet Done
// detect functcion
// draw utilities
// draw functions

import React, { useRef } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pose from "./pages/Pose";
//import { Home } from './pages/Home';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/poses" element={<Pose />} />
      </Routes>
    </Router>
  );
}

export default App;
