import '../pages/index.css';
import { openPopup, closePopup } from './modal';
import { enableValidation, settings } from './validate';
import { createCard, } from './card';

import { getUserData, getCards, loading, patchProfileData, processRequest, postCard, patchAvatar } from './api.js';

const popupProfile = document.querySelector('.popup__profile');
const titleProfile = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupGrid = document.querySelector('.popup-grid');
export const popupImg = document.querySelector('.popup__img');
const cardsContainer = document.querySelector('.photo-grid__list');
export const cardTemplate = document.querySelector('.photo-grid__template').content;
const cardForm = document.querySelector('#add_card');
const formProfile = document.querySelector('.popup__container');
const nameProfile = document.querySelector('#name');
const descriptionProfile = document.querySelector('#description');
const popups = document.querySelectorAll('.popup');
export const imgPopup = popupImg.querySelector('.popup__image');
const saveButton = document.querySelector('#save-button');

const saveProfileButton = popupProfile.querySelector('.popup__save-button');
const userAvatar = document.querySelector('.profile__avatar');
const imgCard = document.querySelector('#img');
const linkCard = document.querySelector('#link');
export const deleteCard = document.querySelector('.photo-grid__delete-button');
const popupAvatar = document.querySelector('.popup_avatar-edit');
const buttonAvatar = document.querySelector('.profile__edit-avatar');
const formAvatar = popupAvatar.querySelector('.popup__container');
const saveAvatar = popupAvatar.querySelector('.popup__save-button');
const linkAvatar = popupAvatar.querySelector('.popup__input');

let user;

buttonAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
});

formAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  loading(true, saveAvatar);
  patchAvatar(linkAvatar.value)
    .then(processRequest)
    .then(res => {
      renderUserData(res);
      closePopup(popupAvatar);
    })
    .catch(err => {console.error(err)})
    .finally(() => loading(false, saveAvatar));
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
})

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  loading(true, saveButton);
  postCard(imgCard.value, linkCard.value)
    .then(processRequest)
    .then(card => {
      cardsContainer.prepend(createCard(card, user._id));
      closePopup(popupGrid);
    })
    .catch(err => {console.error(err)})
    .finally(() => loading(false, saveButton));
});

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameProfile.value = titleProfile.textContent;
  descriptionProfile.value = description.textContent;
});

formProfile.addEventListener('submit', handleSubmitProfileForm);

addButton.addEventListener('click', () => {
  saveButton.classList.add(settings.inactiveButtonClass);
  saveButton.disabled = true;
  openPopup(popupGrid);
});

enableValidation(settings);

Promise.all([getUserData(), getCards()])
  .then(([profile, cards]) => {
    renderUserData(profile);
    cards.forEach(card => {
      cardsContainer.append(createCard(card, profile._id));
    });
  })
  .catch(err => {console.error(err)});

function renderUserData(data) {
  user = data;
  titleProfile.textContent = data.name;
  description.textContent = data.about;
  userAvatar.src = data.avatar;
}

function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  loading(true, saveProfileButton);
  patchProfileData(nameProfile.value, descriptionProfile.value)
    .then(processRequest)
    .then(res => {
      renderUserData(res);
      closePopup(popupProfile);

    })
    .catch(err => {console.error(err)})
    .finally(() => loading(false, saveProfileButton));
}
