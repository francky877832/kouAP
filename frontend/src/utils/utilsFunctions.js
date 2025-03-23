export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    //return `${day}/${month}/${year} - ${hours}H${minutes}`;
    return new Date(dateString).toLocaleString()
};


export const capitalize = (text) => {
    // Met la première lettre en majuscule et le reste en minuscules
    return text.charAt(0).toUpperCase() + text.slice(1);
};


export const round = (number) => {
    const decimalPart = number % 1;
  
    if (decimalPart < 0.5) {
      return Math.floor(number); 
    } else {
      return Math.ceil(number);
    }
  };

  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //setAuthState({ token: null, user: null });
};

export const redirectNonAuthenticatedUser = (data) => {
  if (["TokenMissing", "TokenExpiredError", "TokenAnotherError", "TokenProcessingError" ].includes(data?.type)) {
    //alert(data);
    console.log("An error occured while processing the token.");
    //localStorage.removeItem("token"); // Supprime le token
    window.location.href = "/login"; // Redirige vers la page de connexion
    return;
  }
}
