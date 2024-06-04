export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    //this._profileNameInput = document.querySelector("#profile-name");
    //this._profileDescriptionInput = document.querySelector("#profile-description");
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(name, description) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }
}
