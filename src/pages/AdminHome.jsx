import React, { useState } from "react";
import NavAdmin from "../components/NavAdmin/NavAdmin";
import ListAdminArticle from "../components/ListAdminArticle/ListAdminArticle";
import ArticleForm from "../components/ArticleForm/ArticleForm";
import "./AdminHome.css";

function AdminHome() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
        <NavAdmin />

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className="admin-container">
                <div className="headHomeAdmin">
                    <h1>Ton journal | 47 Articles</h1>
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

