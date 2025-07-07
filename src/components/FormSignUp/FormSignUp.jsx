import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Lock } from "lucide-react";
import "./FormSignUp.css";

function FormSignUp() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);
    alert("Inscription réussie !");
  };

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 style={{ color: "black" }}>Créer un compte</h1>
        <p>Inscrivez-vous pour accéder à nos contenus exclusifs.</p>

        <div className="form-group">
          <label htmlFor="nom">
            <User size={20} /> Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <Mail size={20} /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <Lock size={20} /> Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            <Lock size={20} /> Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <motion.button type="submit" whileHover={{ scale: 1.05 }}>
          S'inscrire
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default FormSignUp;
