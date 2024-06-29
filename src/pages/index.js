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

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-job",
  avatarImage: "#profile-image",
});

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
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
  //console.log(cardId);
  api
    .deleteCard(card.getCardId())
    .then(() => {
      // console.log("This post has been deleted");
      card.handleDelete();
      deletePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

profileEditButton.addEventListener("click", () => {
  profileEditPopup.open();
  editFormValidator.disableButton();
  // api.updateUserInfo().then((userData) => {
  //   const currentUserInfo = userInfo.getUserInfo();
  //   document.querySelector("#profile-name").value = userData.name;
  //   document.querySelector("#profile-description").value = userData.description;
  // });
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector("#profile-name").value = currentUserInfo.name;
  document.querySelector("#profile-description").value =
    currentUserInfo.description;
});

// form submissions

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteModal
  );
  const cardElement = card.getCardInfo();
  return cardElement;
}

function handleAddCardFormSubmit(data) {
  // const newCard = createCard(data);
  // cardSection.addItem(newCard);
  const newCard = api.addCard(data).then((data) => {
    createCard(data);
  });
  cardSection.addItem(newCard);
  addPlacePopup.close();
  addPlacePopup.resetForm();
  addFormValidator.disableButton();
}

function handleProfileFormSubmit(userData) {
  // userInfo.setUserInfo(formValues.name, formValues.description);
  api
    .updateUserInfo({ name: userData.name, description: userData.about })
    .then(({ name, about }) => {
      userInfo.setUserInfo({ name, about });
      profileEditPopup.close();
    });

  // api.editProfile({
  //   name: inputValues.name,
  //   about: inputValues.about
  // })
  // .then(({ name, about }) => {
  //   userInfo.setUserInfo({
  //     name: name,
  //     about: about,
  //   });
  // })
}
