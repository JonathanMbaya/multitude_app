import React from "react";
import { motion } from "framer-motion";
import "./LoadingPage.css";

function LoadingPage() {
  return (
    <div className="all-loading">
      <div className="loading-container">
        <img className="logo-loading" src="/181.png" alt="Logo de Multitude" />
        {/* Cercle de progression animé */}
        <motion.div
          className="progress-circle"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <div className="inner-circle"></div>
        </motion.div>

        {/* Texte animé */}
        <motion.p
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          Chargement...
        </motion.p>
      </div>
    </div>
  );
}

export default LoadingPage;
