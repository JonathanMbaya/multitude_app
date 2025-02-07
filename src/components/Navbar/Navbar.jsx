import React from "react";
import { Link } from "react-router-dom";
import { Search } from 'lucide-react';
import './Navbar.css';

function Navbar() {

  const onglets = [
    "Musique",
    "Cinéma",
    "Littérature",
    "Culture & Société",
    "Les réco de la rédac."
  ];

  return (
    <nav>
        <img className="logo-short" src="/181.webp" alt="Logo de Multitude" />
    

        {/* Menu de navigation */}
        <ul className="ul-onglet">
          {onglets.map((onglet, index) => (
            <li key={index}>
              <Link to={`/${onglet.toLowerCase().replace(/ & /g, "-")}`} onClick={() => setIsOpen(false)}>
                {onglet}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{padding: '1rem'}}>
          <Search  color="black" />
        </div>
    </nav>
  );
}

export default Navbar;
