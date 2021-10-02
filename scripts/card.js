export class Card {
    constructor(title, link) {
        this._title = title
        this._link = link
    }

    _setLike(){
        this._elem.querySelector('.grid-places__like').classList.toggle('grid-places__like_active')
    }

    _scaleCard() {
        const photoZone = photoPopup.querySelector('.popup__photo')
        photoZone.src = this._link
        photoZone.alt = this._title

        openPopup(photoPopup)
    }

    _setDelete(evt){
        const parent = evt.target.parentElement
        parent.remove()
    }

    _getTemplate() {
        const cardElement = document
        .querySelector('#grid-template')
        .content
        .querySelector('.grid-places__item')
        .cloneNode(true)

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
        this._elem.querySelector('.grid-places__delete-icon').addEventListener('click', (evt) => {this._setDelete(evt)})
        this._elem.querySelector('.grid-places__like').addEventListener('click', () => {this._setLike()})
    }
}