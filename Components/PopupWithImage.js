import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = document.querySelector(".modal__image-preview");
    this._previewImageTitle = document.querySelector(".modal__image-title");
  }
  open(data) {
    this._previewImageTitle.textContent = data.name;
    this._previewImage.setAttribute("src", data.link);
    this._previewImage.setAttribute("alt", data.name);
    super.open();
  }
}
