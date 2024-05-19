export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._classSelector = classSelector;
    this._cardContainer = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._cardContainer.prepend(item);
  }
}

// Old code

/*const cardElement = this._renderer(item);
  this._cardContainer.append(cardElement);*/
