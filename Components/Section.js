class Section {
  constructor({ items, renderer }, '.cards__list') {
    this._items = items;
    this._renderer = renderer;
    this._cardListSelector = '.cards__list';
  }

  addItem(item) {
    this._cardListSelector.prepend(item);
  }

  renderItems() {
    this._items.forEach((item) => {
        const cardElement = this._renderer(item);
        this._cardListSelector.append(cardElement);
    });
  }
}
