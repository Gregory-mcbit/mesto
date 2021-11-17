import Popup from "../components/Popup.js"

export default class PopupWithImage extends Popup {
    constructor(templateSelector, photoZone) {
        super(templateSelector)
        this._photoZone = photoZone
    }

    open(name, link) {
        this._photoZone.alt = name
        this._photoZone.src = link

        super.open()
    }
}