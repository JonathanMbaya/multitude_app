import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Single from "./pages/Single";
import Contact from "./pages/Contact";
import Connexion from "./pages/Connexion";
import Reco from "./pages/Reco";
import AdminHome from "./pages/AdminHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Single/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/reco/multimusique" element={<Reco/>} />
        <Route path="/reco/multicinema" element={<Reco/>} />
        <Route path="/reco/multilecture" element={<Reco/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/admin/secret-portal" element={<Connexion/>} />
        <Route path="/admin" element={<AdminHome/>} />

      </Routes>
    </Router>
  );
}

export default App;
