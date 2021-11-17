const data = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
}

const photoZone = document.querySelector('#scale').querySelector('.popup__photo')

const profileSelectors = {
  name: '.profile__name',
  profession: '.profile__information'
}

const openProfileBtn = document.querySelector('.profile__btn-image')
const openAddPhotoBtn = document.querySelector('.profile__add-btn')

const nameInput = document.querySelector('#name')
const professioInput = document.querySelector('#profession')

const templateSelector = '#grid-template'
const photoTemplate = '.grid-places'
const photoPopup = '#scale'

const profileForm = document.forms.profileForm
const addForm = document.forms.addPlaceForm

export {data, profileSelectors, openProfileBtn, openAddPhotoBtn, nameInput, professioInput, templateSelector, photoTemplate, photoPopup, profileForm, addForm, photoZone}