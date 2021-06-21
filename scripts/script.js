// initial adding
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const photoZoneTemplate = document.querySelector('#grid-template').content
const photos = document.querySelector('.grid-places')

initialCards.forEach(function (item) {
    const photoZone = photoZoneTemplate.querySelector('.grid-places__item').cloneNode(true);

    const placeName = item.name
    const placeLink = item.link
    const like = photoZone.querySelector('.grid-places__like')
    like.addEventListener('click', function () {like.classList.toggle('grid-places__like_active')})

    photoZone.querySelector('.grid-places__image').src = placeLink
    photoZone.querySelector('.grid-places__image').alt = placeName
    photoZone.querySelector('.grid-places__title').textContent = placeName

    photoZone.querySelector('.grid-places__image').addEventListener('click', photoPopupOpen)

    photos.append(photoZone)
})

// function to add new card
function addCard(name, link) {
    const photoZone = photoZoneTemplate.querySelector('.grid-places__item').cloneNode(true);

    const like = photoZone.querySelector('.grid-places__like')
    like.addEventListener('click', function () {like.classList.toggle('grid-places__like_active')})
    const deleteBtn = photoZone.querySelector('.grid-places__delete-icon')
    deleteBtn.addEventListener('click', function(evt) {
      const parent = evt.target.parentElement
      parent.remove()
    })

    photoZone.querySelector('.grid-places__image').src = link
    photoZone.querySelector('.grid-places__image').alt = name
    photoZone.querySelector('.grid-places__title').textContent = name

    photos.prepend(photoZone)
}

// open photo-popup
function openPhotoPopup() {
  const popup = document.querySelector('#photo')
  popup.classList.add('popup_opened')

  document.querySelector('#title').value = ''
  document.querySelector('#link').value = ''
}

// close photo-popup
function closePhotoPopup() {
  const popup = document.querySelector('#photo')
  popup.classList.remove('popup_opened')
}

// save photo
function savePhoto(evt) {
  evt.preventDefault()

  const title = document.querySelector('#title').value
  const link = document.querySelector('#link').value

  addCard(title, link)
  closePhotoPopup()
}

const addBtn = document.querySelector('.profile__add-btn')
addBtn.addEventListener('click', openPhotoPopup)
const closeBtn = document.querySelector('#photo-close')
closeBtn.addEventListener('click', closePhotoPopup)
const saveBtn = document.querySelector('#photo-save')
saveBtn.addEventListener('click', savePhoto)

// delete photo
const deleteBtnList = document.querySelectorAll('.grid-places__delete-icon')
deleteBtnList.forEach(function (btn) {
  btn.addEventListener('click', function(evt) {
    const parent = evt.target.parentElement
    parent.remove()
  })
})

// popup_functions
function openPopup() {
    popup.classList.add('popup_opened')

    // filling forms with current values
    formName.value = currentFormName.textContent
    formProfession.value = currentFormProfession.textContent
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

function formSaving(evt) {
    evt.preventDefault()

    currentFormName.textContent = formName.value
    currentFormProfession.textContent = formProfession.value

    closePopup()
}

const popup = document.querySelector('.popup')

// open popup
const popupOpenBtn = document.querySelector('.profile__btn-image')
popupOpenBtn.addEventListener('click', openPopup)

// close popup
const popupCloseBtn = document.querySelector('.popup__button-close')
popupCloseBtn.addEventListener('click', closePopup)

// form inputs
const formName = document.querySelector('#name')
const formProfession = document.querySelector('#profession')
const currentFormName = document.querySelector('.profile__name')
const currentFormProfession = document.querySelector('.profile__information')

const formSaveBtn = document.querySelector('.popup__button-save')
formSaveBtn.addEventListener('click', formSaving)

//photo popup
const photoPopup = document.querySelector('#scale')
const popupBtnClose = photoPopup.querySelector('#close')
popupBtnClose.addEventListener('click', photoPopupClose)

function photoPopupClose() {
  photoPopup.classList.remove('popup_opened')
}

function photoPopupOpen(evt) {
  photoPopup.classList.add('popup_opened')
  const photo = evt.target.src
  const photoZone = photoPopup.querySelector('.popup__photo')
  photoZone.src = photo
}