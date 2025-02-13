import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, X,} from "lucide-react";
import './NavAdmin.css';

function NavAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
  
    const onglets = [
      "Ton Journal",
      "La bibliothèque"    
    ];
  
    return (
      <>
  
        <nav className="navbar">
            {/* Logo */}
            <a href="/">
                <img className="logo-short" src="/181.png" alt="Logo de Multitude" />
            </a>
  
            {/* Menu de navigation */}
            <ul className={`ul-onglet ${isOpen ? "open" : ""}`}>
                {onglets.map((onglet, index) => (
                <li key={index}>
                    <Link to={`/category`} onClick={() => setIsOpen(false)}>
                    {onglet}
                    </Link>
                </li>
                ))}

            </ul>
  
            {/* Icône de recherche */}
            <div className="search-icon" onClick={() => setSearchOpen(!searchOpen)}>
                <li>Se déconnecter</li> <LogOut  color="black" />
            </div>
    
            {/* Icône menu burger pour mobile */}
            <button className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </nav>
  
        {/* Barre de recherche qui glisse sous la navbar */}
        <div className={`search-bar ${searchOpen ? "open" : ""}`}>
          <input
            type="text"
            placeholder="Rechercher un article"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="close-search" onClick={() => setSearchOpen(false)}>✖</button>
        </div>
      </>
    );
}

export default NavAdmin
