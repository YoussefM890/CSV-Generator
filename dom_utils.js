import * as enums from './enums.js';

export function myCreateElement(tag,id, classList = [] ) {
    const element = document.createElement(tag);
    element.id = id;
    element.classList.add(...classList);
    return element;
}

export function createInputField(id, name, type , defaultValue ,inputClass = [""], required = false) {
    const input = document.createElement(enums.tag.input);
    input.setAttribute(enums.field.id, id);
    input.setAttribute(enums.field.type, type);
    input.setAttribute(enums.field.name, name);
    input.setAttribute(enums.field.placeholder, name);
    input.required = required;
    input.classList.add(...inputClass);
    input.value = defaultValue;
    return input;
}
export function createSelectField(name, id , classList = []) {
    const select = document.createElement(enums.tag.select);
    select.setAttribute(enums.field.name, name);
    select.setAttribute(enums.field.id, id);
    select.classList.add(...classList);
    for (let key in enums.dataType) {
        const option = document.createElement(enums.tag.option);
        option.setAttribute(enums.field.value, enums.dataType[key]);
        option.innerText = enums.dataType[key];
        select.appendChild(option);
    }
    return select;

}

export function myAddEventListener(id, type, func) {
    document.getElementById(id).addEventListener(type, func);
}
