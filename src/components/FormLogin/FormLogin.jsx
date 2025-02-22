import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import "./FormLogin.css";

function FormLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();  // Utilise le contexte

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);  // Met à jour le contexte global
      navigate("/admin/home"); // Redirection après connexion
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <motion.div 
      className="login-container"
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
        <h1 style={{ color: 'black' }}>Connexion</h1>
        <p style={{ color: 'black' }}>Connectez-vous pour accéder à votre compte.</p>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="form-group">
          <label style={{ color: 'black' }} htmlFor="email">
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
          <label style={{ color: 'black' }} htmlFor="password">
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

        <motion.button 
          style={{ backgroundColor: 'black', color: 'white' }}
          type="submit"
        >
          Se connecter
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default FormLogin;
