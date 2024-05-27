import Popup from "./Popup.js";

export default class PopupWithFrom extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll(".modal__form-input");
    const cardData = {};
    inputList.forEach((input) => {
      cardData[input.name] = input.value;
      cardData[input.link] = input.link;
    });

    return cardData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

//const placeNameInput = this._popupForm.querySelector("#place-name");
//const placeImageInput = this._popupForm.querySelector("#image-link");
