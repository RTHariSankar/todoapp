import Addtask from "./pages/Addtask";
import Completed from "./pages/Completed";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Incompleted from "./pages/Incompleted";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addtask" element={<Addtask />} />
          <Route path="/completedtasks" element={<Completed />} />
          <Route path="/Incompleted task" element={<Incompleted />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
