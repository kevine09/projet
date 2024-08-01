document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const signInButton = document.querySelector(".toggle-left .btn.hidden");
    const signUpButton = document.querySelector(".toggle-right .btn");

    signInButton.addEventListener("click", () => {
        container.classList.remove("active");
    });

    signUpButton.addEventListener("click", () => {
        container.classList.add("active");
    });

    const signInForm = document.querySelector(".sign-in-form");
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = signInForm.querySelector("input[type='email']").value;
        const password = signInForm.querySelector("input[type='password']").value;

        if (validateEmail(email) && validatePassword(password)) {
            sendFormData('login', { email, password })
                .then(response => displayMessage(response.message, "success"))
                .catch(error => displayMessage(error.message, "error"));
        } else {
            displayMessage("Email ou mot de passe invalide", "error");
        }
    });

    const signUpForm = document.querySelector(".sign-up-form");
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = signUpForm.querySelector("input[type='text']").value;
        const email = signUpForm.querySelector("input[type='email']").value;
        const password = signUpForm.querySelector("input[type='password']").value;

        if (name && validateEmail(email) && validatePassword(password)) {
            sendFormData('register', { name, email, password })
                .then(response => displayMessage(response.message, "success"))
                .catch(error => displayMessage(error.message, "error"));
        } else {
            displayMessage("Veuillez remplir tous les champs correctement", "error");
        }
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function displayMessage(message, type) {
        const messageBox = document.createElement("div");
        messageBox.classList.add("message-box", type);
        messageBox.textContent = message;

        document.body.appendChild(messageBox);

        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 3000);
    }

    async function sendFormData(action, data) {
        try {
            const response = await fetch('https,//example.com/api/${action}',
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Une erreur s\'est produite lors de la communication avec le serveur.');
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Une erreur inconnue s\'est produite.');
        }
    }
});
