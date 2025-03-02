import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CallbackLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code"); // Récupérer le code d'authentification

    if (code) {
      // Envoyer le code au backend pour obtenir le token
      fetch("http://localhost:5000/callback?code=" + code, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Si l'authentification est réussie, obtenir les informations utilisateur
            navigate("/dashboard"); // Rediriger vers une page protégée (par exemple : dashboard)
          } else {
            console.error("Erreur d'authentification");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du token", error);
        });
    }
  }, [location.search, navigate]);

  return <div>Chargement...</div>;
};

export default CallbackLogin;
