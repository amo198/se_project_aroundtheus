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

console.log(initialCards);

const profileEditButton = document.querySelector(".profile__edit-button");
const modalEditMessage = document.querySelector("#modal-edit-message");

profileEditButton.addEventListener("click", function () {
  modalEditMessage.classList.add("modal_opened");
});

const modalCloseButton = document.querySelector(".modal__close-button");

modalCloseButton.addEventListener("click", function () {
  modalEditMessage.classList.remove("modal_opened");
});

const profileFormElement = document.querySelector(".modal__form");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#about-me");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector("profile__description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe = inputAboutMe.value;
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

/*const cardTemplate = document.querySelector("#card-template");*/

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  return cardElement;
}

const cardList = document.querySelector(".cards__list");

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.prepend(cardElement);
});
