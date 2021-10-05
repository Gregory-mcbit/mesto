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

export {openPopup, closePopup}