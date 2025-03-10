import React, { useEffect, useState } from "react";
import { Ellipsis, Plus, CircleX } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import "./ListAdminArticle.css";
import ArticleEditForm from "../ArticleForm/ArticleEditForm";
import ArticleForm from "../ArticleForm/ArticleForm"; // Import du formulaire de création

function ListAdminArticle() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilterStart, setDateFilterStart] = useState("");
  const [dateFilterEnd, setDateFilterEnd] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/articles/all`);
        setArticles(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des articles :", error);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/articles/${id}`);
        setArticles(articles.filter((article) => article.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression de l'article :", error);
      }
    }
    setMenuOpen(null);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setShowForm(true);
    setMenuOpen(null);
  };

  const handleAdd = () => {
    setEditingArticle("ajouter");
    setShowForm(true);
  };

  const handleSubmit = async (articleData) => {
    try {
      const isEditing = typeof editingArticle === "object";
      const url = isEditing
        ? `${import.meta.env.VITE_API_BASE_URL}/articles/${articleData.id}`
        : `${import.meta.env.VITE_API_BASE_URL}/articles/create`;

      if (isEditing) {
        await axios.put(url, articleData);
      } else {
        const response = await axios.post(url, articleData);
        articleData.id = response.data.id;
      }

      setArticles((prev) =>
        isEditing ? prev.map((a) => (a.id === articleData.id ? articleData : a)) : [...prev, articleData]
      );

      setShowForm(false);
      setEditingArticle(null);
    } catch (error) {
      console.error("Erreur lors de la soumission de l'article:", error);
    }
  };

  return (
    <div className="admin-cards-container">
      <div className="filters">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input type="date" value={dateFilterStart} onChange={(e) => setDateFilterStart(e.target.value)} />
        <input type="date" value={dateFilterEnd} onChange={(e) => setDateFilterEnd(e.target.value)} />
        <button onClick={() => {
          setCategoryFilter("");
          setDateFilterStart("");
          setDateFilterEnd("");
        }}>
          Réinitialiser
        </button>
        <button className="add-button" onClick={handleAdd}>
          <Plus /> Ajouter un article
        </button>
      </div>

      <div className="admin-cards-wrapper">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <p className="category">{categories.find(c => c.id === article.category)?.name || "Sans catégorie"}</p>
            <div className="card-header">
              <h3 style={{color: 'black'}}>{article.titre}</h3>
              <Ellipsis className="ellipsis-icon" onClick={() => setMenuOpen(menuOpen === article.id ? null : article.id)} />
              {menuOpen === article.id && (
                <div className="dropdown-menu">
                  <button onClick={() => handleEdit(article)}>Modifier</button>
                  <button onClick={() => handleDelete(article.id)}>Supprimer</button>
                </div>
              )}
            </div>
            <p className="description">{article.extrait}</p>
            <p className="date">Publié le: {article.datePublication}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="overlay">
          <button className="close-modal" onClick={() => setShowForm(false)}>
            <CircleX />
          </button>

          {editingArticle === "ajouter" ? (
            <ArticleForm onClose={() => setShowForm(false)} onSubmit={handleSubmit} />
          ) : (
            <ArticleEditForm article={editingArticle} onClose={() => setShowForm(false)} onSubmit={handleSubmit} />
          )}
        </div>
      )}
    </div>
  );
}

export default ListAdminArticle;
