const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};


const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    })
  };


const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true)
    }
  };


const isValid = (formElement, inputElement, {...rest}) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
      hideInputError(formElement, inputElement, rest);
    }
};


const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const button = formElement.querySelector(submitButtonSelector)

    toggleButtonState(inputList, button, rest)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, rest)

        toggleButtonState(inputList, button, rest)
      });
    });
  };


const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      setEventListeners(formElement, rest);
    });
};


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
  });