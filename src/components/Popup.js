export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    this._buttonElement = this._popupElement.querySelector(
      ".modal__submit-button"
    );
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _handleClickOutside = (e) => {
    if (e.target === this._popupElement) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", this._handleClickOutside);
  }

  renderloading(isLoading) {
    if (isLoading) {
      this._buttonElement.textContent = "Saving...";
    } else {
      this._buttonElement.textContent = "Save";
    }
  }
}
