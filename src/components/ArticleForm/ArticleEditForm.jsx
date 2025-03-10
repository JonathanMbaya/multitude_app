import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircleX, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import "./ArticleForm.css";

function ArticleEditForm({ article, onClose }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    titre: article?.titre || "",
    extrait: article?.extrait || "",
    description: article?.description || "",
    category: article?.category || "",
    image: article?.image || "",
    video: article?.video || "",
    trend: article?.trend || false,
    published_by: article?.published_by || user?.id || "",
  });

  const [categories, setCategories] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur de chargement des catégories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/articles/${article.id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      onClose();
    } catch (error) {
      console.error("Erreur:", error.response?.data || error.message);
      alert(`Erreur: ${error.response?.data?.message || "Impossible de modifier l'article."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-form-overlay">
      <div className="article-form-container">
        <button className="close-modal" onClick={onClose}>
          <CircleX />
        </button>
        <form className="article-form" onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: "2rem" }}>Modifier l'article</h2>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="form-step"
              >
                <label>Titre</label>
                <input type="text" name="titre" value={formData.titre} onChange={handleChange} required />

                <label>Extrait</label>
                <input type="text" name="extrait" value={formData.extrait} onChange={handleChange} required />

                <label>Catégorie</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="form-step"
              >
                <label>Texte</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="form-step"
              >
                <label>Image</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />

                <label>Vidéo (lien YouTube, etc.)</label>
                <input type="text" name="video" value={formData.video} onChange={handleChange} />

                <label>Article en tendance</label>
                <input type="checkbox" name="trend" checked={formData.trend} onChange={handleChange} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="form-navigation">
            {step > 1 && (
              <button type="button" className="nav-button" onClick={() => setStep(step - 1)}>
                <ChevronLeft />
              </button>
            )}
            {step < 3 && (
              <button type="button" className="nav-button" onClick={() => setStep(step + 1)}>
                <ChevronRight />
              </button>
            )}
            {step === 3 && (
              <button type="submit" disabled={loading}>
                {loading ? "Modification..." : "Modifier"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArticleEditForm;
