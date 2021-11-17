import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import {initialCards} from '../scripts/initial-cards'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import FormValidator from '../scripts/components/FormValidator.js'
import {data, profileSelectors, openProfileBtn, openAddPhotoBtn, nameInput, professioInput, templateSelector, photoTemplate, photoPopup, profileForm, addForm, photoZone} from '../scripts/utils/constants.js'
import './index.css'
import addButton from '../images/Add\ Button.svg'
import profileButton from '../images/Edit\ Button.svg'

document.querySelector('.profile__add-btn').style.backgroundImage=`url(${addButton})`
document.querySelector('.profile__btn-image').style.backgroundImage=`url(${profileButton})`

const userInfo = new UserInfo(profileSelectors)

const addPlacePopup = new PopupWithForm('#photo', formCardSubmitHandler)
const profilePopup = new PopupWithForm('#profile', formProfileSubmitHandler)

const popupWithImage = new PopupWithImage(photoPopup, photoZone)

const profileFormValidator = new FormValidator(data, profileForm)

const cardFormValidator = new FormValidator(data, addForm)

const createCard = (item) => {
  const card = new Card (item.name, item.link, templateSelector, 
    {
      handleScale: (name, link) => {
      popupWithImage.open(name, link)
    }})
  return card.generateCard()
}

const formProfileSubmitHandler = (data) => {
  const info = {
    name: data['name'],
    profession: data['info']
  }

  userInfo.setUserInfo(info)

  profilePopup.close()
}

const formCardSubmitHandler = (data) => {
  const info = {
    name: data['place'],
    link: data['url']
  }

  const card = createCard(info)
  cardList.addItem(card)

  addPlacePopup.close()
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    cardList.addItem(card)
  }
}, photoTemplate)

cardList.rendereItems()

addPlacePopup.setEventListeners()
profilePopup.setEventListeners()

popupWithImage.setEventListeners()

profileFormValidator.enableValidation()

cardFormValidator.enableValidation()

const openPopupProfile = () => {
  const {name, profession} = userInfo.getUserInfo()
  nameInput.value = name
  professioInput.value = profession
  profileFormValidator.toggleButtonState()

  profilePopup.open()
}

const openPopupAddPlace = () => {
  cardFormValidator.toggleButtonState()

  addPlacePopup.open()
}

openProfileBtn.addEventListener('click', openPopupProfile)
openAddPhotoBtn.addEventListener('click', openPopupAddPlace)