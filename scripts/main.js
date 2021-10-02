import {Card} from './card.js'
import {FormValidator} from './validate.js'
import {initialCards} from './initial-cards.js'

const photos = document.querySelector('.grid-places')
const addPlacePopup = document.querySelector('#photo')
const profilePopup = document.querySelector('#profile')
const openProfileBtn = document.querySelector('.profile__btn-image')
const openAddPhotoBtn = document.querySelector('.profile__add-btn')
const photoPopup = document.querySelector('#scale')

const formName = document.querySelector('#name')
const formProfession = document.querySelector('#profession')
const currentFormName = document.querySelector('.profile__name')
const currentFormProfession = document.querySelector('.profile__information')
const profileForm = document.forms.profileForm
const closeProfileBtn = document.querySelector('#profile-close')

const addForm = document.forms.addPlaceForm
const buttonClosePopupCard = addPlacePopup.querySelector('#photo-close')
const buttonSaveCard = addPlacePopup.querySelector('#photo-save')

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

formName.value = currentFormName.textContent
formProfession.value = currentFormProfession.textContent

const form = new FormValidator(data, profileForm)
form.enableValidation()

const form2 = new FormValidator(data, addForm)
form2.enableValidation()

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
  
    buttonSaveCard.setAttribute('disabled', true)
    buttonSaveCard.classList.add('popup__button-save_inactive')
})

profileForm.addEventListener('submit', function(evt) {
    evt.preventDefault()
  
    currentFormName.textContent = formName.value
    currentFormProfession.textContent = formProfession.value
  
    closePopup(profilePopup)
})

function openPopupProfile() {
    formName.value = currentFormName.textContent
    formProfession.value = currentFormProfession.textContent
  
    openPopup(profilePopup)
  }
  
  function openPopupAddPlace() {
    openPopup(addPlacePopup)
  }



initialCards.forEach(element => {
    createCard(element.name, element.link)
});

function createCard(name, link) {
    const card = new Card(name, link)
    const cardElem = card.generateCard()
    cardElem.querySelector('.grid-places__image').addEventListener('click', (evt) => {showPhoto(evt)})

    photos.prepend(cardElem)
}

function showPhoto(evt) {
    const photo = evt.target.src
    const photoZone = document.querySelector('#scale').querySelector('.popup__photo')
    photoZone.src = photo
    photoZone.alt = evt.target.alt
  
    openPopup(document.querySelector('#scale'))
  }

function openPopup(popup) {
    popup.classList.add('popup_opened')
  
    popup.addEventListener('click', closeByOverlay)
    document.addEventListener('keydown', closeByEsc)
  }
  
function closePopup(popup) {
    popup.classList.remove('popup_opened')
  
    popup.removeEventListener('click', closeByOverlay)
    document.removeEventListener('keydown', closeByEsc)
  }