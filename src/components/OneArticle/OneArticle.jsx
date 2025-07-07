import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./OneArticle.css";

function OneArticle() {
  const { id } = useParams();
   // ✅ Debug

  const [article, setArticle] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [categoryName , setCategoryName] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("L'ID de l'article est introuvable.");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/articles/${id}`);
        const articleData = response.data;
        setArticle(articleData);

        // Vérification que la catégorie existe avant de faire la requête
        if (articleData.category) {

            const categoryName = getCategoryName(articleData.category);
            setCategoryName(categoryName);

          if (categoryName) {
            const suggResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/articles/category/${articleData.category}`);
            setSuggestions(suggResponse.data);
          } else {
            setSuggestions([]);
          }
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de l'article :", err);
        setError("Impossible de charger l'article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Fonction pour obtenir le nom de la catégorie en fonction de son ID
  const getCategoryName = (categoryId) => {
    const categories = {
      5: "Littérature",
      6: "Musique",
      7: "Cinéma",
      8: "Culture & Société",
    };
    return categories[categoryId] || null;
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!article) return <p>Aucun article trouvé.</p>;

  return (
    <main className="singlePage">
        <div className="part-one-article">
            <h1>{article.titre}</h1>
            <h2>{article.extrait}</h2>

            <img src={article.image} alt={article.titre} />

            <p>{article.description}</p>

            <video 
                src={article.video} 
                muted 
                loop 
            />
        </div>

        <aside className="part-suggestion">
            <h2>Suggestions</h2>

            {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
                <Link to={`/article/${suggestion.id}`}>
                    <div className="post-suggestion" key={suggestion.id}>
                        <img src={suggestion.image} alt={suggestion.titre} />
                        <div className="post-text">
                            <p><span>{categoryName}</span></p>
                            <h3>{suggestion.titre}</h3>
                        </div>
                    </div>
                </Link>

            ))
            ) : (
            <p>Aucune suggestion disponible.</p>
            )}
        </aside>
    </main>
  );
}

export default OneArticle;
