import {BrowserRouter, Routes, Route} from "react-router-dom";
import Circle from "./component/Circle";

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Circle/>} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
