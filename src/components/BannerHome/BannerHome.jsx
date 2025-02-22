import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./BannerHome.css";

function BannerHome() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/articles/trend/trending`);
        setArticles(response.data.slice(0, 3)); // On prend les 3 premiers articles
      } catch (err) {
        console.error("Erreur lors de la récupération des tendances :", err);
        setError("Impossible de charger les tendances.");
      } finally {
        setLoading(false);
      }
    };

    // Assure un temps minimum d'affichage du loader
    const timeout = setTimeout(() => {
        fetchTrendingArticles().finally(() => setLoading(false));
        }, 2000); // ⏳ Affichage du loader pendant au moins 2s
    
        return () => clearTimeout(timeout); // Nettoie le timeout si le composant est démonté
        
  }, []);

  if (loading) return <LoadingPage/>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="bannerhome">
      {/* Grande image à gauche */}
      <div className="partOne">

        <img src={articles[0]?.image} alt={articles[0]?.title} />

        <div className="overlay">
          <h2 className="bannerh1">🔥 A la une</h2>
          <h3>{articles[0]?.titre}</h3>
          <p>{articles[0]?.description}</p>
          <Link to={`/article/${articles[0]?.id}`}>
            <button>Voir plus</button>
          </Link>
        </div>
      </div>

      {/* Deux images superposées à droite */}
      <div className="part">
        {articles.slice(1, 3).map((article) => (
          <div className="secondImage" key={article.id}>

            <img src={article.image} alt={article.title} />

            <div className="overlay">
              <h3>{article.titre}</h3>
              <p>{article.description}</p>
              <Link to={`/article/${article.id}`}>
                <button>Voir plus</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerHome;
