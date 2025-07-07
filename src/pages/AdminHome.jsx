import React, { useState } from "react";
import NavAdmin from "../components/NavAdmin/NavAdmin";
import ListAdminArticle from "../components/ListAdminArticle/ListAdminArticle";
import ArticleForm from "../components/ArticleForm/ArticleForm";
import { useAuth } from "../context/AuthContext";

import "./AdminHome.css";

function AdminHome() {
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <NavAdmin />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="admin-container">
          <h1>Bonjour {user.prenom}</h1>

          <div className="headHomeAdmin">
            <h2>Ton journal</h2>
            <div className="admin-actions">
              <button onClick={() => setIsFormOpen(!isFormOpen)}>
                {isFormOpen ? "Fermer le formulaire" : "Créer un article"}
              </button>
            </div>
          </div>

          {isFormOpen && <ArticleForm onClose={() => setIsFormOpen(false)} />}
          <ListAdminArticle />
        </div>
      </div>
    </>
  );
}

export default AdminHome;
