// Variables
const section = document.getElementById('portfolio');
const divFilter = document.createElement('div');
divFilter.classList.add("filter");
const h2 = section.querySelector('h2');
const logOut = document.querySelector('.log');
const classEdit = document.querySelector('.edit');
const bouttonModal = document.querySelector('.edit');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.fa-xmark');
modal.style.display = 'none';
const bouttonAjouter = document.querySelector('.addProject');
const firstModal = document.querySelector('.modal__content--view1');
const secondModal = document.querySelector('.modal__content--view2');
const titreModal = document.getElementById('modalTitle');
const flecheReturn = document.querySelector('.return');
const iconsModal = document.querySelector('.icon__contain');

// Pointeur sur le bouton 'modifier'
bouttonModal.style.cursor = 'pointer';


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
          displayImage(data);
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
      figure.classList.add('project');
      figure.classList.add(`category-${item.category.id}`); // Ajouter la catégorie en tant que classe

      projectGallery.appendChild(figure);
  });

  filterProject('all');
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
// Creation de la div 'filter'

function displayFilter(data) {

    section.insertBefore(divFilter, h2.nextSibling);

  const buttonAll = document.createElement("button");
  buttonAll.innerText = "Tous";
  buttonAll.classList.add("filter__button");
  buttonAll.addEventListener('click', () => filterProject('all'));
  divFilter.appendChild(buttonAll);

  data.forEach(item => {
      const buttonFilter = document.createElement("button");
      buttonFilter.textContent = item.name;
      buttonFilter.classList.add("filter__button");
      buttonFilter.addEventListener('click', () => filterProject(`category-${item.id}`));
      divFilter.appendChild(buttonFilter);
  });
}

function filterProject(category) {
  const allProject = document.querySelectorAll('.project');
  allProject.forEach(project => {
      if (category === 'all' || project.classList.contains(category)) {
          project.style.display = 'block';
      } else {
          project.style.display = 'none';
      }
  });
}

project();
filter();

// Condition si le token est présent
if (localStorage.getItem("token")){
    logOut.textContent = 'logout';
    divFilter.style.display = 'none';
} else { 
    classEdit.style.display = 'none';
    barDiv.style.display = 'none';
    modal.style.display = 'none';
}
// Suppression du token pour se déconnecter
logOut.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'login.html';
})

// Element bar 'mode édition'
const barDiv = document.createElement('div');
barDiv.className = 'edit__bar';
const contentBar = document.createElement('div');
contentBar.className = 'edit__content';
document.body.prepend(barDiv);
barDiv.appendChild(contentBar);
const iconEdit = document.createElement('i');
iconEdit.classList.add('fa-regular', 'fa-pen-to-square');
contentBar.appendChild(iconEdit);
const pEdit = document.createElement('p');
pEdit.textContent = ' Mode édition';
contentBar.appendChild(pEdit);

// Modale

function displayImage(data) {
    const contentModal = document.querySelector(".modal__content--project");
    contentModal.innerHTML = ''; // Vider le conteneur
  
    data.forEach(item => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figCaption = document.createElement("figcaption");
        const iconDiv = document.createElement("div");
        const iconDelete = document.createElement('i');

  
        img.src = item.imageUrl;
        img.alt = item.title || "Image";

        figure.appendChild(img);
        figure.appendChild(figCaption);
        figure.appendChild(iconDiv);
        iconDelete.className = 'fa-solid fa-trash-can';
        iconDiv.appendChild(iconDelete);
        iconDiv.classList.add('delete');
        figure.classList.add('projectModal');
    
  
        contentModal.appendChild(figure);
    });
  }

function maModal(){
    bouttonModal.onclick = function() {
        modal.style.display = "flex";
        firstModal.style.display = 'flex';
        secondModal.style.display = 'none';
        titreModal.textContent = 'Galerie photo';
        bouttonAjouter.value = 'Ajouter une photo';
        bouttonAjouter.classList.remove('notValid');
        flecheReturn.style.display = 'none';
        iconsModal.style.display = 'block';
    }
    closeModal.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    bouttonAjouter.onclick = function () {
        firstModal.style.display = 'none';
        secondModal.style.display = 'flex';
        bouttonAjouter.value = 'Valider';
        titreModal.textContent = 'Ajout photo';
        flecheReturn.style.display = 'flex';
        iconsModal.style.display = 'flex';
        bouttonAjouter.classList.add('notValid');
    }
    flecheReturn.onclick = function () {
        secondModal.style.display = 'none';
        firstModal.style.display = 'flex';
        flecheReturn.style.display = 'none';
        iconsModal.style.display = 'block';
        titreModal.textContent = 'Galerie photo';
        bouttonAjouter.value = 'Ajouter une photo';
        bouttonAjouter.classList.remove('notValid');
    }
}
maModal();






