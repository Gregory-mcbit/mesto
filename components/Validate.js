export class FormValidator {
    constructor(config, form) {
      this._formSelector = config.formSelector
      this._inputSelector = config.inputSelector
      this._submitButtonSelector = config.submitButtonSelector
      this._inactiveButtonClass = config.inactiveButtonClass
      this._inputErrorClass = config.inputErrorClass
      this._errorClass = config.errorClass
      this._form = form
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
      this._button = this._form.querySelector(this._submitButtonSelector)
    }

    enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners();
    };

    _showInputError = (inputElement, errorMessage) => {
      const errorElement = this._form.querySelector(`#${inputElement.name}-input-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  };

    _hideInputError = (inputElement) => {
      const errorElement = this._form.querySelector(`#${inputElement.name}-input-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  };

    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

    toggleButtonState = () => {
      if (this._hasInvalidInput(this._inputList)) {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', true)
      } else {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled', true)
      }
    };

    _isValid = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
  };

    _setEventListeners = () => {
      this.toggleButtonState()

      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement)

          this.toggleButtonState()
        })})}}