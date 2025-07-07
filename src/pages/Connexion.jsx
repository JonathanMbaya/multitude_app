import React, { useState } from "react";
import { Link, Links } from "react-router-dom";
import FormLogin from "../components/FormLogin/FormLogin";
import FormSignUp from "../components/FormSignUp/FormSignUp";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import "./Connexion.css";

function Connexion() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <main className="connexion-container">
      {/* Bouton Retour */}
      <Link to="/" className="back-button">
        <button>
          <ChevronLeft /> Retour
        </button>
      </Link>

      {/* Logo */}
      <img
        src="/171.png"
        alt="logo multitude long complet"
        className="footer-logo"
      />

      {/* Onglets Connexion/Inscription */}
      <div className="tabs">
        <motion.button
          className={activeTab === "login" ? "active" : ""}
          onClick={() => setActiveTab("login")}
          whileHover={{ scale: 1.1 }}
        >
          Se connecter
        </motion.button>

        <motion.button
          className={activeTab === "signup" ? "active" : ""}
          onClick={() => setActiveTab("signup")}
          whileHover={{ scale: 1.1 }}
        >
          S'inscrire
        </motion.button>
      </div>

      {/* Affichage du formulaire actif */}
      <div>{activeTab === "login" ? <FormLogin /> : ""}</div>
    </main>
  );
}

export default Connexion;
