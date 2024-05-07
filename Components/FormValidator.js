export default class FormValidator {
  constructor(config, formsElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButton = formsElement.querySelector(
      config.submitButtonSelector
    );
    this._inactiveButton = config.inactiveButtonClass;
    this._inputError = config.inputErrorClass;
    this._error = config.errorClass;

    this._form = formsElement;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    } else {
      return this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement) {
    const errorMessage = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    console.log(inputElement.validity);
    errorMessage.textContent = inputElement.validationMessage;
    errorMessage.classList.add(this._error);
  }

  _hideInputError(inputElement) {
    const errorMessage = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._error);
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButton);
    this._submitButton.disabled = false;
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButton);
    this._submitButton.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("input", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
