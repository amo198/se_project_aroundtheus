import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import Section from "../Components/Section.js";
import { initialCards, config } from "../utils/Constants.js";
/*
function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  cardSection.addItem(card.getCardInfo());
}

function handleProfileFormSubmit(evt) {
  //evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  //closeModal(profileEditWindow);
}*/

//untouched old code
const closeButtons = document.querySelectorAll(".modal__close-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");

//const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
//the three const below have been transferred to Popup with image
/*const previewImageModal = document.querySelector("#image-popup");
const previewImage = previewImageModal.querySelector(".modal__image-preview");
const previewImageTitle = document.querySelector(".modal__image-title");*/

//initialize form validator classes

//Edit profile consts
const profileFormElement = document.forms["profile-edit-fields"];
const profileEditWindow = document.querySelector("#profile-edit-window");
const profileEditButton = document.querySelector(".profile__edit-button");
//New card consts
const addNewPlaceForm = document.forms["add-place-edit-fields"];
const addPlaceWindow = document.querySelector("#add-place-form");
const profileAddButton = document.querySelector(".profile__add-button");
const placeNameInput = addNewPlaceForm.querySelector("#place-name");
const placeImageInput = addNewPlaceForm.querySelector("#image-link");

//Initializing form validators
const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewPlaceForm);
addFormValidator.enableValidation();

//Initializing add place popup window
const addPlacePopup = new PopupWithForm(addPlaceWindow, (data) => {
  const { title, link } = data;
  const cardData = { name: title, link: link };
  const cardElement = createCard(cardData);

  cardSection.addItem(cardElement);
  addPlacePopup.close();
  addPlacePopup.resetForm();
});
addPlacePopup.setEventListeners();

//Initializing add place popup window
const profileEditPopup = new PopupWithForm(profileEditWindow, (evt) => {
  evt.preventDefault();
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

const cardPreview = new PopupWithImage("#image-popup", (data) => {
  cardPreview.open();
});

//Initializing cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardSection.addItem(card.getCardInfo());
}

function handleAddCardFormSubmit(data) {
  renderCard({ name: data.title, link: data.link });
  addPlacePopup.close();
}

/*
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalClick);


profileAddButton.addEventListener("click", () => {
  addNewPlaceForm.open();
});

profileEditButton.addEventListener("click", () => {
  //profileNameInput.value = profileName.textContent;
  //profileDescriptionInput.value = profileDescription.textContent;
  profileEditForm.open();
  editFormValidator.disableButton();
});}*/
