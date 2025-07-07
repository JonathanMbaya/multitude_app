import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Single from "./pages/Single";
import Contact from "./pages/Contact";
import Connexion from "./pages/Connexion";
import Reco from "./pages/Reco";
import AdminHome from "./pages/AdminHome";
import AdminLibrary from "./pages/AdminLibrary";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Single />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/reco/multimusique" element={<Reco />} />
          <Route path="/reco/multicinema" element={<Reco />} />
          <Route path="/reco/multilecture" element={<Reco />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Connexion />} />

          {/* Routes protégées */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/library" element={<AdminLibrary />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
