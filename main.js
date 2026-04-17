/**
 * @type {HTMLInputElement}
 * @description Champ input pour l'adresse email de l'utilisateur
 */
const emailInput = document.getElementById("email");

/**
 * @type {HTMLInputElement}
 * @description Champ input pour le nom complet de l'utilisateur
 */
const nameInput = document.getElementById("name");

/**
 * @type {HTMLInputElement}
 * @description Champ input pour le sujet du message
 */
const subjectInput = document.getElementById("subject");

/**
 * @type {HTMLTextAreaElement}
 * @description Champ textarea pour le contenu du message
 */
const messageTextArea = document.getElementById("message");

/**
 * @type {HTMLFormElement}
 * @description Formulaire de contact principal
 */
const form = document.getElementById("form");

/**
 * @description Ajoute une validation visuelle en temps réel sur les champs du formulaire
 * Ajoute une bordure rouge si le champ est vide, grise sinon
 */

[nameInput, emailInput, subjectInput, messageTextArea].forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.classList.add("border-red-500");
      input.classList.remove("border-gray-300");
    } else {
      input.classList.remove("border-red-500");
      input.classList.add("border-gray-300");
    }
  });

  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.classList.remove("border-red-500");
      input.classList.add("border-gray-300");
    }
  });
});

/**
 * @type {boolean}
 * @description Indique si le formulaire a été modifié et non sauvegardé
 */
let formChanged = false;

/**
 * @description Détecte les modifications du formulaire pour prévenir la perte de données
 */
[nameInput, emailInput, subjectInput, messageTextArea].forEach((input) => {
  input.addEventListener("input", () => {
    formChanged = true;
  });
});

/**
 * @description Affiche une confirmation avant de quitter la page si le formulaire a été modifié
 * @param {BeforeUnloadEvent} e - Événement de déchargement de page
 */
window.addEventListener("beforeunload", (e) => {
  if (formChanged) {
    e.preventDefault();
    e.returnValue = "";
  }
});

/**
 * @namespace SwalUtils
 * @description Utilitaires pour les interactions SweetAlert récurrentes
 */
const SwalUtils = {
  /**
   * @function
   * @name showInfo
   * @memberof SwalUtils
   * @description Affiche un message d'information
   * @param {string} title - Titre du message
   * @param {string} text - Contenu du message
   * @returns {Promise} Promise SweetAlert
   */
  showInfo: (title, text) => {
    return Swal.fire({
      icon: "info",
      title: title,
      text: text,
      confirmButtonColor: "#3b82f6",
      timer: 4000,
      timerProgressBar: true,
    });
  },

  /**
   * @function
   * @name showWarning
   * @memberof SwalUtils
   * @description Affiche un message d'avertissement
   * @param {string} title - Titre du message
   * @param {string} text - Contenu du message
   * @returns {Promise} Promise SweetAlert
   */
  showWarning: (title, text) => {
    return Swal.fire({
      icon: "warning",
      title: title,
      text: text,
      confirmButtonColor: "#f59e0b",
      confirmButtonText: "Compris",
    });
  },

  /**
   * @function
   * @name confirm
   * @memberof SwalUtils
   * @description Affiche une boîte de dialogue de confirmation
   * @param {string} title - Titre du message
   * @param {string} text - Contenu du message
   * @param {string} [confirmText="Oui"] - Texte du bouton de confirmation
   * @param {string} [cancelText="Non"] - Texte du bouton d'annulation
   * @returns {Promise} Promise SweetAlert
   */
  confirm: (title, text, confirmText = "Oui", cancelText = "Non") => {
    return Swal.fire({
      title: title,
      text: text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    });
  },

  /**
   * @function
   * @name toast
   * @memberof SwalUtils
   * @description Affiche une notification toast
   * @param {string} message - Message à afficher
   * @param {string} [type="success"] - Type d'icône (success, error, warning, info)
   * @returns {Promise} Promise SweetAlert
   */
  toast: (message, type = "success") => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    return Toast.fire({
      icon: type,
      title: message,
    });
  },
};

/**
 * @function validateForm
 * @description Valide tous les champs du formulaire
 * @returns {boolean} true si le formulaire est valide, false sinon
 */
function validateForm() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageTextArea.value.trim();

  if (!name || !email || !subject || !message) {
    return false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
}

/**
 * @function showValidationError
 * @description Affiche une erreur de validation pour un champ spécifique
 * @param {string} field - Nom du champ qui a une erreur
 */
function showValidationError(field) {
  Swal.fire({
    icon: "error",
    title: "Champ requis",
    text: `Le champ "${field}" est obligatoire et doit être valide.`,
    confirmButtonColor: "#3b82f6",
    timer: 3000,
    timerProgressBar: true,
  });
}

/**
 * @function showSuccessMessage
 * @description Affiche un message de succès générique et réinitialise le formulaire
 */
function showSuccessMessage() {
  Swal.fire({
    icon: "success",
    title: "Message envoyé!",
    text: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
    confirmButtonColor: "#3b82f6",
    showConfirmButton: true,
    timer: 5000,
    timerProgressBar: true,
  }).then(() => {
    // Reset form after success
    form.reset();
  });
}

// Show error message
/**
 * @function showErrorMessage
 * @description function pour afficher les erreus qu'il y a lors de l'envoi du formulaire
 */
function showErrorMessage() {
  Swal.fire({
    icon: "error",
    title: "Erreur d'envoi",
    text: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer plus tard.",
    confirmButtonColor: "#3b82f6",
    confirmButtonText: "OK",
  });
}

/**
 * @description Gestionnaire d'événement pour la soumission du formulaire de contact
 * Valide le formulaire et affiche les données dans une popup SweetAlert
 * @param {SubmitEvent} e - Événement de soumission du formulaire
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) {
    // Check which field is empty
    if (!nameInput.value.trim()) {
      showValidationError("Nom complet");
      nameInput.focus();
      return;
    }
    if (!emailInput.value.trim()) {
      showValidationError("Email");
      emailInput.focus();
      return;
    }
    if (!subjectInput.value.trim()) {
      showValidationError("Sujet");
      subjectInput.focus();
      return;
    }
    if (!messageTextArea.value.trim()) {
      showValidationError("Message");
      messageTextArea.focus();
      return;
    }

    /**
     * @type {RegExp}
     * pour la validation l'email qui sera saisie
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      Swal.fire({
        icon: "error",
        title: "Email invalide",
        text: "Veuillez entrer une adresse email valide.",
        confirmButtonColor: "#3b82f6",
        timer: 3000,
        timerProgressBar: true,
      });
      emailInput.focus();
      return;
    }
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageTextArea.value.trim();

  // Show success message with form data
  Swal.fire({
    icon: "success",
    title: "Message envoyé !",
    html: `
      <div style="text-align: left;">
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `,
    confirmButtonColor: "#3b82f6",
    confirmButtonText: "OK",
    showConfirmButton: true,
    timer: 8000,
    timerProgressBar: true,
  }).then(() => {
    form.reset();
    formChanged = false;
  });
});
