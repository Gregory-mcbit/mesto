import Popup from "./Popup.js"

const photoZone = document.querySelector('#scale').querySelector('.popup__photo')

export default class PopupWithImage extends Popup {
    constructor(templateSelector) {
        super(templateSelector)
        super.setEventListeners()
    }

    open(name, link) {
        photoZone.alt = name
        photoZone.src = link

        super.open()
    }
}