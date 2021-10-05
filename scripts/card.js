import { openPopup } from "./utils.js"

const photoZone = document.querySelector('#scale').querySelector('.popup__photo')
const photoPopup = document.querySelector('#scale')

export class Card {
    constructor(title, link, templateSelector) {
        this._title = title
        this._link = link
        this._template = document.querySelector(templateSelector).content
    }

    _handleLike(){
        this._elem.querySelector('.grid-places__like').classList.toggle('grid-places__like_active')
    }

    _scaleCard() {
        photoZone.src = this._link
        photoZone.alt = this._title

        openPopup(photoPopup)
    }

    _handleDelete(){
        this._elem.remove()
    }

    _getTemplate() {
        const cardElement = this._template.querySelector('.grid-places__item').cloneNode(true)

        return cardElement;
    }

    generateCard() {
        this._elem = this._getTemplate()
        this._setEvLs()

        this._elem.querySelector('.grid-places__image').src = this._link
        this._elem.querySelector('.grid-places__image').alt = this._title
        this._elem.querySelector('.grid-places__title').textContent = this._title

        return this._elem
    }

    _setEvLs() {
        this._elem.querySelector('.grid-places__delete-icon').addEventListener('click', () => {this._handleDelete()})
        this._elem.querySelector('.grid-places__like').addEventListener('click', () => {this._handleLike()})
        this._elem.querySelector('.grid-places__image').addEventListener('click', () => {this._scaleCard()})
    }
}