import React, { useState, useEffect } from "react";
import axios from "axios"; // Importer axios
import { CircleX } from "lucide-react";
import "./LectureList.css";

function LectureList() {
  const [books, setBooks] = useState([]); // Stocker les livres récupérés
  const [selectedBook, setSelectedBook] = useState(null);

  // Fonction pour récupérer les livres depuis l'API
  useEffect(() => {
    // Exemple d'URL d'API (remplacez cette URL par l'API réelle que vous souhaitez utiliser)
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/livres`,
        ); // Requête avec axios
        setBooks(response.data); // Mettre à jour l'état avec les livres récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des livres:", error);
      }
    };

    fetchBooks(); // Appeler la fonction lors du montage du composant
  }, []);

  return (
    <div className="lecture-list">
      <h1>Liste de Lecture</h1>
      <p>
        Multitude vous propose une pile à lire, notre top 6 chaque mois, des
        coups de coeur de la rédaction : <br />
        de la romance, du suspense, du drame, des classiques, vous aurez de quoi
        lire cet après-midi.
      </p>
      <div className="books-grid">
        {books.map((book, index) => (
          <div key={book.id} className="book-card">
            <span className="book-number">{index + 1}</span>
            <div onClick={() => setSelectedBook(book)}>
              <img src={book.cover} alt={book.title} className="book-image" />
            </div>
            <h3>{book.title}</h3>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <button
              style={{ color: "black" }}
              className="close-modal"
              onClick={() => setSelectedBook(null)}
            >
              <CircleX />
            </button>
            <h2 style={{ color: "black" }}>{selectedBook.title}</h2>
            <p style={{ color: "black" }}>{selectedBook.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LectureList;
