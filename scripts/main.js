import {Card} from './Card.js'
import {FormValidator} from './Validate.js'
import {initialCards} from './initial-cards.js'
import {openPopup, closePopup} from './utils.js'

const photos = document.querySelector('.grid-places')
const addPlacePopup = document.querySelector('#photo')
const profilePopup = document.querySelector('#profile')
const openProfileBtn = document.querySelector('.profile__btn-image')
const openAddPhotoBtn = document.querySelector('.profile__add-btn')
const photoPopup = document.querySelector('#scale')

const templateSelector = '#grid-template'

const nameInput = document.querySelector('#name')
const professioInput = document.querySelector('#profession')
const currentName = document.querySelector('.profile__name')
const currentProfession = document.querySelector('.profile__information')
const profileForm = document.forms.profileForm
const closeProfileBtn = document.querySelector('#profile-close')

const addForm = document.forms.addPlaceForm
const buttonClosePopupCard = addPlacePopup.querySelector('#photo-close')

const closePhotoBtn = document.querySelector('#close')
closePhotoBtn.addEventListener('click', function() {
    closePopup(photoPopup)
  })

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
    profileFormValidator.toggleButtonState()
  
    openPopup(profilePopup)
  }
  
function openPopupAddPlace() {
    cardFormValidator.toggleButtonState()

    openPopup(addPlacePopup)
}



initialCards.forEach(element => {
    createCard(element.name, element.link)
});

function createCard(name, link) {
    const card = new Card(name, link, templateSelector)
    const cardElem = card.generateCard()

    photos.prepend(cardElem)
}