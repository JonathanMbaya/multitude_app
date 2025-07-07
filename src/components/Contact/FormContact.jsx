import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageCircle } from "lucide-react";
import "./FormContact.css";

function FormContact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert("Formulaire envoyé !");
  };

  return (
    <>
      <motion.div 
        className="contact-container"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <div>
            <motion.div 
            className="contact-illustration"
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
            >
            <img src="/contact-illustration.avif" alt="Illustration Contact" />
            </motion.div>
        </div>


        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
        >
            <h1 style={{color: 'black'}}>Contactez-nous</h1>
            <p style={{color: 'black'}}>Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</p>

            <div className="form-group">
                <label style={{color: 'black'}} htmlFor="nom"><User size={20} /> Nom</label>
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
                <label style={{color: 'black'}} htmlFor="message"><MessageCircle size={20} /> Message</label>
                <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                ></textarea>
            </div>

            <motion.button 
                type="submit"
            >
                Envoyer
            </motion.button>
        </motion.form>
      </motion.div>
    </>
  );
}

export default FormContact;
