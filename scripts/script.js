let likes = document.querySelectorAll('.grid-places__like')

for (let i=0; i<=likes.length - 1; i+=1) {
    let like = likes[i]
    like.addEventListener('click', function () {
        like.classList.toggle('grid-places__like_active')
    })
}

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

let popup = document.querySelector('.popup')

// open popup
let popupOpenBtn = document.querySelector('.profile__btn-image')
popupOpenBtn.addEventListener('click', openPopup)

// close popup
let popupCloseBtn = document.querySelector('.popup__button-close')
popupCloseBtn.addEventListener('click', closePopup)

// form inputs
let formName = document.querySelector('#name')
let formProfession = document.querySelector('#profession')
let currentFormName = document.querySelector('.profile__name')
let currentFormProfession = document.querySelector('.profile__information')

let formSaveBtn = document.querySelector('.popup__button-save')
formSaveBtn.addEventListener('click', formSaving)