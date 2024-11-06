document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const successMessage = document.getElementById("successMessage");

    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    successMessage.textContent = "";

    let isValid = true;

    if (username === "" || username.length < 3) {
        usernameError.textContent = "Username must be at least 3 characters long.";
        isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid Gmail address (e.g., user@gmail.com).";
        isValid = false;
    }

    if (password === "" || password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long.";
        isValid = false;
    }

    if (confirmPassword !== password) {
        confirmPasswordError.textContent = "Passwords do not match.";
        isValid = false;
    }

    if (isValid) {
        const formData = {
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem("formData", JSON.stringify(formData));
        successMessage.textContent = "Registration successful!";
        document.getElementById("registrationForm").reset();
    }
});
