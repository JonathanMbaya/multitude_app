import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";  // Import du contexte Auth
import './NavAdmin.css';

function NavAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();  // Récupération de la fonction logout

    const onglets = [
      "Ton Journal",
      "La bibliothèque"    
    ];
  
    return (
      <>
        <nav className="navbar">
            {/* Logo */}
            <a href="/admin">
                <img className="logo-short" src="/181.png" alt="Logo de Multitude" />
            </a>
  
            {/* Menu de navigation */}
            <ul className={`ul-onglet ${isOpen ? "open" : ""}`}>
                {onglets.map((onglet, index) => (
                <li key={index}>
                    <Link to={`/admin/library`} onClick={() => setIsOpen(false)}>
                    {onglet}
                    </Link>
                </li>
                ))}
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
