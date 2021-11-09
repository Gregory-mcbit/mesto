export default class Section {
    constructor({items, renderer}, templateSelector) {
        this._items = items
        this._renderer = renderer
        this._template = document.querySelector(templateSelector)
    }

    rendereItems() {
        this._items.forEach(item => {this._renderer(item)})
    }

    addItem(element) {
        this._template.prepend(element)
    }
}