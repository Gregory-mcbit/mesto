let likes = document.querySelectorAll('.grid-like')

for (let i=0; i<=likes.length - 1; i+=1) {
    let like = likes[i]
    like.addEventListener('click', function () {
        like.classList.toggle('grid-like_active')
    })
}

// popup_functions
function open_popup() {
    let popup = document.querySelector('.popup')
    popup.classList.add('popup_opened')

    // filling forms with current values
    form_name.value = current_form_name.textContent
    form_profession.value = current_form_profession.textContent
}

function close_popup() {
    let popup = document.querySelector('.popup')
    popup.classList.remove('popup_opened')
}

function form_saving(evt) {
    evt.preventDefault()

    current_form_name.textContent = form_name.value
    current_form_profession.textContent = form_profession.value

    close_popup()
}

// open popup
let popup_open_btn = document.querySelector('.profile__btn-image')
popup_open_btn.addEventListener('click', open_popup)

// close popup
let popup_close_btn = document.querySelector('.popup__button-close')
popup_close_btn.addEventListener('click', close_popup)

// form inputs
let form_name = document.querySelector('#name')
let form_profession = document.querySelector('#profession')
let current_form_name = document.querySelector('.profile__name')
let current_form_profession = document.querySelector('.profile__information')

let form_save_btn = document.querySelector('.popup__button-save')
form_save_btn.addEventListener('click', form_saving)