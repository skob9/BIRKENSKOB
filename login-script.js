document.addEventListener('DOMContentLoaded', function() {
    let signupBtn = document.getElementById("signupBtn");
    let signinBtn = document.getElementById("signinBtn");
    let nameField = document.getElementById("nameField");
    let title = document.getElementById("title");
    let message = document.getElementById("message");

    signinBtn.onclick = function() {
        nameField.style.maxHeight = "0";
        title.innerHTML = "Login";
        title.style.color = "#023f85"; // Change color smoothly
        signupBtn.classList.add("disable");
        signinBtn.classList.remove("disable");
        message.innerHTML = "";
    };

    signupBtn.onclick = function() {
        nameField.style.maxHeight = "60px";
        title.innerHTML = "Register";
        title.style.color = "#023f85"; // Change color smoothly
        signupBtn.classList.remove("disable");
        signinBtn.classList.add("disable");
        message.innerHTML = "";
    };

    signupBtn.addEventListener("click", function() {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Check for valid email format
        if (!isValidEmail(email) || !password) {
            message.innerHTML = "<br>Please enter a valid email and password";
            message.style.color = "red";
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');

        let userExists = users.some(user => user.email === email);

        if (userExists) {
            message.innerHTML = "<br>The user already exists.";
            message.style.color = "red";
        } else {
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            message.innerHTML = "<br>Registration Successful!";
            message.style.color = "green";
            window.location.href = "page.html"; // Redirect to a welcome page
        }
    });

    signinBtn.addEventListener("click", function() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (!isValidEmail(email) || !password) {
            message.innerHTML = "";
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');

        let user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful!");
            window.location.href = "page.html"; // Redirect to logged-in page
        } else {
            message.innerHTML = "<br>Invalid email or password";
            message.style.color = "red";
        }
    });

    // Function to validate email format
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
});