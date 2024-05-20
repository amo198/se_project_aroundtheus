export default class UserInfo {
  constructor({ name, job }) {}

  getUserInfo() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  }

  setUserInfo() {
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
  }
}
