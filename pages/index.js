import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import Section from "../Components/Section.js";
import { initialCards } from "../utils/Constants.js";
import { config } from "../utils/Constants.js";

const newCardPopup = new PopupWithForm("#add-place-form", () => {});
const cardPreview = new PopupWithImage("#image-popup", () => {});
const cardSection = new Section(
  {
    renderer: (data) => {
      items: initialCards, cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

//untouched old code
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditWindow = document.querySelector("#profile-edit-window");
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

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getCardInfo();
}

function renderCard(data, cardList, method = "prepend") {
  const cardElement = createCard(data);
  cardList[method](cardElement);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalClick);
}

profileAddButton.addEventListener("click", () => {
  openModal(addPlaceWindow);
});

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditWindow);
  editFormValidator.disableButton();
});

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
  openModal(previewImageModal);
  previewImageTitle.textContent = data.name;
  previewImage.setAttribute("src", data.link);
  previewImage.setAttribute("alt", data.name);
}
/*
initialCards.forEach((data) => renderCard(data, cardList));
*/
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addNewPlaceForm.addEventListener("submit", handleAddPlaceFormCreate);
