export function loading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
    button.disabled = true;
  }
  else {
    if (button.classList.contains('popup__button_create')) {
      button.textContent = 'Создать';
    }
    else {
      button.textContent = 'Сохранить';
    }
    button.disabled = false;
  }
}
