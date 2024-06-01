import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import Section from "../Components/Section.js";
import UserInfo from "../Components/UserInfo.js";
import { initialCards, config } from "../utils/Constants.js";

//Initializing cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#card-template", handleImageClick);
      const cardElement = card.getCardInfo();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

const userInfo = new UserInfo({
  name: "#profile-title",
  description: "#profile-job",
});

//Initializing add place popup window
const addPlacePopup = new PopupWithForm(
  "#add-place-form",
  handleAddCardFormSubmit
);

addPlacePopup.setEventListeners();

//Initializing add place popup window
const profileEditPopup = new PopupWithForm(
  "#profile-edit-window",
  handleProfileFormSubmit
);
profileEditPopup.setEventListeners();

const cardPreview = new PopupWithImage("#image-popup", handleImageClick);

//Edit profile window consts
const profileFormElement = document.forms["profile-edit-fields"];

const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();

//New card window consts
const addNewPlaceForm = document.forms["add-place-edit-fields"];

const addFormValidator = new FormValidator(config, addNewPlaceForm);
addFormValidator.enableValidation();

function handleImageClick(data) {
  cardPreview.open(data);
}

//Button consts
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

// button event listeners

profileAddButton.addEventListener("click", () => {
  addPlacePopup.open();
});

profileEditButton.addEventListener("click", () => {
  profileEditPopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector("#profile-name").value = currentUserInfo.name;
  document.querySelector("#profile-description").value =
    currentUserInfo.description;
});

// form submissions

function handleAddCardFormSubmit(data) {
  this.setEventListeners();
  createCard(data);
  addPlacePopup.close();
  cardSection.addItem();
}

function createCard(data) {
  const newCard = new Card(data, "#card-template", handleImageClick);
  addPlacePopup._getInputValues(newCard);
  return newCard.getCardInfo(data);
}

function handleProfileFormSubmit() {
  profileEditPopup.setEventListeners();
  editFormValidator.disableButton();
  userInfo.setUserInfo();
  profileEditPopup.close();
}

/* Old Code

function handleAddPlaceFormCreate() {
  this.setEventListeners();
  evt.target.reset();
  handleAddCardFormSubmit();
  addPlacePopup.close();
  addFormValidator.disableButton();
}

const cardList = document.querySelector(".cards__list");

function renderCard(data, cardList) {
  const newCardElement = createCard(data);
  newCardElement.renderItems(cardList);
}

profileEditButton.addEventListener("click", () => {
  profileEditPopup.open();
  userInfo.getUserInfo();
  //editFormValidator.disableButton();
});

profileEditPopup.addEventListener("submit", handleProfileFormSubmit);


function closeModal(modal) {
 modal.classList.remove("modal_opened");
 document.removeEventListener("keydown", closeModalEsc);
 modal.removeEventListener("mousedown", closeModalClick);
}



function closeModalEsc(evt) {
 if (evt.key === "Escape") {
   const openedModal = document.querySelector(".modal_opened");
   closeModal(openedModal);
 }
}


function closeModalClick(evt) {
 if (evt.target === evt.currentTarget) {
   closeModal(evt.currentTarget);
 }
}


closeButtons.forEach((button) => {
 const modal = button.closest(".modal");
 button.addEventListener("click", () => closeModal(modal));
});


function handleProfileFormSubmit(evt) {
 evt.preventDefault();
 profileName.textContent = profileNameInput.value;
 profileDescription.textContent = profileDescriptionInput.value;
 closeModal(profileEditWindow);
}


function handleAddPlaceFormCreate(evt) {
 evt.preventDefault();
 const name = placeNameInput.value;
 const link = placeImageInput.value;
 evt.target.reset();
 cardSection.addItem(cardElement);
 // renderCard({ name, link }, cardList);
 closeModal(addPlaceWindow);
 addFormValidator.disableButton();
}


function handleImageClick(data) {
 openModal(this._previewImageModal);
 previewImageTitle.textContent = data.name;
 previewImage.setAttribute("src", data.link);
 previewImage.setAttribute("alt", data.name);
}


initialCards.forEach((data) => renderCard(data, cardList));


profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addNewPlaceForm.addEventListener("submit", handleAddPlaceFormCreate);

 
function handleProfileFormSubmit(evt) {
 //evt.preventDefault();
 profileName.textContent = profileNameInput.value;
 profileDescription.textContent = profileDescriptionInput.value;
 //closeModal(profileEditWindow);
}

const profileEditWindow = document.querySelector("#profile-edit-window");
const profileFormElement = document.forms["profile-edit-fields"];
const addPlaceWindow = document.querySelector("#add-place-form");*/
