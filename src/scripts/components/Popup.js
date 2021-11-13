export default class Popup {
    constructor(templateSelector) {
        this._popup = document.querySelector(templateSelector)
        this._btn = this._popup.querySelector('.popup__button-close')
    }

    open() {
        this._popup.classList.add('popup_opened')
    }
    
    close() {
        this._popup.classList.remove('popup_opened')

        this._popup.removeEventListener('click', (evt) => {this._handleOverlayClose(evt)})
        document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)})
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {this._handleOverlayClose(evt)})
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)})
        this._btn.addEventListener('click', () => {this.close()})
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close()
          }
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close()
        }
    }
  }