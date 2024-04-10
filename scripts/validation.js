function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  inputElement.classList.remove(inputErrorClass);
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessage.textContent = "";
  errorMessage.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputElements) {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const { inputSelector } = config;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputElements, submitButton, config);
    });
  });
}

const enableValidation = (config) => {
  const formsElement = Array.from(
    document.querySelectorAll(config.formSelector)
  );
  formsElement.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__form-input_type",
  errorClass: "modal__error_visible",
};

enableValidation(config);
