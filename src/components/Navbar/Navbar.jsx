import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, ChevronDown, ChevronUp, Instagram } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons"; 
import axios from "axios"; 
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [articles, setArticles] = useState([]); 

  const categories = {
    5: "Littérature",
    6: "Musique",
    7: "Cinéma",
    8: "Culture & Société",
  };

  const getCategoryId = (categoryName) => {
    return Object.keys(categories).find((key) => categories[key] === categoryName);
  };

  const categoryNames = Object.values(categories);
  const sousMenuReco = ["multimusique", "multicinema", "multilecture"];

  // Fonction pour récupérer les articles en fonction de la recherche
  useEffect(() => {
    const fetchArticles = async () => {
      if (!query.trim()) {
        setArticles([]); // Vider la liste si l'utilisateur supprime le texte
        return;
      }
      try {
        const response = await axios.get(`https://backmultitude-production.up.railway.app/search?q=${query}`);
        setArticles(response.data); 
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
      }
    };

    const timeoutId = setTimeout(fetchArticles, 300); // Délais pour éviter trop de requêtes
    return () => clearTimeout(timeoutId); // Nettoyer si l'utilisateur tape rapidement
  }, [query]); // Appeler cette fonction à chaque changement de `query`

  return (
    <>
      {/* Réseaux sociaux */}
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
        <Link to="/">
          <img className="logo-short" src="/181.png" alt="Logo de Multitude" />
        </Link>

        {/* Menu de navigation */}
        <ul className={`ul-onglet ${isOpen ? "open" : ""}`}>
          {categoryNames.map((category, index) => {
            const categoryId = getCategoryId(category);
            return (
              <li key={index}>
                <Link 
                  to={`/category/${categoryId}`} 
                  onClick={() => setIsOpen(false)}
                >
                  {category}
                </Link>
              </li>
            );
          })}

          {/* Menu déroulant "Les réco de la rédac." */}
          <li className="dropdown">
            <div 
              className="dropdown-btn" 
              onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            >
              Les réco de la rédac. {isSubMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {isSubMenuOpen && (
              <ul className="dropdown-menu">
                {sousMenuReco.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={`/reco/${item.toLowerCase().replace(/\s+/g, "-")}`} 
                      onClick={() => setIsOpen(false)}
                    >
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

      {/* Barre de recherche */}
      <div className={`search-bar ${searchOpen ? "open" : ""}`}>
        <div className="action-search">
          <input
            type="text"
            placeholder="Rechercher un article"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="close-search" onClick={() => setSearchOpen(false)}>✖</button>
        </div>

        {/* Résultats de recherche */}
        {query && (
          <div className="search-results">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Link key={article.id} to={`/article/${article.id}`} className="search-result-item">
                  <div className="card-search">
                    {article.titre}
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-results">Aucun article trouvé</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
