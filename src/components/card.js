import { openPopup } from './modal';
import { cardTemplate, popupImg } from './index';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

export function createCard(item) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const image = cardElement.querySelector('.photo-grid__image');

  cardElement.querySelector('.photo-grid__title').textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.photo-grid__item').remove();
  });

  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like_active');
  });

  image.addEventListener('click', () => {
    openPopup(popupImg);
    popupImg.querySelector('.popup__name').textContent = item.name;
    popupImg.querySelector('.popup__image').src = item.link;
    popupImg.querySelector('.popup__image').alt = item.name;;
  });

  return cardElement;
}
