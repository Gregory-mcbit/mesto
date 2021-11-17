export default class Popup {
    constructor(templateSelector) {
        this._popup = document.querySelector(templateSelector)
        this._btn = this._popup.querySelector('.popup__button-close')
        this._handleEscClose = this._handleEscClose.bind(this)
        this._handleOverlayClose = this._handleOverlayClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_opened')

        document.addEventListener('keydown', this._handleEscClose)
        
        this._popup.addEventListener('click', this._handleOverlayClose)
    }
    
    close() {
        this._popup.classList.remove('popup_opened')

        this._popup.removeEventListener('click', this._handleOverlayClose)
        document.removeEventListener('keydown', this._handleEscClose)
    }

    setEventListeners() {
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