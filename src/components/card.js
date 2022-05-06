import { openPopup } from './modal';
import { cardTemplate, popupImg, imgPopup, } from './index';
import { addLike, deleteLike, deleteCard } from './api';


export function setLikesCounter(likesCounter, likes) {
  likesCounter.textContent = likes.length;
}

function toggleLike(evt, likesCounter, likes) {
  evt.target.classList.toggle('photo-grid__like_active');
  setLikesCounter(likesCounter, likes)
}

function getLikeState(evt, cardId, likes) {
  if (evt.target.classList.contains('photo-grid__like_active')) {
    return deleteLike(cardId);
  }
  return addLike(cardId, likes);
}

function setLike(evt, cardId, likes, likesCounter) {
  getLikeState(evt, cardId, likes)
    .then(res => toggleLike(evt, likesCounter, res.likes))
    .catch(err => { console.error(err) });
}

export function createCard(item, userId) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const image = cardElement.querySelector('.photo-grid__image');
  const like = cardElement.querySelector('.photo-grid__like');
  const likesCounter = cardElement.querySelector('.photo-grid__like-counter');
  const deleteButton = cardElement.querySelector('.photo-grid__delete-button');

  cardElement.querySelector('.photo-grid__title').textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    setLike(evt, item._id, item.likes, likesCounter);
  });

  deleteButton.addEventListener('click', (evt) => {
    deleteCard(item._id)
      .then(() => (evt.target.closest('.photo-grid__item').remove()))
      .catch(err => { console.error(err) });
  });

  if (item.likes.find(user => {
    return user._id === userId
  })) {
    like.classList.add('photo-grid__like_active');
  }
  setLikesCounter(likesCounter, item.likes);
  if (item.owner._id !== userId) {
    deleteButton.remove();
  }

  image.addEventListener('click', () => {
    openPopup(popupImg);
    popupImg.querySelector('.popup__name').textContent = item.name;
    imgPopup.src = item.link;
    imgPopup.alt = item.name;;
  });

  return cardElement;
}
