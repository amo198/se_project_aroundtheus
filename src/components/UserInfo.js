export default class UserInfo {
  constructor({ name, description }) {
    this._profileName = document.querySelector(name);
    this._profileDescription = document.querySelector(description);
    this._profileNameInput = document.querySelector("#profile-name");
    this._profileDescriptionInput = document.querySelector(
      "#profile-description"
    );
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo() {
    this._profileName.textContent = this._profileNameInput.value;
    this._profileDescription.textContent = this._profileDescriptionInput.value;
  }
}
