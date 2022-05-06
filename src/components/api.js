const config = {
  baseURL: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: 'b53e2a38-0e76-4aa3-8ea6-f80ba66021c7',
    'Content-Type': 'application/json'
  }
}

export function processRequest(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const getUserData = () => {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers
  })
    .then(processRequest)
};

export const getCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  })
    .then(processRequest)
};

export const patchProfileData = (name, bio) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: bio
    })
  })
    .then(processRequest)
};

export const patchAvatar = (link) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(processRequest)
}

export const postCard = (name, link) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(processRequest)
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(processRequest)
}

export const deleteCard = (id) => {
  return fetch(`${config.baseURL}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(processRequest)
}

export const addLike = (cardId, likes) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      likes: likes
    })
  })
    .then(processRequest)
}


