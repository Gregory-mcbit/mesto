export class Card {
    constructor(title, link, template) {
        this._title = title
        this._link = link
        this._template = template
    }

    _handleLike(){
        this._elem.querySelector('.grid-places__like').classList.toggle('grid-places__like_active')
    }

    _scaleCard() {
        const photoZone = photoPopup.querySelector('.popup__photo')
        photoZone.src = this._link
        photoZone.alt = this._title

        openPopup(photoPopup)
    }

    _handleDelete(){
        this._elem.remove()
    }

    _getTemplate() {
        const cardElement = this._template.cloneNode(true)

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

    _showPhoto() {
        const photo = this._elem.querySelector('.grid-places__image').src
        const photoZone = document.querySelector('#scale').querySelector('.popup__photo')
        photoZone.src = photo
        photoZone.alt = this._elem.querySelector('.grid-places__image').alt
      
        const popup = document.querySelector('#scale')
        popup.classList.add('popup_opened')
    }

    _setEvLs() {
        this._elem.querySelector('.grid-places__delete-icon').addEventListener('click', () => {this._handleDelete()})
        this._elem.querySelector('.grid-places__like').addEventListener('click', () => {this._handleLike()})
        this._elem.querySelector('.grid-places__image').addEventListener('click', () => {this._showPhoto()})
    }
}