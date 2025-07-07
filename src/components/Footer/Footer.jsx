import React from "react";
import { Link } from "react-router-dom"; // ✅ Import de Link
import { Instagram } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons"; // ✅ Correction ici
import "./Footer.css";

function Footer() {
  const sitemap = [
    "Musique",
    "Cinéma",
    "Littérature",
    "Culture & Société",
    "Les réco de la rédac.",
  ];

  const utileSite = [
    "Accueil",
    "A propos",
    "Contactez-nous",
    "Mentions Légales",
  ];

  return (
    <footer>
      <img
        src="/171.png"
        alt="logo multitude long complet"
        className="footer-logo"
      />

      <ul className="footer-links">
        {utileSite.map((onglet, index) => (
          <li key={index}>
            <Link
              to={`/${onglet.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
            >
              {onglet}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="footer-links">
        {sitemap.map((onglet, index) => (
          <li key={index}>
            <Link
              to={`/${onglet.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
            >
              {onglet}
            </Link>
          </li>
        ))}
      </ul>

      <div className="footer-social">
        <h5>Suivez-nous sur les réseaux sociaux</h5>
        <div className="social-icons">
          <Instagram color="black" />
          <FontAwesomeIcon icon={faTiktok} size="lg" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
