import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { RotateCw } from 'lucide-react';
import './Category.css';

const articles = [
  {
    id: 1,
    category: "Musique",
    title: "Titre de l'article",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolorum incidunt quod sint quaerat accusamus...",
    time: "3 mins de lecture",
    date: "01 Janvier 2024",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Cinéma",
    title: "Un autre article",
    excerpt:
      "Découvrez les dernières sorties cinéma et nos recommandations pour cette semaine...",
    time: "5 mins de lecture",
    date: "15 Février 2024",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
  },
];

function Category() {
  return (
    <>
      <Navbar />
      <main className="category-page">
        <h1 bannerh1>Musique</h1>

        <div className="articles-container">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              className="post-article"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <img src={article.img} alt={article.title} />

              <div className="post-text">
                <p><span>{article.category}</span></p>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <p><span>{article.time}</span></p>
                <p><span>{article.date}</span></p>
              </div>

              <hr />

            </motion.div>

          ))}
        </div>

        <motion.button
          className="btn-more"
        >
          <RotateCw/>  Voir plus
        </motion.button>

        <hr />
      </main>
      <Footer />
    </>
  );
}

export default Category;
