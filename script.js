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
const cardForm = document.querySelector('#add_card');
const closeButtonCard = document.querySelector('#close_popupCard');
const formProfile = document.querySelector('.popup__container');
const nameProfile = document.querySelector('#name');
const descriptionProfile = document.querySelector('#description');
const cardName = cardForm.querySelector('.popup__grid-name');
const cardLink = cardForm.querySelector('.popup__grid-link')




function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

function createCard(item) {
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

function addCard(container, data) {
  container.prepend(createCard(data));
}
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const item = [];
  item['name'] = cardName.value;
  item['link'] = cardLink.value;
  console.log(item);
  addCard(cardsContainer, item);
  cardForm.reset();
  closePopup(popupGrid);
});

addButton.addEventListener('click', () => {
  openPopup(popupGrid);
});

closeButtonCard.addEventListener('click', () => closePopup(popupGrid));

initialCards.forEach(card => {
  addCard(cardsContainer, card);
});

closeButtonImg.addEventListener('click', () => closePopup(popupImg));
