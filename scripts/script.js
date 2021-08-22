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
const photoPopup = document.querySelector('#scale')
const addPlacePopup = document.querySelector('#photo')
const profilePopup = document.querySelector('#profile')
const openProfileBtn = document.querySelector('.profile__btn-image')
const openAddPhotoBtn = document.querySelector('.profile__add-btn')

const formName = document.querySelector('#name')
const formProfession = document.querySelector('#profession')
const currentFormName = document.querySelector('.profile__name')
const currentFormProfession = document.querySelector('.profile__information')
const profileForm = document.forms.profileForm
const closeProfileBtn = document.querySelector('#profile-close')

const addForm = document.forms.addPlaceForm
const buttonClosePopupCard = addPlacePopup.querySelector('#photo-close')

const closePhotoBtn = document.querySelector('#close')

formName.value = currentFormName.textContent
formProfession.value = currentFormProfession.textContent

addForm.addEventListener('submit', function(evt) {
  evt.preventDefault()
  
  const title = addPlacePopup.querySelector('#title').value
  const link = addPlacePopup.querySelector('#link').value
  
  const card = createCard(title, link)
  photos.prepend(card)
  closePopup(addPlacePopup)
  document.forms.addPlaceForm.reset()
})

buttonClosePopupCard.addEventListener('click', function() {
  closePopup(addPlacePopup)
    
  document.forms.addPlaceForm.reset()
})

closePhotoBtn.addEventListener('click', function() {
  closePopup(photoPopup)
})

closeProfileBtn.addEventListener('click', function() {
  closePopup(profilePopup)
})

openProfileBtn.addEventListener('click', openPopupProfile)
openAddPhotoBtn.addEventListener('click', openPopupAddPlace)

initialCards.forEach(item => {
  const newCard = createCard(item.name, item.link)
  photos.append(newCard)
})

// function to add new card
function createCard(name, link) {
  const photoZone = photoZoneTemplate.querySelector('.grid-places__item').cloneNode(true);

  const like = photoZone.querySelector('.grid-places__like')
  like.addEventListener('click', function () {like.classList.toggle('grid-places__like_active')})

  const deleteBtn = photoZone.querySelector('.grid-places__delete-icon')
  deleteBtn.addEventListener('click', function(evt) {
    const parent = evt.target.parentElement
    parent.remove()
  })

  photoZone.querySelector('.grid-places__image').addEventListener('click', showPhoto)

  photoZone.querySelector('.grid-places__image').src = link
  photoZone.querySelector('.grid-places__image').alt = name
  photoZone.querySelector('.grid-places__title').textContent = name

  return photoZone
}

function showPhoto(evt) {
  const photo = evt.target.src
  const photoZone = photoPopup.querySelector('.popup__photo')
  photoZone.src = photo

  openPopup(photoPopup)
}

profileForm.addEventListener('submit', function(evt) {
  evt.preventDefault()

  currentFormName.textContent = formName.value
  currentFormProfession.textContent = formProfession.value

  closePopup(profilePopup)
})

const closeByOverlay = (evt) => {
  if (evt.target.classList[0] === 'popup') {
    closePopup(closeByOverlay.popup)
  }
}

const closeByEsc = (evt) => {
  if (evt.keyCode === 27) {
    closePopup(closeByEsc.popup)
  }
}

function openPopupProfile() {
  formName.value = currentFormName.textContent
  formProfession.value = currentFormProfession.textContent

  openPopup(profilePopup)
}

function openPopupAddPlace() {
  openPopup(addPlacePopup)
}
  
function openPopup(popup) {
  popup.classList.add('popup_opened')

  closeByOverlay.popup = popup
  closeByEsc.popup = popup

  popup.addEventListener('click', closeByOverlay)
  popup.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')

  popup.removeEventListener('click', closeByOverlay)
  popup.removeEventListener('keydown', closeByEsc)
}