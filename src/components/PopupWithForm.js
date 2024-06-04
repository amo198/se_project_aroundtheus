import Popup from "./Popup.js";

export default class PopupWithFrom extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    //this._inputList = this._popupForm.querySelectorAll(".modal__form-input");
  }

  /*  open() {
    super.open();
  }

  close() {
    super.close();
  }
*/
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
      //this._popupForm.reset();
    });
  }
}
