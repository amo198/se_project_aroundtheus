import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import Section from "../Components/Section.js";
import { initialCards, config } from "../utils/Constants.js";

const newAddPlacePopup = new PopupWithForm("#add-place-form", () => {});
const profileEditPopup = new PopupWithForm("#profile-edit-window", (evt) => {
  evt.preventDefault();
  profileEditPopup.close();
});
const cardPreview = new PopupWithImage("#image-popup", () => {});
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

function handleProfileFormSubmit(evt) {
  //evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  //closeModal(profileEditWindow);
}

//untouched old code
const profileEditButton = document.querySelector(".profile__edit-button");
//const profileEditWindow = document.querySelector("#profile-edit-window");
const closeButtons = document.querySelectorAll(".modal__close-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");
const profileFormElement = document.forms["profile-edit-fields"];
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
const profileAddButton = document.querySelector(".profile__add-button");
//const addPlaceWindow = document.querySelector("#add-place-form");
const addNewPlaceForm = document.forms["add-place-edit-fields"];
const placeNameInput = addNewPlaceForm.querySelector("#place-name");
const placeImageInput = addNewPlaceForm.querySelector("#image-link");
//the three const below have been transferred to Popup with image
/*const previewImageModal = document.querySelector("#image-popup");
const previewImage = previewImageModal.querySelector(".modal__image-preview");
const previewImageTitle = document.querySelector(".modal__image-title");*/

const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewPlaceForm);
addFormValidator.enableValidation();

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardInfo();
}
/*
function renderCard(cardData, cardList, method = "prepend") {
  const cardElement = createCard(cardData);
  cardList[method](cardElement);
}

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
