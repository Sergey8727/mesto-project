import '../pages/index.css';
import { openPopup, closePopup } from './modal';
import { enableValidation, settings } from './validate';
import { createCard, initialCards } from './card';

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
const cardName = cardForm.querySelector('.popup__grid-name');
const cardLink = cardForm.querySelector('.popup__grid-link')
const popups = document.querySelectorAll('.popup');
export const imgPopup = popupImg.querySelector('.popup__image');
const saveButton = document.querySelector('#save-button');

export function addCard(container, data) {
  container.prepend(createCard(data));
};

initialCards.forEach(card => {
  addCard(cardsContainer, card);
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

function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  titleProfile.textContent = nameProfile.value;
  description.textContent = descriptionProfile.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', handleSubmitProfileForm);

addButton.addEventListener('click', () => {
  saveButton.classList.add(settings.inactiveButtonClass);
  saveButton.disabled = true;
  openPopup(popupGrid);
});

enableValidation(settings);
