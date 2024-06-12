import Card from "../components/Card.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/Constants.js";
import Api from "../components/Api.js";

//Initializing cards

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a5df8bb7-ccf7-4af1-a820-819df810a6c4",
    "Content-Type": "application/json",
  },
});

let cardSection;

api.getInitialCards().then((cards) => {
  cardSection = new Section(
    {
      items: cards,
      renderer: (data) => {
        const cardElement = createCard(data);
        cardSection.addItem(cardElement);
      },
    },
    ".cards__list"
  );
  cardSection.renderItems();
});

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-job",
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
  editFormValidator.disableButton();
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector("#profile-name").value = currentUserInfo.name;
  document.querySelector("#profile-description").value =
    currentUserInfo.description;
});

// form submissions

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.getCardInfo();
  return cardElement;
}

function handleAddCardFormSubmit(data) {
  const newCard = createCard(data);
  cardSection.addItem(newCard);
  addPlacePopup.close();
  addPlacePopup.resetForm();
  addFormValidator.disableButton();
}

function handleProfileFormSubmit(formValues) {
  userInfo.setUserInfo(formValues.name, formValues.description);
  profileEditPopup.close();
}
/*
api
  .getInitialCards()
  .then((result) => {
    // process the result
  })
  .catch((err) => {
    console.error(err);
  });*/

//token: a5df8bb7-ccf7-4af1-a820-819df810a6c4
