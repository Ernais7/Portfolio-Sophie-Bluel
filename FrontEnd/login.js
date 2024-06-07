document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginStatus = document.getElementById('loginStatus');
        login(email, password, loginStatus);
        // if (email === validEmail && password === validPassword) {
        //     window.location.href = 'index.html';
        // } else {
        //     loginStatus.textContent = 'E-mail ou mot de passe incorrect';
        //     loginStatus.style.color = 'red';
        // }
    });
});


function login(email, password, loginStatus) {
    const apiUrl = "http://localhost:5678/api/users/login";

    const request = {
        email: email,
        password: password
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur de réseau - " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Token récupéré :", data.token);

        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération du token :", error);
        loginStatus.textContent = 'E-mail ou mot de passe incorrect';
        loginStatus.style.color = 'red';
    });
}


