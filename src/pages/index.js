import Card from "../components/Card.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { config } from "../utils/Constants.js";
import Api from "../components/Api.js";
import DeletePopup from "../components/DeletePopup.js";

//Form const
const addNewPlaceForm = document.forms["add-place-edit-fields"];
const editAvatarForm = document.forms["edit-avatar-image"];
const deleteCardForm = document.forms["delete-card-form"];
const profileFormElement = document.forms["profile-edit-fields"];

//Button consts
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const editAvatarButton = document.querySelector(".profile__avatar-container");

//Initializing cards

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a5df8bb7-ccf7-4af1-a820-819df810a6c4",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userInfo]) => {
    console.log(cards, userInfo);
  })
  .catch((err) => console.error(err));

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

//initializing user info
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-job",
  avatarImage: "#profile-image",
});

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setUserAvatar(userData.avatar);
});

//Initializing popup windows
const addPlacePopup = new PopupWithForm(
  "#add-place-form",
  handleAddCardFormSubmit
);

//Initializing profile popup window
const profileEditPopup = new PopupWithForm(
  "#profile-edit-window",
  handleProfileFormSubmit
);

const editAvatarPopup = new PopupWithForm(
  "#edit-avatar",
  handleAvatarFormSubmit
);

const cardPreview = new PopupWithImage("#image-popup", handleImageClick);

const deletePopup = new DeletePopup("#delete-card", deleteCardForm);

//Set eventlisteners

addPlacePopup.setEventListeners();
profileEditPopup.setEventListeners();
editAvatarPopup.setEventListeners();
deletePopup.setEventListeners();

//Form Validaors

const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewPlaceForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, editAvatarForm);
avatarFormValidator.enableValidation();

//Open Modals

function handleImageClick(data) {
  cardPreview.open(data);
}

profileAddButton.addEventListener("click", () => {
  addPlacePopup.open();
});

editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarFormValidator.disableButton();
});

profileEditButton.addEventListener("click", () => {
  profileEditPopup.open();
  editFormValidator.disableButton();
  api.getUserInfo().then((res) => {
    document.querySelector("#profile-name").value = res.name;
    document.querySelector("#profile-description").value = res.about;
  });
});

//feature functions

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

function handleDeleteModal(card) {
  deletePopup.setSubmitHandler(() => handleDeleteCard(card));
  deletePopup.open();
}

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

//all form submissions

function handleAddCardFormSubmit(data) {
  addPlacePopup.renderloading(true);
  api
    .addCard(data)
    .then((data) => {
      const newCardElement = createCard(data);
      cardSection.addItem(newCardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addFormValidator.disableButton();
      addPlacePopup.renderloading(false);
      addPlacePopup.close();
    });
  addPlacePopup.resetForm();
}

function handleProfileFormSubmit(userData) {
  profileEditPopup.renderloading(true);
  api
    .updateUserInfo(userData.name, userData.about)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditPopup.renderloading(false);
      profileEditPopup.close();
    });
}

function handleAvatarFormSubmit(userData) {
  editAvatarPopup.renderloading(true);
  api
    .updateAvatarImage(userData)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarPopup.renderloading(false);
      editAvatarPopup.close();
    });
}
