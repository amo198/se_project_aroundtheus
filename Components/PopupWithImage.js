import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImageModal = this._popupElement.querySelector("#image-popup");
    this._previewImage = this._previewImageModal.querySelector(
      ".modal__image-preview"
    );
    this._previewImageTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
  }
  open(data) {
    this._previewImageTitle.textContent = data.name;
    this._previewImage.setAttribute("src", data.link);
    this._previewImage.setAttribute("alt", data.name);
    super.open();
  }
}
