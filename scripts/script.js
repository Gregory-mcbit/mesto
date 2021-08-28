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
const buttonSaveCard = addPlacePopup.querySelector('#photo-save')

const closePhotoBtn = document.querySelector('#close')

formName.value = currentFormName.textContent
formProfession.value = currentFormProfession.textContent

addForm.addEventListener('submit', function(evt) {
  evt.preventDefault()
  
  const title = addPlacePopup.querySelector('#title').value
  const link = addPlacePopup.querySelector('#link').value
  
  renderCard(title, link)
  closePopup(addPlacePopup)
  addForm.reset()

  buttonSaveCard.setAttribute('disabled', true)
  buttonSaveCard.classList.add('popup__button-save_inactive')
})

buttonClosePopupCard.addEventListener('click', function() {
  closePopup(addPlacePopup)
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
  renderCard(item.name, item.link)
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
  photoZone.alt = evt.target.alt

  openPopup(photoPopup)
}

profileForm.addEventListener('submit', function(evt) {
  evt.preventDefault()

  currentFormName.textContent = formName.value
  currentFormProfession.textContent = formProfession.value

  closePopup(profilePopup)
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

  popup.addEventListener('click', closeByOverlay)
  document.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')

  popup.removeEventListener('click', closeByOverlay)
  document.removeEventListener('keydown', closeByEsc)
}

function renderCard(title, link) {
  const card = createCard(title, link) 
  photos.prepend(card)
}