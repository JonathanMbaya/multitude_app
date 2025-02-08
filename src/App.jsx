import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Single from "./pages/Single";
import Contact from "./pages/Contact";
import Connexion from "./pages/Connexion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Single/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/admin/secret" element={<Connexion/>} />
      </Routes>
    </Router>
  );
}

export default App;
