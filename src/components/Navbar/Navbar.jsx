import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, ChevronDown, ChevronUp, Instagram } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons"; 
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // ✅ Gère le sous-menu

  const onglets = [
    "Musique",
    "Cinéma",
    "Littérature",
    "Culture & Société"
  ];

  const sousMenuReco = [
    "multimusique",
    "multicinema",
    "multilecture"
  ];

  return (
    <>
      <div className="icon-network">
        <div className="icons">
          <Instagram color="black" />
        </div>
        <div className="icons">
          <Link to="https://www.tiktok.com/@multitudemedia_" target="_blank">
            <FontAwesomeIcon icon={faTiktok} size="lg" />
          </Link>
        </div>
      </div>

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

          {/* Menu déroulant "Les réco de la rédac." */}
          <li className="dropdown">
            <li 
              className="dropdown-btn" 
              onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            >
              Les réco de la rédac. {isSubMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </li>
            {isSubMenuOpen && (
              <ul className="dropdown-menu">
                {sousMenuReco.map((item, index) => (
                  <li key={index}>
                    <Link to={`/reco/${item.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setIsOpen(false)}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link to="/contact">Contactez-nous</Link>
          </li>
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
