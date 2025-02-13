import React, { useState } from "react";
import { CircleX, Plus, Film, Book } from "lucide-react";
import { motion } from "framer-motion";
import "./AdminLibrary.css";
import NavAdmin from "../components/NavAdmin/NavAdmin";

function AdminLibrary() {
  const [activeTab, setActiveTab] = useState("films");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);
  const [items, setItems] = useState({
    films: [
      { id: 1, title: "Inception", category: "Science-Fiction", date: "2010" },
      { id: 2, title: "Interstellar", category: "Aventure", date: "2014" },
    ],
    books: [
      { id: 1, title: "1984", category: "Dystopie", date: "1949" },
      { id: 2, title: "Le Seigneur des Anneaux", category: "Fantasy", date: "1954" },
    ],
  });

  const handleAddItem = (newItem) => {
    setItems((prev) => ({
      ...prev,
      [formType]: [...prev[formType], { id: Date.now(), ...newItem }],
    }));
    setShowForm(false);
  };

  return (
    <>

        <NavAdmin/>

        <div className="admin-library">
            <h2>La bibliothèque</h2>
            <div className="tabs">
                <button className={activeTab === "films" ? "active" : ""} onClick={() => setActiveTab("films")}>
                <Film /> Films
                </button>
                <button className={activeTab === "books" ? "active" : ""} onClick={() => setActiveTab("books")}>
                <Book /> Livres
                </button>
            </div>

            <div className="actions">
                <button onClick={() => { setShowForm(true); setFormType("films"); }}>
                <Plus /> Ajouter un film
                </button>
                <button onClick={() => { setShowForm(true); setFormType("books"); }}>
                <Plus /> Ajouter un livre
                </button>
            </div>

            <div className="list-container">
                {items[activeTab].map((item) => (
                <div key={item.id} className="item-card">
                    <h3 style={{color:'black'}}>{item.title}</h3>
                    <p style={{color:'black'}}>{item.category} - {item.date}</p>
                </div>
                ))}
            </div>

            {showForm && <ItemForm type={formType} onClose={() => setShowForm(false)} onSubmit={handleAddItem} />}
        </div>
    
    </>

  );
}

function ItemForm({ type, onClose, onSubmit }) {
  const [formData, setFormData] = useState({ title: "", category: "", date: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="overlayy">
      <motion.div className="form-container" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
        <button className="close-btn" onClick={onClose}><CircleX /></button>
        <h3>Ajouter un {type === "films" ? "film" : "livre"}</h3>
        <form onSubmit={handleSubmit}>
          <label>Titre</label>
          <input type="text" name="title" onChange={handleChange} required />
          <label>Catégorie</label>
          <input type="text" name="category" onChange={handleChange} required />
          <label>Date</label>
          <input type="text" name="date" onChange={handleChange} required />
          <button type="submit">Ajouter</button>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminLibrary;
