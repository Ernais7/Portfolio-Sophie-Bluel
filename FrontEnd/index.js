// Variables
const section = document.getElementById("portfolio");
const divFilter = document.createElement("div");
divFilter.classList.add("filter");
const h2 = section.querySelector("h2");
const logOut = document.querySelector(".log");
const classEdit = document.querySelector(".edit");
const bouttonModal = document.querySelector(".edit");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".fa-xmark");
modal.style.display = "none";
const bouttonAjouter = document.querySelector(".addProject");
const firstModal = document.querySelector(".modal__content--view1");
const secondModal = document.querySelector(".modal__content--view2");
const titreModal = document.getElementById("modalTitle");
const flecheReturn = document.querySelector(".return");
const iconsModal = document.querySelector(".icon__contain");
const barDiv = document.createElement("div");
const fileInput = document.querySelector(".ImgUploadBtn");
const preview = document.querySelector(".imageMiniature");
const uploadingDiv = document.querySelector(".uploading");
const imageUrlupload = document.getElementById("imageUrl");
const projectGallery = document.querySelector(".gallery");
let category = [];

// Pointeur sur le bouton 'modifier'
bouttonModal.style.cursor = "pointer";

function project() {
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
      imageModal(data);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}

function displayImages(data) {
  
  projectGallery.innerHTML = ""; // Vider le conteneur

  data.forEach((item) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    img.src = item.imageUrl;
    img.alt = item.title || "Image";
    figCaption.textContent = item.title;

    figure.appendChild(img);
    figure.appendChild(figCaption);
    figure.classList.add("project");
    figure.classList.add(`category-${item.category.id}`); // Ajouter la catégorie en tant que classe

    projectGallery.appendChild(figure);
  });

  filterProject("all");
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
      // displayFilter(data);
      // category = data;
      return data;
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}
// Creation de la div 'filter'
console.log(filter());
async function displayFilter() {
  const data = await filter();
  section.insertBefore(divFilter, h2.nextSibling);

  const buttonAll = document.createElement("button");
  buttonAll.innerText = "Tous";
  buttonAll.classList.add("filter__button");
  buttonAll.addEventListener("click", () => filterProject("all"));
  divFilter.appendChild(buttonAll);

  data.forEach((item) => {
    const buttonFilter = document.createElement("button");
    buttonFilter.textContent = item.name;
    buttonFilter.classList.add("filter__button");
    buttonFilter.addEventListener("click", () => filterProject(`category-${item.id}`));
    divFilter.appendChild(buttonFilter);
  });
}

