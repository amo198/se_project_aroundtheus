export default class UserInfo {
  constructor(name, description) {
    this._profileName = name;
    this._profileDescription = description;
    this._profileNameInput = document.querySelector("#profile-name");
    this._profileDescriptionInput = document.querySelector(
      "#profile-description"
    );
  }

  getUserInfo() {
    this._profileNameInput.value = this._profileName.textContent;
    this._profileDescriptionInput.value = this._profileDescription.textContent;
  }

  setUserInfo() {
    this._profileName.textContent = this._profileNameInput.value;
    this._profileDescription.textContent = this._profileDescriptionInput.value;
  }
}
