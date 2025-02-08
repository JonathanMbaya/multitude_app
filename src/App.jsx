import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Single from "./pages/Single";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Single/>} />
        <Route path="/category" element={<Category/>} />
      </Routes>
    </Router>
  );
}

export default App;
