export default class Card {
  constructor({name, link, likes, owner}, userId, templateSelector, {handleCardClick, likeCardHandler, deleteCardHandler}, cardId) {
    this._titleCard = name;
    this._linkCard = link;
    this._templateSelector = templateSelector;
    this._cardId = cardId;
    this._countLikes = likes;
    this._userId = userId;
    this._ownerId = owner._id;

    this._handleCardClick = handleCardClick;
    this._likeCardHandler = likeCardHandler;
    this._deleteCardHandler = deleteCardHandler;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._titleCard, this._linkCard);
    })
    this._deleteIcon.addEventListener('click', () => {
      this._deleteCardHandler();
    })
    this._likeButton.addEventListener('click', () => {
      this._likeCardHandler();
    })
  }

  generateCard() {
    this._template = document.querySelector(this._templateSelector).content;
    this._view = this._template.cloneNode(true);
    this._likeButton = this._view.querySelector('.grid-item__like');
    this._image = this._view.querySelector('.grid-item__photo');
    this._deleteIcon = this._view.querySelector('.grid-item__delete-icon');
    if (this._ownerId !== this._userId) {
      this._deleteIcon.remove();
    }
    this._likes =  this._view.querySelector('.grid-item__like-counter');
    this._image.src = this._linkCard;
    this._image.alt = this._titleCard;
    this._view.querySelector('.grid-item__name').textContent = this._titleCard;
    this.renderLikes();
    this._setEventListeners();
    return this._view;
  }

  // ID карточки
  getIdCard() {
    return this._cardId;
  }

  // Функция определение лайка пользователя
  islikedCard() {
    return this._countLikes.some(like => {
      return like._id === this._userId;
    });
  }

  // Отрисовка лайка
  renderLikes() {
    this._likes.textContent = this._countLikes.length;
    this._showLikes(this._userId)
  }

  // Функция изменения вида лайка
  _showLikes() {
    if (this.islikedCard(this._userId)) {
      this._likeButton.classList.add('grid-item__like_liked');
    } else {
      this._likeButton.classList.remove('grid-item__like_liked');
    }
  }

  // Функция установки количества лайков
  setLikes(listLikes) {
    this._countLikes = listLikes;
  }

  // Удалить карточку 
  deleteCard() {
    this._deleteIcon.closest('.grid-item').remove();
  }

}