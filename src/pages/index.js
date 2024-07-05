import Card from "../components/Card.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/Constants.js";
import Api from "../components/Api.js";
import DeletePopup from "../components/DeletePopup.js";

//Initializing cards

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a5df8bb7-ccf7-4af1-a820-819df810a6c4",
    "Content-Type": "application/json",
  },
});

let cardSection;

api
  .getInitialCards()
  .then((cards) => {
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
  })
  .catch((err) => {
    console.error(err);
  });

//Initializing add place popup window
const addPlacePopup = new PopupWithForm(
  "#add-place-form",
  handleAddCardFormSubmit
);

addPlacePopup.setEventListeners();

//Initializing profile popup window
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
const editAvatarButton = document.querySelector(".profile__avatar-container");
// button event listeners

profileAddButton.addEventListener("click", () => {
  addPlacePopup.open();
});

const editAvatarForm = document.forms["edit-avatar-image"];

const editAvatarPopup = new PopupWithForm(
  "#edit-avatar",
  handleAvatarFormSubmit
);
editAvatarPopup.setEventListeners();

const avatarFormValidator = new FormValidator(config, editAvatarForm);
avatarFormValidator.enableValidation();

editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarFormValidator.disableButton();
});

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-job",
  avatarImage: "#profile-image",
});

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setUserAvatar(userData.avatar);
});

const deleteCardForm = document.forms["delete-card-form"];

const deletePopup = new DeletePopup("#delete-card", deleteCardForm);
deletePopup.setEventListeners();

// runs when we click the trach button on a card
function handleDeleteModal(card) {
  deletePopup.setSubmitHandler(() => handleDeleteCard(card));
  deletePopup.open();
}

//runs when we click 'yes' on the deletePopup modal
function handleDeleteCard(card) {
  api
    .deleteCard(card.getCardId())
    .then(() => {
      card.handleDeleteCard();
      deletePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeCard(card) {
  if (card.isLiked) {
    api
      .unlikeCard(card.getCardId())
      .then((res) => {
        card.handleLikeCard(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(card.getCardId())
      .then((res) => {
        card.handleLikeCard(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

profileEditButton.addEventListener("click", () => {
  profileEditPopup.open();
  editFormValidator.disableButton();
  api.getUserInfo().then((res) => {
    document.querySelector("#profile-name").value = res.name;
    document.querySelector("#profile-description").value = res.about;
  });
});

// form submissions

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteModal,
    handleLikeCard
  );
  const cardElement = card.getCardInfo();
  return cardElement;
}

function handleAddCardFormSubmit(data) {
  api.addCard(data).then((data) => {
    const newCardElement = createCard(data);
    cardSection.addItem(newCardElement);
  });
  addPlacePopup.close();
  addPlacePopup.resetForm();
  addFormValidator.disableButton();
}

function handleProfileFormSubmit(userData) {
  api.updateUserInfo(userData.name, userData.about).then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    profileEditPopup.close();
  });
}

function handleAvatarFormSubmit(userData) {
  api
    .updateAvatarImage(userData)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
    })
    .catch((err) => {
      console.error(err);
    });
  editAvatarPopup.close();
}
// userInfo.setUserAvatar(res.avatar);
