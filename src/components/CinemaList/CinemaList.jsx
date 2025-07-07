import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircleX } from "lucide-react";
import "./CinemaList.css";

function CinemaList() {
  const [movies, setMovies] = useState([]); // Stocke les films récupérés
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des films depuis l'API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/films`,
        );
        setMovies(response.data); // Mettre à jour l'état avec les films récupérés
      } catch (err) {
        setError("Erreur lors du chargement des films. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="cinema-list">
      <h1>Liste des Films</h1>
      <p>
        Multitude vous propose son top 6 de films chaque mois, des coups de cœur
        de la rédaction : de la romance, du suspense, du drame, des
        classiques... Vous aurez toujours un film à regarder pour la soirée.
      </p>

      {/* Affichage du message de chargement ou d'erreur */}
      {loading && <p>Chargement des films...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="movies-grid">
        {!loading &&
          !error &&
          movies.map((movie, index) => (
            <div key={movie.id} className="movie-card">
              <span className="movie-number">{index + 1}</span>
              <div onClick={() => setSelectedMovie(movie)}>
                <img
                  src={movie.cover}
                  alt={movie.titre}
                  className="movie-image"
                />
              </div>
              <h3>{movie.titre}</h3>
            </div>
          ))}
      </div>

      {/* Modal d'affichage des détails du film sélectionné */}
      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setSelectedMovie(null)}
            >
              <CircleX />
            </button>
            <h2 style={{ color: "black" }}>{selectedMovie.titre}</h2>
            <p style={{ color: "black" }}>{selectedMovie.description}</p>
            <iframe
              src={selectedMovie.trailer}
              title="Bande-annonce"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default CinemaList;
