import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LastArticles.css";
import LoadingPage from "../LoadingPage/LoadingPage";

function LastArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRefs = useRef({}); // Stocke une référence vidéo unique pour chaque article

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/articles/last/latest`,
        );
        setArticles(response.data);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des derniers articles :",
          err,
        );
        setError("Impossible de charger les derniers articles.");
      } finally {
        setLoading(false);
      }
    };

    // Assure un temps minimum d'affichage du loader
    const timeout = setTimeout(() => {
      fetchLatestArticles().finally(() => setLoading(false));
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  const getCategoryName = (categoryId) => {
    const categories = {
      5: "Littérature",
      6: "Musique",
      7: "Cinéma",
      8: "Culture & Société",
    };
    return categories[categoryId] || "Autre";
  };

  const handleMouseEnter = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].style.opacity = "1"; // Affiche la vidéo
      videoRefs.current[id].play(); // Joue la vidéo
    }
  };

  const handleMouseLeave = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].style.opacity = "0"; // Cache la vidéo
      videoRefs.current[id].pause(); // Met en pause
      videoRefs.current[id].currentTime = 0; // Réinitialise la vidéo
    }
  };

  if (loading)
    return (
      <div>
        <hr style={{ maxWidth: "300px" }} />
        <LoadingPage />
      </div>
    );
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (articles.length === 0) return <p>Aucun article disponible.</p>;

  return (
    <div className="latest">
      <hr />
      <h2 style={{ fontSize: "54px" }}>Les derniers articles</h2>

      {articles.map((article) => (
        <div className="post-article-home" key={article.id}>
          <Link to={`/article/${article.id}`}>
            <div
              className="media-container"
              onMouseEnter={() => handleMouseEnter(article.id)}
              onMouseLeave={() => handleMouseLeave(article.id)}
            >
              <img src={article.image} alt={article.titre} />
              {article.video && (
                <img
                  ref={(el) => (videoRefs.current[article.id] = el)}
                  src={article.video}
                  className="article-video"
                />
              )}
            </div>
          </Link>

          <div className="post-text-home">
            <span className="text-category">
              {getCategoryName(article.category)}
            </span>
            <h2>{article.titre}</h2>
            <p>{article.extrait}</p>
            <p className="text-mini">
              <span>{article.tempsLecture} mins de lecture</span>
              <span>
                {article.datePublication
                  ? new Date(article.datePublication.replace(" ", "T"))
                      .toLocaleString("fr-FR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                      .replace(":", "H")
                  : "Date inconnue"}
              </span>
              <span>Publié par @{article.published_by}</span>
            </p>
          </div>
        </div>
      ))}

      <button className="btn-more-home">Afficher plus</button>
      <hr />
    </div>
  );
}

export default LastArticles;
