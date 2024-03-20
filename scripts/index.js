const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditWindow = document.querySelector("#profile-edit-window");
const closeButton = document.querySelectorAll(".modal__close-button"); //something is happening here
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");
const profileFormElement = document.forms["profile-edit-fields"];
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
const profileAddButton = document.querySelector(".profile__add-button");
const addPlaceWindow = document.querySelector("#add-place-form");
const addPlaceCloseButton = document.querySelectorAll(".modal__close-button");
const addNewPlaceForm = document.forms["add-place-edit-fields"];
const placeNameInput = addNewPlaceForm.querySelector("#place-name");
const placeImageInput = addNewPlaceForm.querySelector("#image-link");
const previewImageModalCloseButton = document.querySelector(
  "#image-preview-close"
);
const previewImageModal = document.querySelector("#image-popup");
const previewImage = previewImageModal.querySelector(".modal__image-preview");
const previewImageTitle = document.querySelector(".modal__image-title");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

profileAddButton.addEventListener("click", () => {
  openModal(addPlaceWindow);
});

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditWindow);
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

closeButton.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditWindow);
}

function renderCard(data, cardList, method = "prepend") {
  const cardElement = getCardElement(data);
  cardList.prepend(cardElement);
}

function handleAddPlaceFormCreate(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = placeImageInput.value;
  evt.target.reset();
  renderCard({ name, link }, cardList);
  closeModal(addPlaceWindow);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openModal(previewImageModal);
    previewImageTitle.textContent = cardTitle.textContent;
    previewImage.src = cardImage.src;
    previewImage.alt = cardTitle.textContent;
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

initialCards.forEach((data) => renderCard(data, cardList));

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addNewPlaceForm.addEventListener("submit", handleAddPlaceFormCreate);