function filterProject(category) {
  const allProject = document.querySelectorAll(".project");
  allProject.forEach((project) => {
    if (category === "all" || project.classList.contains(category)) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}

project();
filter();

// Condition si le token est présent
if (localStorage.getItem("token")) {
  logOut.textContent = "logout";
  divFilter.style.display = "none";
} else {
  classEdit.style.display = "none";
  barDiv.style.display = "none";
  modal.style.display = "none";
}
// Suppression du token pour se déconnecter
logOut.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// Element bar 'mode édition'
barDiv.className = "edit__bar";
const contentBar = document.createElement("div");
contentBar.className = "edit__content";
document.body.prepend(barDiv);
barDiv.appendChild(contentBar);
const iconEdit = document.createElement("i");
iconEdit.classList.add("fa-regular", "fa-pen-to-square");
contentBar.appendChild(iconEdit);
const pEdit = document.createElement("p");
pEdit.textContent = " Mode édition";
contentBar.appendChild(pEdit);

// Modale

function imageModal(data) {
  const contentModal = document.querySelector(".modal__content--project");
  contentModal.innerHTML = ""; // Vider le conteneur

  data.forEach((item) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");
    const iconDiv = document.createElement("div");
    const iconDelete = document.createElement("i");

    img.src = item.imageUrl;
    img.alt = item.title || "Image";

    figure.appendChild(img);
    figure.appendChild(figCaption);
    figure.appendChild(iconDiv);
    iconDelete.className = "fa-solid fa-trash-can";
    iconDiv.appendChild(iconDelete);

    iconDiv.classList.add("delete");
    figure.classList.add("projectModal");
    figure.dataset.id = item.id;

    contentModal.appendChild(figure);
    iconDelete.addEventListener("click", deleteProject);
  });
}

bouttonModal.addEventListener("click", afficherModal);
bouttonAjouter.addEventListener("click", deuxiemeModal);
flecheReturn.addEventListener("click", flecheModal);
closeModal.addEventListener("click", fermerModal);

function afficherModal() {
  modal.style.display = "flex";
  firstModal.style.display = "flex";
  secondModal.style.display = "none";
  titreModal.textContent = "Galerie photo";
  bouttonAjouter.value = "Ajouter une photo";
  bouttonAjouter.classList.remove("notValid");
  flecheReturn.style.display = "none";
  iconsModal.style.display = "block";
}

function fermerModal() {
  modal.style.display = "none";
}
function deuxiemeModal() {
  firstModal.style.display = "none";
  secondModal.style.display = "flex";
  bouttonAjouter.value = "Valider";
  titreModal.textContent = "Ajout photo";
  flecheReturn.style.display = "flex";
  iconsModal.style.display = "flex";
  bouttonAjouter.classList.add("notValid");
}

function flecheModal() {
  secondModal.style.display = "none";
  firstModal.style.display = "flex";
  flecheReturn.style.display = "none";
  iconsModal.style.display = "block";
  titreModal.textContent = "Galerie photo";
  bouttonAjouter.value = "Ajouter une photo";
  bouttonAjouter.classList.remove("notValid");
}

// Suppression de projet

function deleteProject(event) {
  event.preventDefault();
  console.log("Icone de suppression cliquée");
  const projectModal = event.target.closest(".projectModal");
  console.log(event.target);
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token non trouvé");
    return;
  }
  if (projectModal) {
    const projectId = projectModal.dataset.id;
    console.log(`ID du projet à supprimer: ${projectId}`);

    fetch(`http://localhost:5678/api/works/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Projet supprimé avec succès");
          projectModal.remove();
          project();
        } else {
          console.error("Erreur lors de la suppression du projet");
        }
      })
      .catch((error) => console.error("Erreur lors de la suppression du projet :", error));
  } else {
    console.error("Element projet non trouvé");
  }
}

// Afficher miniature

function miniature() {
  const previewPhoto = () => {
    const file = imageUrlupload.files;
    if (file) {
      const fileReader = new FileReader();
      const preview = document.getElementById("file-preview");
      fileReader.onload = function (event) {
        preview.setAttribute("src", event.target.result);
      };
      fileReader.readAsDataURL(file[0]);
    }
  };
  imageUrlupload.addEventListener("change", previewPhoto);

  imageUrlupload.addEventListener("click", function () {
    const imageMiniature = document.querySelector(".imageMiniature");
    const uploadingDiv = document.querySelector(".uploading");
    uploadingDiv.style.display = "none";
    imageMiniature.style.display = "flex";
  });
}
miniature();

// Ajout projet

function ajoutProjet() {
  const form = document.querySelector('.modal__content--view2');
  const formBtn = document.querySelector('.addProject');

  formBtn.addEventListener('click', async function(event) {
      event.preventDefault();

      const token = localStorage.getItem('token');
      const photo = document.getElementById('imageUrl').files[0];
      const title = document.querySelector('input[name="title"]').value;
      const category = document.querySelector('select[name="category.name"]').value;
      
      try {
          const formData = new FormData(secondModal);
          console.log(secondModal);
          console.log(formData.get('title'));
          console.log(formData.get('image'));


          const response = await fetch('http://localhost:5678/api/works', {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              body: formData,
          });

          if (response.ok) {
              form.reset();
              firstModal.style.display = 'flex';
              project();
              return;
          }

      } catch (error) {
          console.error('Erreur lors de la requête : ', error);
      }
  });
}
ajoutProjet();


console.log(category);
function populateCategoriesSelect(categories) {
  const selectElement = document.getElementById('modalCategoryImage');

  categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id; // Valeur de l'option (id de la catégorie)
      option.textContent = category.name; // Texte affiché dans l'option
      selectElement.appendChild(option); // Ajouter l'option au select
  });
}
populateCategoriesSelect(category);
