export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardContainer = document.querySelector(containerSelector);
    this.renderItems();
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
