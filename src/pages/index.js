import FormValidator from '../scripts/components/FormValidator.js';
import {settingsForm} from '../scripts/utils/settingsForm.js';
import Card from '../scripts/components/Card.js';
import '../pages/index.css';
import Api from '../scripts/components/Api.js';
import {
  popupEditWrap,
  popupButton,
  popupButtonClose,
  profileName,
  profileJob,
  popupForm,
  popupName,
  popupJob,
  popupEditSaveButton,
  popupAdd,
  popupAddButton,
  popupAddButtonClose,
  popupAddForm,
  popupAddSaveButton,
  popupFullImage,
  popupFullImageImage,
  popupFullImageTitle,
  popupFullImageClose,
  titleCardInput,
  linkCardInput,
  photoCard,
  openedPopup,
  popupImageSelector,
  popupImageCloseButtonSelector,
  imageSelector,
  popupImageTitleSelector,
  profileSelectors,
  popupEditOpenButton,
  nameInput,
  professionInput,
  popupEditSelector,
  popupEditCloseButtonSelector,
  popupAddOpenButton,
  popupAddSelector,
  popupAddCloseButtonSelector,
  inputErrorSelector,
  avatarImage,
  popupAvatar,
  popupAvatarButton,
  popupAvatarForm,
  popupAvatarInput,
  popupAvatarSubmitButton,
  popupAvatarCloseButton,
  popupConfirmSelector,
  popupDeleteIcon,
  userId,
  gridCardTemplateId,
  escKeyCode
}
from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    authorization: '6ff5ad92-09a5-4704-b348-99b5b96bf27b',
    'Content-Type': 'application/json'
  }
})

// Открытие попапа редактирования профиля
const userInfo = new UserInfo(profileSelectors);
popupEditOpenButton.addEventListener('click', function() {
  popupEditProfile.open();
  popupEditProfile.resetWaitSubmitButton();
  const currentInfo = userInfo.getUserInfo();
  nameInput.value = currentInfo.name;
  professionInput.value = currentInfo.profession;
});

// Обработчик формы / автоматическое заполнение формы
const formEditSubmitHandler = (data) => {
  const info = {
    name: data['name'],
    profession: data['profession']
  }
  popupEditProfile.waitSubmitButton('Сохранение...')
  api.editUserInfo(info.name, info.profession)
    .then(() => {
      userInfo.setUserInfo(info);
      popupEditProfile.close();
    }).catch(error => this.errorHandler(error))
}

// Открытие попапа добавления карточки
popupAddOpenButton.addEventListener('click', function() {
  popupAddCard.open();
  popupAddCard.resetWaitSubmitButton();
})

// Обработчик добавления карточки
const formAddSubmitHandler = () => {
  const titleCard = titleCardInput.value;
  const linkCard = linkCardInput.value;
  api.addCard(titleCard, linkCard)
    .then(dataCard=> {
      const card = createCard(dataCard);
    cardsList.prependItem(card);
    popupAddCard.close();
  }).catch(error => this.errorHandler(error));
}

// Открытие попапа изменение аватара
popupAvatarButton.addEventListener('click', function() {
  popupEditAvatar.open();
  popupEditAvatar.resetWaitSubmitButton();
});

// Обработчик формы подтверждения удаления
const formDeleteSubmitHandler = (event, card) => {
  event.preventDefault();

  popupConfirm.waitSubmitButton('Удаление...');
  api.deleteCard(card.getIdCard())
    .then(response => {
      card.deleteCard();
    }).then(() => {
      popupConfirm.close();
      popupConfirm.resetWaitSubmitButton();
    }).catch(error => this.errorHandler(error))  
} 

// Обработчик попапа изменение аватара
const formEditAvatarSubmitHandler = (event) => {
  event.preventDefault();
  avatarImage.src = popupAvatarInput.value;
  popupEditAvatar.waitSubmitButton('Сохранение...');
  api.editUserAvatar(popupAvatarInput.value)
    .then(() => {
      popupEditAvatar.close();
      popupAvatarForm.reset();
    }).catch(error => this.errorHandler(error));
}

let cardsList;

function createCard(item) {
  const card = new Card (item, userId, gridCardTemplateId, 
    {
      handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    likeCardHandler: () => {
      const likedCard = card.islikedCard();
      const resultApi = likedCard ? api.unlikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());

      resultApi.then(data => {
          card.setLikes(data.likes)
          card.renderLikes();
        }).catch(error => this.errorHandler(error));
    },
    deleteCardHandler: () => {
      popupConfirm.open(card);
    }
  }, item._id);
  return card.generateCard();
}

// Функция генерации изначальных карточек
const generateInitialCards = (cards) => {
  // console.log(cards)
  cardsList = new Section({
    items: cards,
    renderer: (item) => {
      const card = createCard(item);
      cardsList.addItem(card);
    }
  }, photoCard);
  cardsList.renderItems();
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    console.log(userData)
    generateInitialCards(cards)
    const userName = userData.name;
    const userProfession = userData.about;
    userInfo.setUserInfo({
      name: userName,
      profession: userProfession,
    });
    userInfo.setUserAvatar(userData.avatar);
  }).catch(error => this.errorHandler(error));

// Включаем валидацию формы редактрования профиля
const editFormValidator = new FormValidator(settingsForm, popupForm, inputErrorSelector);
editFormValidator.enableValidation();

// Включаем валидацию формы редактирования аватара
const avatarFormValidator = new FormValidator(settingsForm, popupAvatarForm);
avatarFormValidator.enableValidation();

// Попап редактирования аватара
const popupEditAvatar = new PopupWithSubmit(profileSelectors.profileAvatarSelector, popupAvatarCloseButton,
  formEditAvatarSubmitHandler);
popupEditAvatar.setEventListeners();

// Включаем валидацию формы добавления карточки
const addFormValidator = new FormValidator(settingsForm, popupAddForm, inputErrorSelector);
addFormValidator.enableValidation();

// Попап увеличения картинки
const popupWithImage = new PopupWithImage(popupImageSelector, popupImageCloseButtonSelector, imageSelector, popupImageTitleSelector);
popupWithImage.setEventListeners();

// Попап редактирования профиля
const popupEditProfile = new PopupWithForm(popupEditSelector, popupEditCloseButtonSelector,
  formEditSubmitHandler)
popupEditProfile.setEventListeners();

// Попап добавления карточки
const popupAddCard = new PopupWithForm(popupAddSelector, popupAddCloseButtonSelector,
  formAddSubmitHandler)
popupAddCard.setEventListeners();

// Попап подтвеждения удаления
const popupConfirm = new PopupWithSubmit(popupConfirmSelector, popupAddCloseButtonSelector,
  (evt, card) => {
    formDeleteSubmitHandler(evt, card)
  }
)
popupConfirm.setEventListeners();
