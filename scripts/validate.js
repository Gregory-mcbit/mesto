export class FormValidator {
    constructor(data, form) {
      this._data = data
      this._form = form
    }

    enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners();
    };

    _showInputError = (inputElement, errorMessage) => {
      const errorElement = this._form.querySelector(`#${inputElement.name}-input-error`);
      inputElement.classList.add(this._data.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._data.errorClass);
  };

    _hideInputError = (inputElement) => {
      const errorElement = this._form.querySelector(`#${inputElement.name}-input-error`);
      inputElement.classList.remove(this._data.inputErrorClass);
      errorElement.classList.remove(this._data.errorClass);
      errorElement.textContent = '';
  };

    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

    _toggleButtonState = (inputList, buttonElement) => {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._data.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true)
      } else {
        buttonElement.classList.remove(this._data.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', true)
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
      const inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector));
      const button = this._form.querySelector(this._data.submitButtonSelector)

      // this._toggleButtonState(inputList, button)

      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement)

          this._toggleButtonState(inputList, button)
        })})}}