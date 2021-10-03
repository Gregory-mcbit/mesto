import {Card} from './card.js'
import {FormValidator} from './validate.js'
import {initialCards} from './initial-cards.js'

const photos = document.querySelector('.grid-places')
const addPlacePopup = document.querySelector('#photo')
const profilePopup = document.querySelector('#profile')
const openProfileBtn = document.querySelector('.profile__btn-image')
const openAddPhotoBtn = document.querySelector('.profile__add-btn')
const photoPopup = document.querySelector('#scale')

const nameInput = document.querySelector('#name')
const professioInput = document.querySelector('#profession')
const currentName = document.querySelector('.profile__name')
const currentProfession = document.querySelector('.profile__information')
const profileForm = document.forms.profileForm
const closeProfileBtn = document.querySelector('#profile-close')

const addForm = document.forms.addPlaceForm
const buttonClosePopupCard = addPlacePopup.querySelector('#photo-close')
const buttonSaveNameInput = profilePopup.querySelector('#saveProfile')

const cardTemplate = document.querySelector('#grid-template').content.querySelector('.grid-places__item')

const closePhotoBtn = document.querySelector('#close')
closePhotoBtn.addEventListener('click', function() {
    closePopup(photoPopup)
  })
const closeByOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target)
    }
  }
const closeByEsc = (evt) => {
    if (evt.key === "Escape") {
      closePopup(document.querySelector('.popup_opened'))
    }
  }

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

document.addEventListener('click', closeByOverlay)
document.addEventListener('keydown', closeByEsc)

openProfileBtn.addEventListener('click', openPopupProfile)
openAddPhotoBtn.addEventListener('click', openPopupAddPlace)

buttonClosePopupCard.addEventListener('click', function() {
    closePopup(addPlacePopup)
  })
  
closeProfileBtn.addEventListener('click', function() {
    closePopup(profilePopup)
  })

addForm.addEventListener('submit', function(evt) {
    evt.preventDefault()
    
    const title = addPlacePopup.querySelector('#title').value
    const link = addPlacePopup.querySelector('#link').value
    
    createCard(title, link)
    closePopup(addPlacePopup)
    addForm.reset()
})

profileForm.addEventListener('submit', function(evt) {
    evt.preventDefault()
  
    currentName.textContent = nameInput.value
    currentProfession.textContent = professioInput.value
  
    closePopup(profilePopup)
})

function openPopupProfile() {
    nameInput.value = currentName.textContent
    professioInput.value = currentProfession.textContent
    profileFormValidator.toggleButtonState([nameInput, professioInput], buttonSaveNameInput)
  
    openPopup(profilePopup)
  }
  
function openPopupAddPlace() {
    openPopup(addPlacePopup)
}



initialCards.forEach(element => {
    createCard(element.name, element.link)
});

function createCard(name, link) {
    const card = new Card(name, link, cardTemplate)
    const cardElem = card.generateCard()

    photos.prepend(cardElem)
}

function openPopup(popup) {
    popup.classList.add('popup_opened')
  }
  
function closePopup(popup) {
    popup.classList.remove('popup_opened')
  }