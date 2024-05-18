import Popup from "./Popup.js";

export default class PopupWithFrom extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this.popupForm.reset();
    super.close();
  }
}
