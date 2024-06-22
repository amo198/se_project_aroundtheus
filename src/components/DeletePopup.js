import Popup from "./Popup.js";

export default class DeletePopup extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this.setEventListeners();
  }
  open() {
    super.open();
  }
}
