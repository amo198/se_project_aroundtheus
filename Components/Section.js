class Section {
  constructor({ objects, renderer }, cardSelector) {
    this._objects = objects;
    this._renderer = renderer;
    this._cardSelector = cardSelector;
  }

  addItem(element) {
    this._cardSelector.append(element);
  }

  renderItems() {
    this.renderItems.forEach((item) => {
      renderer();
    });
  }
}
