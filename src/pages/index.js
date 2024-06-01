import Card from "./components/Card.js";
import "./index.css";
import FormValidator from "..FormValidator.js";
import PopupWithImage from "..PopupWithImage.js";
import PopupWithForm from "..PopupWithForm.js";
import Section from "..Section.js";
import UserInfo from "..UserInfo.js";
import { initialCards, config } from "..Constants.js";

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
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.getCardInfo();
  cardSection.addItem(cardElement);
  addPlacePopup.close();
}

function handleProfileFormSubmit() {
  profileEditPopup.setEventListeners();
  editFormValidator.disableButton();
  userInfo.setUserInfo();
  profileEditPopup.close();
}
