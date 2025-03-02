// Ajout d'un écouteur d'événement pour soumettre le formulaire
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut
  
    // Récupérer les valeurs des champs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Simuler la validation (en vrai, tu devrais vérifier côté serveur)
    if (username === "user" && password === "password") {
      alert("Connexion réussie !");
      window.location.href = "/dashboard"; // Redirige vers le dashboard ou page principale
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
  });
  