import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submitHandler}) {
        super(popupSelector)
        this._submitHandler = submitHandler
        this._popupForm = this._popup.querySelector('.popup__form')
        this._saveBtn = this._popup.querySelector('.popup__button-save')
    }

    _getInputValues() {
        this._inputValues = {};
        this._popupForm.querySelectorAll('.popup__input').forEach(item => {
          this._inputValues[item.name] = item.value;
        });

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', () => {
          this._submitHandler(this._getInputValues());
        });
    }
    
    close() {
        this._popupForm.reset()
        super.close()
    }
}