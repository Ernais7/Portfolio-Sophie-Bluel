function login() {
  // Définir l'URL de l'API
  const apiUrl = "http://localhost:5678/api/works";

  // Effectuer une requête Fetch pour récupérer les données
  fetch(apiUrl)
    .then((response) => {
      // Vérifier si la réponse est OK (200)
      if (!response.ok) {
        throw new Error("Erreur de réseau - " + response.status);
      }
      // Renvoyer la réponse sous forme de JSON
      return response.json();
    })
    .then((data) => {
      // Utiliser les données récupérées
      console.log(data);
      // Appeler la fonction pour afficher les images
      displayImages(data);
    })
    .catch((error) => {
      // Gérer les erreurs
      console.error("Erreur lors de la récupération des données :", error);
    });
}

login();

function displayImages(data) {
  // Sélectionner le conteneur où les images seront ajoutées
  const projectGallery = document.querySelector(".gallery");

  // Parcourir les données pour chaque image
  data.forEach(item => {
    const figure = document.createElement("figure");
    // Créer un élément img
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");
    // Définir l'attribut src avec l'URL de l'image
    img.src = item.imageUrl; // Assurez-vous que le champ correct est utilisé ici
    // Ajouter des attributs alt ou d'autres attributs si nécessaire
    img.alt = item.title || "Image"; // Utilisez un champ approprié pour le texte alternatif
    figCaption.textContent = item.title;
    // Ajouter l'élément img à l'élément figure
    figure.appendChild(img);
    figure.appendChild(figCaption);

    // Ajouter l'élément figure au conteneur
    projectGallery.appendChild(figure);
  });
}
