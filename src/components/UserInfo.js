export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarImage }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._avatarImage = document.querySelector(avatarImage);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(name, description, avatarImage) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
    this._avatarImage.src = avatarImage;
  }

  // setUserAvatar(avatarImage) {
  //   this._avatarImage.src = avatarImage;
  // }
}
