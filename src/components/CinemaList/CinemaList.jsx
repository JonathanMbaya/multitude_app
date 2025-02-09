import React, { useState } from "react";
import { CircleX } from 'lucide-react';
import "./CinemaList.css";

const movies = [
  {
    "id": 1,
    "title": "La Plus Précieuse des marchandises",
    "description": "Un film d'animation poignant de Michel Hazanavicius sur l'Holocauste, basé sur le livre de Jean-Claude Grumberg.",
    "image": "https://fr.web.img6.acsta.net/img/6b/bf/6bbf674e166f0f6e921298bd13280381.jpg",
    "trailer": "https://www.youtube.com/watch?v=example1"
  },
  {
    "id": 2,
    "title": "Direct Action",
    "description": "Un documentaire fascinant de Guillaume Cailleau et Ben Russell, capturant la vie quotidienne dans la ZAD de Notre-Dame-des-Landes après l'abandon du projet d'aéroport en 2018.",
    "image": "https://shellacfilms.com/wp-content/uploads/2024/01/Affiche-DIRECT-ACTION-HD-scaled.jpg",
    "trailer": "https://www.youtube.com/watch?v=example2"
  },
  {
    "id": 3,
    "title": "Diamant brut",
    "description": "Un long-métrage d'Agathe Riedinger qui explore l'obsession d'une jeune femme de 19 ans pour l'apparence et la reconnaissance.",
    "image": "https://fr.web.img6.acsta.net/img/13/6a/136a83527c596c81fdb74c8b81ec057a.jpg",
    "trailer": "https://www.youtube.com/watch?v=example3"
  },
  {
    "id": 4,
    "title": "La Passion selon Béatrice",
    "description": "Un road-movie en noir et blanc de Fabrice du Welz avec Béatrice Dalle sur les traces de Pasolini en Italie.",
    "image": "https://carlottafilms.com/wp-content/uploads/2024/08/AFF-LA-PASSION-SELON-B%C3%89ATRICE-HD-scaled.jpg",
    "trailer": "https://www.youtube.com/watch?v=example4"
  },
  {
    "id": 5,
    "title": "Le Choix",
    "description": "Un film de Dania Reymond-Boughenou sur des tempêtes de poussière en Algérie.",
    "image": "https://fr.web.img6.acsta.net/img/3e/10/3e10a9866861fc64911fb0acc34c3a3d.jpg",
    "trailer": "https://www.youtube.com/watch?v=example5"
  },
  {
    "id": 6,
    "title": "Ni Chaînes Ni Maîtres",
    "description": "1759. Isle de France (actuelle île Maurice). ​Massamba et Mati, esclaves dans la plantation d’Eugène Larcenet, vivent dans la peur et le labeur. Lui rêve que sa fille soit affranchie, elle de quitter l’enfer vert de la canne à sucre. Une nuit, elle s’enfuit",
    "image": "https://fr.web.img4.acsta.net/img/06/b4/06b4917de6c12c2daef10902a7495909.jpg",
    "trailer": "https://www.youtube.com/embed/Rr3QFNoLXuo?si=YP0qD6OCT6ax15Ij"
  }
];


function CinemaList() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="cinema-list">
      <h1>Liste des Films</h1>
      <p>
        Multitude vous propose son top 6 de films chaque mois , 
        des coups de coeurs de la rédaction : <br></br> de la romance , 
        du suspense , du drame , des classiques , vous aurez toujours un film à regarder pour la soirée.
      </p>
      <div className="movies-grid">
        {movies.map((movie, index) => (
          <div key={movie.id} className="movie-card">
            <span className="movie-number">{index + 1}</span>
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="movie-image"
              onClick={() => setSelectedMovie(movie)}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <button style={{color:'black'}} className="close-modal" onClick={() => setSelectedMovie(null)}><CircleX/></button>
            <h2 style={{color:'black'}}>{selectedMovie.title}</h2>
            <p style={{color:'black'}}>{selectedMovie.description}</p>
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
