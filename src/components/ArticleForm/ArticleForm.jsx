import React, { useState } from "react";
import { CircleX, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import "./ArticleForm.css";

function ArticleForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    readTime: "",
    date: "",
    image: null,
    externalSource: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Article ajouté !");
    console.log(formData);
    onClose(); // Fermer le modal après soumission
  };

  return (
    <div className="article-form-overlay">
      <div className="article-form-container">
        <button className="close-modal" onClick={onClose}><CircleX /></button>
        <form className="article-form" onSubmit={handleSubmit}>
          <h2 style={{marginBottom: '2rem'}}>Créer un article</h2>

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
                <p style={{color: 'black'}}>Entrez toutes les informations sur votre nouvelle article.</p>

                <label>Titre</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />

                <label>Catégorie</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />

                <label>Temps de lecture</label>
                <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} required />

                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
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
                <p style={{color: 'black'}}>Saisissez un extrait accrocheur et l'ensemble de votre texte.</p>

                <label>Extrait d'article</label>
                <textarea name="description" className="extract" value={formData.description} onChange={handleChange} required />

                <label>Description</label>
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
                <p style={{color: 'black'}}>Intégrer une image à mettre en avant ainsi que des sources externes utiles pour inviter les lecteurs à découvrir des playlists.</p>

                <label>Image de l'article</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />

                {formData.image && (
                  <div className="image-preview">
                    <img src={formData.image} alt="Aperçu" />
                  </div>
                )}

                <label>Lien externe (YouTube, Spotify...)</label>
                <input type="text" name="externalSource" value={formData.externalSource} onChange={handleChange} placeholder="https://www.youtube.com/watch?v=..." />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="form-navigation">
            {step > 1 && <button type="button" className="nav-button" onClick={() => setStep(step - 1)}><ChevronLeft /></button>}
            {step < 3 ? (
              <button type="button" className="nav-button" onClick={() => setStep(step + 1)}><ChevronRight /></button>
            ) : (
              <button type="submit">Publier</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArticleForm;
