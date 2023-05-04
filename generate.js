import {firstNames, lastNames} from "./database.js";

export function generateInteger(settings){
    let min = parseInt(settings[0])
    let max = parseInt(settings[1])
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function generateDecimal(settings){
    let min = parseFloat(settings[0]);
    let max = parseFloat(settings[1]);
    let decimal = Math.random() * (max - min) + min;
    return decimal.toFixed(2);
}
export function generateFirstName(settings){
    return firstNames[Math.floor(Math.random() * firstNames.length)];
}
export function generateLastName(settings){
    return lastNames[Math.floor(Math.random() * lastNames.length)];
}
export function generateChoice(settings){
    settings = settings[0].split(',');
    return settings[Math.floor(Math.random() * settings.length)];
}
export function generateDate(settings){
    let start = Date.parse(settings[0]);
    let end = Date.parse(settings[1]) + 86400000;
    let randomDate = new Date(start + Math.random() * (end - start));
    return randomDate.toISOString().split('T')[0];
}

