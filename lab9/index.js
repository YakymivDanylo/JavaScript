document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const signupTab = document.getElementById('signup-tab');
    const loginTab = document.getElementById('login-tab');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    signupTab.addEventListener('click', function() {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    // Password toggle functionality
    document.querySelectorAll('.toggle-password').forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);

            // Toggle eye icon (you might want to add a different icon for visible state)
            this.querySelector('.eye-icon').style.fill = type === 'text' ? 'var(--primary-color)' : 'rgba(0, 0, 0, 0.39)';
        });
    });

    // Country-City dependency
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');

    const citiesByCountry = {
        'Ukraine': ['Kyiv', 'Lviv', 'Kharkiv', 'Odesa', 'Dnipro'],
        'Poland': ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan'],
        'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
        'France': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
        'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami']
    };

    countrySelect.addEventListener('change', function() {
        citySelect.innerHTML = '<option value="">Select City</option>';
        citySelect.disabled = !this.value;

        if (this.value) {
            citiesByCountry[this.value].forEach(function(city) {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });

    // Validation functions
    function validateFirstName() {
        const firstName = document.getElementById('first-name');
        const value = firstName.value.trim();
        const errorElement = firstName.nextElementSibling;

        if (!value) {
            showError(firstName, errorElement, 'First name is required');
            return false;
        }

        if (value.length < 3 || value.length > 15) {
            showError(firstName, errorElement, 'Must be between 3-15 characters');
            return false;
        }

        showSuccess(firstName, errorElement);
        return true;
    }

    function validateLastName() {
        const lastName = document.getElementById('last-name');
        const value = lastName.value.trim();
        const errorElement = lastName.nextElementSibling;

        if (!value) {
            showError(lastName, errorElement, 'Last name is required');
            return false;
        }

        if (value.length < 3 || value.length > 15) {
            showError(lastName, errorElement, 'Must be between 3-15 characters');
            return false;
        }

        showSuccess(lastName, errorElement);
        return true;
    }

    function validateEmail() {
        const email = document.getElementById('email');
        const value = email.value.trim();
        const errorElement = email.nextElementSibling;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!value) {
            showError(email, errorElement, 'Email is required');
            return false;
        }

        if (!emailRegex.test(value)) {
            showError(email, errorElement, 'Please enter a valid email');
            return false;
        }

        showSuccess(email, errorElement);
        return true;
    }

    function validatePassword() {
        const password = document.getElementById('password');
        const value = password.value;
        const errorElement = password.parentElement.nextElementSibling;

        if (!value) {
            showError(password, errorElement, 'Password is required');
            return false;
        }

        if (value.length < 6) {
            showError(password, errorElement, 'Password must be at least 6 characters');
            return false;
        }

        showSuccess(password, errorElement);
        return true;
    }

    function validateConfirmPassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password');
        const value = confirmPassword.value;
        const errorElement = confirmPassword.parentElement.nextElementSibling;

        if (!value) {
            showError(confirmPassword, errorElement, 'Please confirm your password');
            return false;
        }

        if (value !== password) {
            showError(confirmPassword, errorElement, 'Passwords do not match');
            return false;
        }

        showSuccess(confirmPassword, errorElement);
        return true;
    }

    function validatePhone() {
        const phone = document.getElementById('phone');
        const value = phone.value.trim();
        const errorElement = phone.nextElementSibling;
        const phoneRegex = /^\+380\d{9}$/;

        if (!value) {
            showError(phone, errorElement, 'Phone number is required');
            return false;
        }

        if (!phoneRegex.test(value)) {
            showError(phone, errorElement, 'Please enter a valid Ukrainian phone number (+380XXXXXXXXX)');
            return false;
        }

        showSuccess(phone, errorElement);
        return true;
    }

    function validateBirthDate() {
        const birthDate = document.getElementById('birth-date');
        const value = birthDate.value;
        const errorElement = birthDate.nextElementSibling;

        if (!value) {
            showError(birthDate, errorElement, 'Date of birth is required');
            return false;
        }

        const today = new Date();
        const selectedDate = new Date(value);
        let age = today.getFullYear() - selectedDate.getFullYear();
        const monthDiff = today.getMonth() - selectedDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
            age--;
        }

        if (selectedDate > today) {
            showError(birthDate, errorElement, 'Date cannot be in the future');
            return false;
        }

        if (age < 12) {
            showError(birthDate, errorElement, 'You must be at least 12 years old to register');
            return false;
        }

        showSuccess(birthDate, errorElement);
        return true;
    }

    function validateSex() {
        const sex = document.querySelector('input[name="sex"]:checked');
        const errorElement = document.querySelector('.radio-group + .error-message');

        if (!sex) {
            showError(null, errorElement, 'Please select your sex');
            return false;
        }

        showSuccess(null, errorElement);
        return true;
    }

    function validateCountry() {
        const country = document.getElementById('country');
        const errorElement = country.nextElementSibling;

        if (!country.value) {
            showError(country, errorElement, 'Please select a country');
            return false;
        }

        showSuccess(country, errorElement);
        return true;
    }

    function validateCity() {
        const city = document.getElementById('city');
        const errorElement = city.nextElementSibling;

        if (!city.value) {
            showError(city, errorElement, 'Please select a city');
            return false;
        }

        showSuccess(city, errorElement);
        return true;
    }

    function validateUsername() {
        const username = document.getElementById('username');
        const value = username.value.trim();
        const errorElement = username.nextElementSibling;

        if (!value) {
            showError(username, errorElement, 'Username is required');
            return false;
        }

        showSuccess(username, errorElement);
        return true;
    }

    function validateLoginPassword() {
        const password = document.getElementById('login-password');
        const value = password.value;
        const errorElement = password.parentElement.nextElementSibling;

        if (!value) {
            showError(password, errorElement, 'Password is required');
            return false;
        }

        if (value.length < 6) {
            showError(password, errorElement, 'Password must be at least 6 characters');
            return false;
        }

        showSuccess(password, errorElement);
        return true;
    }

    function showError(input, errorElement, message) {
        if (input) {
            input.classList.add('error');
            input.classList.remove('success');
        }
        errorElement.textContent = message;
    }

    function showSuccess(input, errorElement) {
        if (input) {
            input.classList.add('success');
            input.classList.remove('error');
        }
        errorElement.textContent = '';
    }

    // Event listeners for real-time validation
    document.getElementById('first-name').addEventListener('blur', validateFirstName);
    document.getElementById('last-name').addEventListener('blur', validateLastName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('confirm-password').addEventListener('blur', validateConfirmPassword);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('birth-date').addEventListener('change', validateBirthDate);
    document.querySelectorAll('input[name="sex"]').forEach(radio => {
        radio.addEventListener('change', validateSex);
    });
    document.getElementById('country').addEventListener('change', validateCountry);
    document.getElementById('city').addEventListener('change', validateCity);
    document.getElementById('username').addEventListener('blur', validateUsername);
    document.getElementById('login-password').addEventListener('blur', validateLoginPassword);

    // Form submission handlers
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isPhoneValid = validatePhone();
        const isBirthDateValid = validateBirthDate();
        const isSexValid = validateSex();
        const isCountryValid = validateCountry();
        const isCityValid = validateCity();

        if (isFirstNameValid && isLastNameValid && isEmailValid &&
            isPasswordValid && isConfirmPasswordValid && isPhoneValid &&
            isBirthDateValid && isSexValid && isCountryValid && isCityValid) {

            // Create FormData object
            const formData = new FormData(signupForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // In a real app, you would send this to a server
            console.log('Form data:', data);

            // Show success message
            const successMessage = document.getElementById('signup-success');
            successMessage.textContent = 'Registration successful! Welcome, ' + data['first-name'] + '!';
            successMessage.style.display = 'block';

            // Reset form
            signupForm.reset();
            citySelect.disabled = true;
            citySelect.innerHTML = '<option value="">Select City</option>';

            // Clear all success states
            document.querySelectorAll('.success').forEach(el => {
                el.classList.remove('success');
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const isUsernameValid = validateUsername();
        const isPasswordValid = validateLoginPassword();

        if (isUsernameValid && isPasswordValid) {
            // Create FormData object
            const formData = new FormData(loginForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // In a real app, you would send this to a server
            console.log('Login data:', data);

            // Show success message
            const successMessage = document.getElementById('login-success');
            successMessage.textContent = 'Login successful! Welcome back, ' + data['username'] + '!';
            successMessage.style.display = 'block';

            // Reset form if Remember Me is not checked
            if (!document.getElementById('remember-me').checked) {
                loginForm.reset();
            }

            // Clear all success states
            document.querySelectorAll('.success').forEach(el => {
                el.classList.remove('success');
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
});
