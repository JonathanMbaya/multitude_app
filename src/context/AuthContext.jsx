import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Charger l'utilisateur si un token existe
  useEffect(() => {
    if (token) {
      axios
        .get(import.meta.env.VITE_API_BASE_URL + "/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  // Fonction de connexion
  const login = async (formData) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/auth/login",
        formData,
      );

      const newToken = res.data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);

      // Récupérer les infos de l'utilisateur
      const userRes = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/auth/me",
        {
          headers: { Authorization: `Bearer ${newToken}` },
        },
      );

      setUser(userRes.data);
    } catch (error) {
      console.error(
        "Erreur de connexion:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
