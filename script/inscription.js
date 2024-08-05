document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const phoneInput = document.getElementById("phone");

    form.addEventListener("submit", function(event) {
        let valid = true;
        let messages = [];

        // Validation du nom
        if (nameInput.value.trim() === "") {
            valid = false;
            messages.push("Le nom est requis.");
        }

        // Validation de l'email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            valid = false;
            messages.push("L'email n'est pas valide.");
        }

        // Validation du mot de passe
        if (passwordInput.value.length < 6) {
            valid = false;
            messages.push("Le mot de passe doit comporter au moins 6 caractères.");
        }

        // Validation du téléphone (optionnel)
        if (phoneInput.value.trim() !== "") {
            const phonePattern = /^\+?\d{7,15}$/;
            if (!phonePattern.test(phoneInput.value.trim())) {
                valid = false;
                messages.push("Le numéro de téléphone n'est pas valide.");
            }
        }

        if (!valid) {
            event.preventDefault();
            alert(messages.join("\n"));
        }
    });
});
