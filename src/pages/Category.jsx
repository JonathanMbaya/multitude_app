import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { RotateCw } from "lucide-react";
import "./Category.css";

function Category() {
  const { id } = useParams(); // Récupère la catégorie depuis l'URL
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/articles/category/${id}`,
        );
        setArticles(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des articles :", err);
        setError("Impossible de charger les articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]); // Exécute l'effet lorsque la catégorie change

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
  if (articles.length === 0)
    return <p>Aucun article trouvé pour cette catégorie.</p>;

  return (
    <>
      <Navbar />
      <main className="category-page">
        <h1>{getCategoryName(id)}</h1>

        <div className="articles-container">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              className="post-article"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <img src={article.image} alt={article.title} />

              <div className="post-text">
                <span className="text-category">{getCategoryName(id)}</span>
                <h2>{article.titre}</h2>
                <p>{article.extrait}</p>
                <p className="text-mini">
                  <span>{article.readingTime}2 mins de lecture</span>
                  <span>
                    {article.datePublication
                      ? new Date(
                          article.datePublication.replace(" ", "T"), // Remplace l'espace par "T"
                        )
                          .toLocaleString("fr-FR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                          .replace(":", "H") // Remplace l'espace par "T"
                      : "Date inconnue"}
                  </span>
                </p>
                <Link to={`/article/${article.id}`}>
                  <button style={{ padding: "1rem" }}>Lire l'article</button>
                </Link>
              </div>

              <hr />
            </motion.div>
          ))}
        </div>

        <motion.button className="btn-more">
          <RotateCw /> Voir plus
        </motion.button>

        <hr />
      </main>
      <Footer />
    </>
  );
}

export default Category;
