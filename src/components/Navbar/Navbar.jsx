import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const onglets = [
    "Musique",
    "Cinéma",
    "Littérature",
    "Culture & Société",
    "Les réco de la rédac.",
  ];

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <a href="/">
          <img className="logo-short" src="/181.webp" alt="Logo de Multitude" />
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
          <li><Link to="/contact">Contactez-nous</Link></li>
        </ul>

        {/* Icône de recherche */}
        <div className="search-icon" onClick={() => setSearchOpen(!searchOpen)}>
          <Search color="black" />
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

export default Navbar;
