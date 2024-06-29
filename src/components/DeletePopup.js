import Popup from "./Popup.js";

export default class DeletePopup extends Popup {
  constructor(popupSelector, deleteCardForm, handleDeleteCard) {
    super({ popupSelector });
    this._handleDeleteCard = handleDeleteCard;
    this._deleteCardForm = deleteCardForm;
  }

  setSubmitHandler(handler) {
    this._handleDeleteCard = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteCardForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCard();
    });
  }
  handleDelete() {
    this._handleDeleteCard;
  }
}
