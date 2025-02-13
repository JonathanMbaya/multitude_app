import React, { useState } from "react";
import { Ellipsis } from "lucide-react";
import "./ListAdminArticle.css";

const initialArticles = [
  {
    id: 1,
    title: "La révolution du streaming musical",
    category: "Musique",
    description: "Analyse de l'évolution du streaming musical et de son impact sur l'industrie.",
    readTime: "3 mins",
    date: "2024-01-01",
  },
  {
    id: 2,
    title: "Les meilleurs films de 2024",
    category: "Cinéma",
    description: "Une sélection des films incontournables de cette année.",
    readTime: "5 mins",
    date: "2024-02-10",
  },
  {
    id: 3,
    title: "L'intelligence artificielle et l'avenir du travail",
    category: "Technologie",
    description: "Comment l'IA change le marché de l'emploi.",
    readTime: "4 mins",
    date: "2024-03-15",
  },
];

function ListAdminArticle() {
  const [articles, setArticles] = useState(initialArticles);
  const [menuOpen, setMenuOpen] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
    if (confirmDelete) {
      setArticles(articles.filter((article) => article.id !== id));
      setMenuOpen(null);
    }
  };

  const handleEdit = (id) => {
    alert(`Modifier l'article ID: ${id} (Ajoute ici un formulaire de modification)`);
    setMenuOpen(null);
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Filtrage des articles
  const filteredArticles = articles.filter((article) => {
    return (
      (categoryFilter === "" || article.category === categoryFilter) &&
      (dateFilter === "" || article.date === dateFilter)
    );
  });

  // Récupérer les catégories uniques
  const categories = [...new Set(articles.map((article) => article.category))];

  return (
    <div className="admin-cards-container">
      {/* Filtres */}
      <div className="filters">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button onClick={() => { setCategoryFilter(""); setDateFilter(""); }}>
          Réinitialiser
        </button>
      </div>

      <div className="admin-cards-wrapper">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="article-card">
              <p className="category">{article.category}</p>

              <div className="card-header">
                <h3 style={{ color: "black" }}>{article.title}</h3>
                <Ellipsis className="ellipsis-icon" onClick={() => toggleMenu(article.id)} />
                {menuOpen === article.id && (
                  <div className="dropdown-menu">
                    <button className="edit-btn" onClick={() => handleEdit(article.id)}>Modifier</button>
                    <button className="delete-btn" onClick={() => handleDelete(article.id)}>Supprimer</button>
                  </div>
                )}
              </div>
              <p className="description">{article.description}</p>
              <p className="date">Publié le: {article.date}</p>
            </div>
          ))
        ) : (
          <p className="no-data">Aucun article trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default ListAdminArticle;
