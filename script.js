const popupProfile = document.querySelector('.popup__profile');
const closeButtonProfile = document.querySelector('.popup__close-button');
const titleProfile = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupGrid = document.querySelector('.popup-grid');
const popupImg = document.querySelector('.popup__img');
const closeButtonImg = document.querySelector('.popup__button-close');
const cardsContainer = document.querySelector('.photo-grid__list');
const cardTemplate = document.querySelector('.photo-grid__template').content;
const cardForm = document.getElementById('add_card');
const closeButtonCard = document.querySelector('#close_popupCard');
const formProfile = document.querySelector('.popup__container');
const nameProfile = document.getElementById('name');
const descriptionProfile = document.getElementById('description');
const cardImage = document.querySelectorAll('.card__pic');

const initialCards = [
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
});

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));

function formSubmitHandler(evt) {
  evt.preventDefault();
  titleProfile.textContent = nameProfile.value;
  description.textContent = descriptionProfile.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', formSubmitHandler);

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);

  cardElement.querySelector('.photo-grid__title').textContent = name;
  cardElement.querySelector('.photo-grid__image').src = link;
  cardElement.querySelector('.photo-grid__image').alt = name;

  cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.photo-grid__item').remove();
  });

  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like_active');
  });

  cardElement.querySelector('.photo-grid__image').addEventListener('click', function () {
    showCard(name, link);
    openPopup(popupImg);
  });

  return cardElement;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(cardsContainer, createCard(cardForm.name.value, cardForm.link.value));
  cardForm.reset();
  closePopup(popupGrid);
});

addButton.addEventListener('click', () => {
  openPopup(popupGrid);
});

closeButtonCard.addEventListener('click', () => closePopup(popupGrid));

initialCards.forEach(card => {
  addCard(cardsContainer, createCard(card.name, card.link));
});

function showCard(popupName, popupLink) {
  openPopup(popupImg);
  popupImg.querySelector('.popup__name').textContent = popupName;
  popupImg.querySelector('.popup__image').src = popupLink;
  popupImg.querySelector('.popup__image').alt = popupName;
}

closeButtonImg.addEventListener('click', () => closePopup(popupImg));
