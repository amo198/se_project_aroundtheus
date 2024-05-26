import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import Section from "../Components/Section.js";
import UserInfo from "../Components/UserInfo.js";
import { initialCards, config } from "../utils/Constants.js";
import Popup from "../Components/Popup.js";

//Button consts
const closeButtons = document.querySelectorAll(".modal__close-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

//Edit profile window consts
const profileFormElement = document.forms["profile-edit-fields"];
//const profileEditWindow = document.querySelector("#profile-edit-window");

//New card window consts
const addNewPlaceForm = document.forms["add-place-edit-fields"];
//const addPlaceWindow = document.querySelector("#add-place-form");
const placeNameInput = addNewPlaceForm.querySelector("#place-name");
const placeImageInput = addNewPlaceForm.querySelector("#image-link");

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

const userInfo = new UserInfo();

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

function handleImageClick(data) {
  cardPreview.open(data);
}

const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewPlaceForm);
addFormValidator.enableValidation();

//must fix handle add place form create and submit
function handleAddPlaceFormCreate(evt) {
  evt.preventDefault();
  evt.target.reset();
  handleAddCardFormSubmit();
  cardSection.addItem(cardElement);
  //closeModal(addPlaceWindow);
  addFormValidator.disableButton();
}

addNewPlaceForm.addEventListener("submit", handleAddPlaceFormCreate);

function handleAddCardFormSubmit(name, link) {
  name.value = placeNameInput.value;
  link.value = placeImageInput.value;
  cardSection.addItem(cardElement);
}

profileEditButton.addEventListener("click", (name, description) => {
  userInfo.getUserInfo();
  this._profileNameInput.textContent = name;
  this._profileDescriptionInput.textContent = description;
  profileEditForm.open();
  editFormValidator.disableButton();
});

profileAddButton.addEventListener("click", addPlacePopup);

//must fix, maybe not relevant anymore
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo();
  //closeModal(profileEditWindow);
  profileEditPopup.close();
}

profileEditPopup.addEventListener("submit", handleProfileFormSubmit);

/* Old Code
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


const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditWindow = document.querySelector("#profile-edit-window");
const closeButtons = document.querySelectorAll(".modal__close-button");
const profileFormElement = document.forms["profile-edit-fields"];
const profileAddButton = document.querySelector(".profile__add-button");
const addPlaceWindow = document.querySelector("#add-place-form");*/
