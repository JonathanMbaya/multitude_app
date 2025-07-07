import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Import du contexte Auth
import "./NavAdmin.css";

function NavAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); // Récupération de la fonction logout

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <a href="/admin/home">
          <img className="logo-short" src="/181.png" alt="Logo de Multitude" />
        </a>

        {/* Menu de navigation */}
        <ul className="ul-onglet">
          <li className={`ul-onglet ${isOpen ? "open" : ""}`}>
            <Link to={"/admin/home"} onClick={() => setIsOpen(false)}>
              Le journal
            </Link>
          </li>
          <li className={`ul-onglet ${isOpen ? "open" : ""}`}>
            <Link to={"/admin/library"} onClick={() => setIsOpen(false)}>
              La bibliothèque
            </Link>
          </li>
        </ul>

        {/* Bouton de déconnexion */}
        <div className="search-icon" onClick={logout}>
          <li>Se déconnecter</li> <LogOut color="black" />
        </div>

        {/* Icône menu burger pour mobile */}
        <button className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
    </>
  );
}

export default NavAdmin;
