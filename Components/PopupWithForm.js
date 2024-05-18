import Popup from "./Popup.js";

class PopupWithFrom extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupElement.querySelector(/*popup form*/);
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this.popupForm.reset();
    //super calls the parent class
  }
}
