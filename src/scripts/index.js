import {initialCards} from './initial-cards.js'
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/Validate.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'

const photos = document.querySelector('.grid-places')
const photoTemplate = '.grid-places'
const addPlacePopup = new Popup('#photo')
const profilePopup = new Popup('#profile')
addPlacePopup.setEventListeners()
profilePopup.setEventListeners()
const openProfileBtn = document.querySelector('.profile__btn-image')
const openAddPhotoBtn = document.querySelector('.profile__add-btn')
const photoPopup = new PopupWithImage('#scale')
photoPopup.setEventListeners()

const templateSelector = '#grid-template'

const nameInput = document.querySelector('#name')
const professioInput = document.querySelector('#profession')
const currentName = document.querySelector('.profile__name')
const currentProfession = document.querySelector('.profile__information')
const profileForm = document.forms.profileForm
const closeProfileBtn = document.querySelector('#profile-close')

const addForm = document.forms.addPlaceForm
const buttonClosePopupCard = document.querySelector('#photo-close')

const data = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
}

const profileFormValidator = new FormValidator(data, profileForm)
profileFormValidator.enableValidation()

const cardFormValidator = new FormValidator(data, addForm)
cardFormValidator.enableValidation()

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const elem = new Card(
      item.name,
      item.link,
      templateSelector,
      {
        handleOpenImage: (name, link) => {photoPopup.open(name, link)}
      })

    const elemTotal = elem.generateCard()

    cardsList.addItem(elemTotal)
  }},
  photoTemplate)

cardsList.renderer()

openProfileBtn.addEventListener('click', openPopupProfile)
openAddPhotoBtn.addEventListener('click', openPopupAddPlace)

function openPopupProfile() {
  nameInput.value = currentName.textContent
  professioInput.value = currentProfession.textContent
  profileFormValidator.toggleButtonState()

  profilePopup.open()
}

function openPopupAddPlace() {
  cardFormValidator.toggleButtonState()

  addPlacePopup.open()
}

function createCard() {

}

// addForm.addEventListener('submit', function(evt) {
//     evt.preventDefault()
    
//     const title = addPlacePopup.querySelector('#title').value
//     const link = addPlacePopup.querySelector('#link').value
    
//     const card = new Card(title, link, templateSelector)
//     const cardElem = card.generateCard()

//     photos.prepend(cardElem)

//     closePopup(addPlacePopup)
//     addForm.reset()
// })

// profileForm.addEventListener('submit', function(evt) {
//     evt.preventDefault()
  
//     currentName.textContent = nameInput.value
//     currentProfession.textContent = professioInput.value
  
//     closePopup(profilePopup)
// })