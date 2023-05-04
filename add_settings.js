import {createInputField} from "./dom_utils.js";
import * as enums from "./enums.js";

export function addIntegerSettings(settings) {
    settings.appendChild(createInputField("", "min",enums.inputType.number,0, ["table-data","min","flex-fill","field"], true));
    settings.appendChild(createInputField("", "max",enums.inputType.number,100,["table-data","max","flex-fill","field"], true));
}
export function addDecimalSettings(settings) {
    addIntegerSettings(settings);
}
export function addIndexSettings(settings){
    let index = createInputField("", "starting value", enums.inputType.number,0, ["table-data","index","flex-fill","field"], true);
    settings.appendChild(index);
}
export function addFirstNameSettings(settings){}
export function addLastNameSettings(settings){}
export function addChoiceSettings(settings){
    settings.appendChild(createInputField("", "comma seperated data", enums.inputType.text,"comma,seperated,data", ["table-data","choices","flex-fill","field"], true));
}
export function addDateSettings(settings){
    settings.appendChild(createInputField("", "Start Date",enums.inputType.date,"", ["table-data","min","flex-fill","field"], true));
    settings.appendChild(createInputField("", "End Date",enums.inputType.date,"", ["table-data","max","flex-fill","field"], true));
}
