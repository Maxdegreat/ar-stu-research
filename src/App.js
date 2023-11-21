// install dependicies # DONE ... the npm installs look at package.jason to find them
// import dependencies # DONE ... line 10 and so on
// set up web cam Done
// define references to those Done
// load posenet Done
// detect functcion
// draw utilities
// draw functions



import AttentionOutputs from "./components/AttentionOutputs";
import Attention from "./pagesNew/Attention";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FindFaces from "./pagesNew/FindFaces";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Attention />}> </Route>
        <Route path="/home" element={<Attention />}> </Route>

        <Route path="/findface" element={<FindFaces />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
