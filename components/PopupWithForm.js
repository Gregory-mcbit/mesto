class PopupWithForm extends Popup {
    constructor(templateSelector) {
        this._template = templateSelector
        super(this.setEventListeners, this.close)
    }

    _getInputValues() {}

    setEventListeners() {}

    close() {}
}