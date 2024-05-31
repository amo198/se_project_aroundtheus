export default class UserInfo {
  constructor({ name, description }) {
    this._profileName = document.querySelector(name);
    this._profileDescription = document.querySelector(description);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.description;
  }
}
