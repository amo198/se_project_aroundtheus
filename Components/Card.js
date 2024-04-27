export default class Card {
  constructor({ name, link }, cardSelector) {
    console.log({ name, link });
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    /*
   this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteIcon();
      });*/
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
    console.log("you clicked it");
  }
  /*
  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }
*/
  getCardInfo() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();
    return this._cardElement;
  }
}
