const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.liens');
const overlay = document.querySelector('.overlay');
const menuLinks = document.querySelectorAll('.liens a');
const scrollTopBtn = document.getElementById('scrollTop');

function toggleMenu() {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    menuToggle.classList.toggle('active');
}

menuToggle.addEventListener('click', toggleMenu);

overlay.addEventListener('click', toggleMenu);

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('active')) {
        toggleMenu();
    }
});

function toggleScrollTopButton() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
}

window.addEventListener('scroll', toggleScrollTopButton);

scrollTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function addInitialAnimations() {
    const logo = document.querySelector('.logo');
    const navbar = document.querySelector('.navbar');
    
    if (logo) logo.classList.add('fade-in');
    if (navbar) setTimeout(() => navbar.classList.add('fade-in'), 200);
    
    const navItems = document.querySelectorAll('.liens li');
    navItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false,
        offset: 50,
        delay: 0,
        anchorPlacement: 'top-bottom'
    });
    
    addInitialAnimations();
    toggleScrollTopButton();
});

window.addEventListener('resize', function() {
    AOS.refresh();
});

window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    const bannerSection = document.querySelector('.baniere');
    if (bannerSection) {
        const offset = scrollPosition * 0.4;
        bannerSection.style.backgroundPositionY = `${offset}px`;
    }
    
    const header = document.querySelector('.header');
    if (header && scrollPosition > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'var(--shadow-md)';
    } else if (header) {
        header.style.backgroundColor = 'var(--white)';
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    const sujetSelect = document.getElementById('sujet');
    const messageTextarea = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
        successMessage.style.display = 'none';
    }

    const nomError = document.getElementById('nomError');
    const emailError = document.getElementById('emailError');
    const telephoneError = document.getElementById('telephoneError');
    const sujetError = document.getElementById('sujetError');
    const messageError = document.getElementById('messageError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telephoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    function validateNom() {
        if (nomInput.value.trim() === '') {
            showError(nomInput, nomError, 'Le nom est requis');
            return false;
        } else if (nomInput.value.trim().length < 2) {
            showError(nomInput, nomError, 'Le nom doit contenir au moins 2 caractères');
            return false;
        } else {
            showSuccess(nomInput, nomError);
            return true;
        }
    }


    function validateEmail() {
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'L\'email est requis');
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Veuillez entrer un email valide');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }


    function validateTelephone() {
        if (telephoneInput.value.trim() === '') {
            showError(telephoneInput, telephoneError, 'Le téléphone est requis');
            return false;
        } else if (!telephoneRegex.test(telephoneInput.value.trim())) {
            showError(telephoneInput, telephoneError, 'Veuillez entrer un numéro de téléphone valide');
            return false;
        } else {
            showSuccess(telephoneInput, telephoneError);
            return true;
        }
    }


    function validateSujet() {
        if (sujetSelect.value === '') {
            showError(sujetSelect, sujetError, 'Veuillez sélectionner un sujet');
            return false;
        } else {
            showSuccess(sujetSelect, sujetError);
            return true;
        }
    }


    function validateMessage() {
        if (messageTextarea.value.trim() === '') {
            showError(messageTextarea, messageError, 'Le message est requis');
            return false;
        } else if (messageTextarea.value.trim().length < 10) {
            showError(messageTextarea, messageError, 'Le message doit contenir au moins 10 caractères');
            return false;
        } else {
            showSuccess(messageTextarea, messageError);
            return true;
        }
    }


    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }


    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }


    nomInput.addEventListener('input', validateNom);
    emailInput.addEventListener('input', validateEmail);
    telephoneInput.addEventListener('input', validateTelephone);
    sujetSelect.addEventListener('change', validateSujet);
    messageTextarea.addEventListener('input', validateMessage);


    function validateAll() {
        let isValid = true;
        
        // Vérifier chaque champ et mettre à jour isValid si l'un d'eux échoue
        if (!validateNom()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateTelephone()) isValid = false;
        if (!validateSujet()) isValid = false;
        if (!validateMessage()) isValid = false;
        
        return isValid;
    }

    function sendEmail() {
        successMessage.style.display = 'none';
        
        submitBtn.disabled = true;
        spinner.style.display = 'block';
        
        const templateParams = {
            nom: nomInput.value,
            email: emailInput.value,
            telephone: telephoneInput.value,
            sujet: sujetSelect.value,
            message: messageTextarea.value
        };
        
        emailjs.send('immo cool', 'template_4ar91kh', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                spinner.style.display = 'none';
                successMessage.style.display = 'flex';
                
                setTimeout(() => {
                    contactForm.reset();
                    successMessage.style.display = 'none';
                    submitBtn.disabled = false;
                }, 3000);
            }, function(error) {
                console.log('FAILED...', error);
                
                spinner.style.display = 'none';
                
                alert('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.');
                
                submitBtn.disabled = false;
            });
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateAll()) {
            sendEmail();
        }
    });
});

