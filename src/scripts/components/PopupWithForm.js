import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, closeButtonSelector, submitHandler) {
    super(popupSelector, closeButtonSelector,)
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSubmitButton = this._popupForm.querySelector('.popup__button-save');
    this._defaultSubmitButtonText = this._popupSubmitButton.value;
  }

  _getInputValues() {
    this._inputValues = {};
    this._popupForm.querySelectorAll('.popup__input').forEach(item => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  waitSubmitButton(waitingText) {
    this._popupSubmitButton.value = waitingText;
  }

  resetWaitSubmitButton() {
    this._popupSubmitButton.value = this._defaultSubmitButtonText;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (event) => {
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset()
    super.close()
  }

}