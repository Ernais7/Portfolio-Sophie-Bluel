function login() {
  const apiUrl = "http://localhost:5678/api/works";

  fetch(apiUrl)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Erreur de réseau - " + response.status);
          }
          return response.json();
      })
      .then((data) => {
          console.log(data);
          displayImages(data);
      })
      .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
      });
}

function displayImages(data) {
  const projectGallery = document.querySelector(".gallery");
  projectGallery.innerHTML = ''; // Vider le conteneur

  data.forEach(item => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figCaption = document.createElement("figcaption");

      img.src = item.imageUrl;
      img.alt = item.title || "Image";
      figCaption.textContent = item.title;

      figure.appendChild(img);
      figure.appendChild(figCaption);
      figure.classList.add('photo');
      figure.classList.add(`category-${item.category.id}`); // Ajouter la catégorie en tant que classe

      projectGallery.appendChild(figure);
  });

  filterPhotos('all'); // Afficher toutes les photos par défaut
}

function filter() {
  const apiUrl = "http://localhost:5678/api/categories";

  fetch(apiUrl)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Erreur de réseau - " + response.status);
          }
          return response.json();
      })
      .then((data) => {
          console.log(data);
          displayFilter(data);
      })
      .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
      });
}

function displayFilter(data) {
  const section = document.getElementById('portfolio');
  const divFilter = document.createElement('div');
  divFilter.classList.add("filter");

  const h2 = section.querySelector('h2');
  section.insertBefore(divFilter, h2.nextSibling);

  const buttonAll = document.createElement("button");
  buttonAll.innerText = "Tous";
  buttonAll.classList.add("filter__button");
  buttonAll.addEventListener('click', () => filterPhotos('all'));
  divFilter.appendChild(buttonAll);

  data.forEach(item => {
      const buttonFilter = document.createElement("button");
      buttonFilter.textContent = item.name;
      buttonFilter.classList.add("filter__button");
      buttonFilter.addEventListener('click', () => filterPhotos(`category-${item.id}`));
      divFilter.appendChild(buttonFilter);
  });
}

function filterPhotos(category) {
  const allPhotos = document.querySelectorAll('.photo');
  allPhotos.forEach(photo => {
      if (category === 'all' || photo.classList.contains(category)) {
          photo.style.display = 'block';
      } else {
          photo.style.display = 'none';
      }
  });
}

login();
filter();