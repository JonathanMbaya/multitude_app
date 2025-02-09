import React, { useState } from "react";
import { CircleX } from 'lucide-react';
import "./LectureList.css";

const books = [
  {
    id: 1,
    title: "Les Misérables",
    description: "Un roman classique de Victor Hugo sur la justice, la rédemption et la révolution.",
    image: "https://www.parismuseescollections.paris.fr/sites/default/files/styles/pm_diaporama/public/atoms/images/MVH/aze_mvhperec3069.05_001.jpg?itok=uKikxBqb",
    trailer: "https://www.youtube.com/embed/bJXnhwhdi9Y"
  },
  {
    id: 2,
    title: "1984",
    description: "Un roman dystopique de George Orwell explorant les thèmes du totalitarisme et de la surveillance.",
    image: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
    trailer: "https://www.youtube.com/embed/Z4rBDUJTnNU"
  },
  {
    id: 3,
    title: "Le Petit Prince",
    description: "Une histoire poétique et philosophique d'Antoine de Saint-Exupéry.",
    image: "https://www.hello-merlin.com/wp-content/uploads/2023/11/00601215705225.png",
  },
  {
    id: 4,
    title: "Harry Potter à l'école des sorciers",
    description: "Le premier tome des aventures de Harry Potter par J.K. Rowling.",
    image: "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 5,
    title: "L'Étranger",
    description: "Un roman existentialiste d'Albert Camus sur l'absurdité de la vie.",
    image: "https://m.media-amazon.com/images/I/71OxaXFFvqL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 6,
    title: "Orgueil et Préjugés",
    description: "Un classique de Jane Austen sur l'amour et les conventions sociales.",
    image: "https://m.media-amazon.com/images/I/91HHqVTAJQL._AC_UF1000,1000_QL80_.jpg",
  }
];

function LectureList() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="lecture-list">
      <h1>Liste de Lecture</h1>
      <p>
        Multitude vous propose une pile à lire, notre top 6 chaque mois , 
        des coups de coeurs de la rédaction : <br></br> de la romance , 
        du suspense , du drame , des classiques , vous aurez 
        de quoi lire cet après midi.
    </p>
      <div className="books-grid">
        {books.map((book, index) => (
          <div key={book.id} className="book-card">
            <span className="book-number">{index + 1}</span>
            <img 
              src={book.image} 
              alt={book.title} 
              className="book-image"
              onClick={() => setSelectedBook(book)}
            />
            <h3>{book.title}</h3>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <button style={{color:'black'}} className="close-modal" onClick={() => setSelectedBook(null)}><CircleX/></button>
            <h2 style={{color:'black'}}>{selectedBook.title}</h2>
            <p style={{color:'black'}}>{selectedBook.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LectureList;
