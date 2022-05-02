import '../pages/index.css';
import { openPopup, closePopup } from './modal';
import { enableValidation, settings } from './validate';
import { createCard, initialCards } from './card';

const popupProfile = document.querySelector('.popup__profile');
const closeButtonProfile = document.querySelector('.popup__close-button');
const titleProfile = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupGrid = document.querySelector('.popup-grid');
export const popupImg = document.querySelector('.popup__img');
const closeButtonImg = document.querySelector('.popup__button-close');
const cardsContainer = document.querySelector('.photo-grid__list');
export const cardTemplate = document.querySelector('.photo-grid__template').content;
const cardForm = document.querySelector('#add_card');
const closeButtonCard = document.querySelector('#close_popupCard');
const formProfile = document.querySelector('.popup__container');
const nameProfile = document.querySelector('#name');
const descriptionProfile = document.querySelector('#description');
const cardName = cardForm.querySelector('.popup__grid-name');
const cardLink = cardForm.querySelector('.popup__grid-link')
const popups = document.querySelectorAll('.popup');

export function addCard(container, data) {
  container.prepend(createCard(data));
};

initialCards.forEach(card => {
  addCard(cardsContainer, card);
});


popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__toggle'))
      closePopup(popup);
  })
})

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const item = [];
  item['name'] = cardName.value;
  item['link'] = cardLink.value;
  addCard(cardsContainer, item);
  cardForm.reset();
  closePopup(popupGrid);
});

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameProfile.value = titleProfile.textContent;
  descriptionProfile.value = description.textContent;
});

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));

function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  titleProfile.textContent = nameProfile.value;
  description.textContent = descriptionProfile.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', handleSubmitProfileForm);

addButton.addEventListener('click', () => {
  openPopup(popupGrid);
});

closeButtonCard.addEventListener('click', () => closePopup(popupGrid));

closeButtonImg.addEventListener('click', () => closePopup(popupImg));

enableValidation(settings);
