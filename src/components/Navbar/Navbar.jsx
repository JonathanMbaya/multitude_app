import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const onglets = [
    "Musique",
    "Cinéma",
    "Littérature",
    "Culture & Société",
    "Les réco de la rédac."
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/">
        <img className="logo-short" src="/181.webp" alt="Logo de Multitude" />
      </a>

      {/* Icône menu burger pour mobile */}
      <button className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

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
      <div className="search-icon">
        <Search color="black" />
      </div>
    </nav>
  );
}

export default Navbar;
