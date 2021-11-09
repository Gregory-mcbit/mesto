import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import {initialCards, data, profileSelectors} from '../scripts/utils/utils.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import FormValidator from '../scripts/components/Validate.js'

const openProfileBtn = document.querySelector('.profile__btn-image')
const openAddPhotoBtn = document.querySelector('.profile__add-btn')

const nameInput = document.querySelector('#name')
const professioInput = document.querySelector('#profession')

const userInfo = new UserInfo(profileSelectors)

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

const addPlacePopup = new PopupWithForm('#photo', formCardSubmitHandler)
const profilePopup = new PopupWithForm('#profile', formProfileSubmitHandler)
addPlacePopup.setEventListeners()
profilePopup.setEventListeners()

const templateSelector = '#grid-template'
const photoTemplate = '.grid-places'
const photoPopup = '#scale'

const popupWithImage = new PopupWithImage(photoPopup)
popupWithImage.setEventListeners()

const profileForm = document.forms.profileForm
const addForm = document.forms.addPlaceForm


const profileFormValidator = new FormValidator(data, profileForm)
profileFormValidator.enableValidation()

const cardFormValidator = new FormValidator(data, addForm)
cardFormValidator.enableValidation()


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const elem = new Card(
      item.name,
      item.link,
      templateSelector,
      {
        handleScale: (name, link) => {
        popupWithImage.open(name, link)
      }}
    )
    const elemTotal = elem.generateCard()
    cardList.addItem(elemTotal)
  }
}, photoTemplate)

cardList.rendereItems()

function createCard(item) {
  const card = new Card (item.name, item.link, templateSelector, 
    {
      handleScale: (name, link) => {
      popupWithImage.open(name, link)
    }})
  return card.generateCard()
}

function openPopupProfile() {
  const {name, profession} = userInfo.getUserInfo()
  nameInput.value = name
  professioInput.value = profession
  profileFormValidator.toggleButtonState()

  profilePopup.open()
}

function openPopupAddPlace() {
  cardFormValidator.toggleButtonState()

  addPlacePopup.open()
}

openProfileBtn.addEventListener('click', openPopupProfile)
openAddPhotoBtn.addEventListener('click', openPopupAddPlace)

// addForm.addEventListener('submit', function(evt) {
//     evt.preventDefault()
    
//     // const title = addPlacePopup.querySelector('#title').value
//     // const link = addPlacePopup.querySelector('#link').value
//     // console.log(addForm)

//     createCard({name: title, link: link})
//     addPlacePopup.close()
// })

// profileForm.addEventListener('submit', function(evt) {
//     evt.preventDefault()

//     // const {name, profession} = userInfo.getUserInfo()
  
//     currentName.textContent = name
//     currentProfession.textContent = profession
  
//     profilePopup.close()
// })
