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
const modalEditWindow = document.querySelector("#modal-edit-message");
const modalCloseButton = document.querySelector("#edit-profile-close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");
const profileFormElement = document.forms["profile-edit-fields"];
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
const profileAddButton = document.querySelector(".profile__add-button");
const modalAddPlaceWindow = document.querySelector("#add-place-form");
const modalAddPlaceCloseButton = document.querySelector("#add-place-close");
const addNewPlaceForm = document.forms["add-place-edit-fields"];
const placeNameInput = addNewPlaceForm.querySelector("#place-name");
const placeImageInput = addNewPlaceForm.querySelector("#image-link");
const modalImageCloseButton = document.querySelector("#image-preview-close");
const previewImageModal = document.querySelector("#image-popup");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

profileAddButton.addEventListener("click", () => {
  openModal(modalAddPlaceWindow);
});

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(modalEditWindow);
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

modalCloseButton.addEventListener("click", () => {
  closeModal(modalEditWindow);
});

modalAddPlaceCloseButton.addEventListener("click", () => {
  closeModal(modalAddPlaceWindow);
});

modalImageCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(modalEditWindow);
}

function renderCard(data, cardList) {
  const cardElement = getCardElement(data);
  cardList.prepend(cardElement);
}

function handleAddPlaceFormCreate(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = placeImageInput.value;
  const cardElement = getCardElement({ name, link });
  cardList.prepend(cardElement);
  closeModal(modalAddPlaceWindow);
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
    const previewImage = previewImageModal.querySelector(
      ".modal__image-preview"
    );
    const previewImageTitle = document.querySelector(".modal__image-title");
    openModal(previewImageModal);
    previewImageTitle.textContent = cardTitle.textContent;
    previewImage.src = cardImage.src;
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

initialCards.forEach((data) => renderCard(data, cardList));

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addNewPlaceForm.addEventListener("submit", handleAddPlaceFormCreate);

/* First attempt
function createNewCardElement(data) {
  const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const newCardName = cardTemplate.querySelector("#place-name");
  const newCardImage = cardTemplate.querySelector("#image-link");
  newCardName.textContent = placeNameInput;
  newCardImage.src = placeImageInput;
  return newCardElement;
}

initialCards.forEach((data) => {
  const newCardElement = createNewCardElement(data);
  cardList.prepend(newCardElement);
});
*/
