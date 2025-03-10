import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircleX, Plus, Film, Book, Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import "./AdminLibrary.css";
import NavAdmin from "../components/NavAdmin/NavAdmin";

function AdminLibrary() {
  const [activeTab, setActiveTab] = useState("films");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);
  const [items, setItems] = useState({ livres: [], films: [] });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/${activeTab}`;
      const response = await axios.get(url);
      setItems((prev) => ({ ...prev, [activeTab]: response.data }));
    } catch (error) {
      console.error(`Erreur lors du chargement des ${activeTab}:`, error);
    }
  };

  const handleSubmit = async (itemData) => {
    try {
      const isEditing = Boolean(editingItem);
      const url = isEditing
        ? `${import.meta.env.VITE_API_BASE_URL}/${formType}/${itemData.id}`
        : `${import.meta.env.VITE_API_BASE_URL}/${formType}/create`;

      if (isEditing) {
        await axios.put(url, itemData);
      } else {
        const response = await axios.post(url, itemData);
        itemData.id = response.data.id;
      }

      setItems((prev) => ({
        ...prev,
        [formType]: isEditing
          ? prev[formType].map((item) => (item.id === itemData.id ? itemData : item))
          : [...prev[formType], itemData],
      }));

      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error(`Erreur lors de la ${editingItem ? "modification" : "création"} d'un ${formType}:`, error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/${activeTab}/${id}`;
      await axios.delete(url);
      setItems((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error(`Erreur lors de la suppression d'un ${activeTab}:`, error);
    }
  };

  return (
    <>
      <NavAdmin />
      <div className="admin-library">
        <h2>La bibliothèque</h2>
        <div className="tabs">
          <button className={activeTab === "films" ? "active" : ""} onClick={() => setActiveTab("films")}>
            <Film /> Films
          </button>
          <button className={activeTab === "livres" ? "active" : ""} onClick={() => setActiveTab("livres")}>
            <Book /> Livres
          </button>
        </div>

        <div className="actions">
          <button onClick={() => { setShowForm(true); setFormType(activeTab); setEditingItem(null); }}>
            <Plus /> Ajouter un {activeTab === "films" ? "film" : "livre"}
          </button>
        </div>

        <div className="list-container">
          {items[activeTab]?.map((item) => (
            <div key={item.id} className="item-card">
              <h3 style={{color: 'black'}}>{item.titre}</h3>
              {activeTab === "films" ? (
                <>
                  <p style={{color: 'black'}}>Sortie: {new Date(item.dateSortie).toLocaleDateString("fr-FR")}</p>
                </>
              ) : (
                <>
                  <p style={{color: 'black'}}>Auteur: {item.auteur}</p>
                  <p style={{color: 'black'}}>Publication: {new Date(item.datePublication).toLocaleDateString("fr-FR")}</p>
                </>
              )}

              <div className="actions">
                <button onClick={() => { setShowForm(true); setFormType(activeTab); setEditingItem(item); }}>
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <ItemForm
            type={formType}
            onClose={() => setShowForm(false)}
            onSubmit={handleSubmit}
            editingItem={editingItem}
          />
        )}
      </div>
    </>
  );
}

function ItemForm({ type, onClose, onSubmit, editingItem }) {
  const [formData, setFormData] = useState(
    editingItem || {
      titre: "",
      description: "",
      type: "",
      dateSortie: type === "films" ? "" : undefined,
      datePublication: type === "livres" ? "" : undefined,
      cover: "",
      trailer: type === "films" ? "" : undefined,
      auteur: type === "livres" ? "" : undefined,
      bandeAnnonce: type === "livres" ? "" : undefined,
    }
  );

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

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
        <h3>{editingItem ? "Modifier" : "Ajouter"} un {type === "films" ? "film" : "livre"}</h3>
        
        <form onSubmit={handleSubmit}>
          <label>Titre</label>
          <input type="text" name="titre" value={formData.titre} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Type</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} required />

          {type === "films" && <>
            <label>Date de sortie</label>
            <input type="date" name="dateSortie" value={formData.dateSortie} onChange={handleChange} required />

            <label>Trailer</label>
            <input type="url" name="trailer" value={formData.trailer} onChange={handleChange} />
          </>}

          {type === "livres" && <>
            <label>Auteur</label>
            <input type="text" name="auteur" value={formData.auteur} onChange={handleChange} required />

            <label>Image</label>
            <input type="text" name="image" value={formData.cover} onChange={handleChange} required />

            <label>Date de publication</label>
            <input type="date" name="datePublication" value={formData.datePublication} onChange={handleChange} required />
          </>}

          <button type="submit">{editingItem ? "Modifier" : "Ajouter"}</button>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminLibrary;
