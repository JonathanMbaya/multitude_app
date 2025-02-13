import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import "./FormLogin.css";

function FormLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion avec:", formData);
    alert("Connexion réussie !");
  };

  return (
    <motion.div 
      className="login-container"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
    >
      {/* <motion.div 
        className="login-illustration"
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 1, delay: 0.5 }}
      >
        <img src="/login-illustration.avif" alt="Illustration Connexion" />
      </motion.div> */}
      

      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 style={{color: 'black'}}>Connexion</h1>
        <p style={{color: 'black'}}>Connectez-vous pour accéder à votre compte.</p>

        <div className="form-group">
          <label style={{color: 'black'}} htmlFor="email"><Mail size={20} /> Email</label>
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
          <label style={{color: 'black'}} htmlFor="password"><Lock size={20} /> Mot de passe</label>
          <input 
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <motion.button type="submit">
          <Link>
            Se connecter
          </Link>
        </motion.button>

      </motion.form>
    </motion.div>
  );
}

export default FormLogin;
