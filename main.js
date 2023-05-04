import {createInputField, createSelectField, myAddEventListener, myCreateElement} from "./dom_utils.js";
import {
    addChoiceSettings, addDateSettings,
    addDecimalSettings,
    addFirstNameSettings,
    addIndexSettings,
    addIntegerSettings,
    addLastNameSettings
} from "./add_settings.js";
import {
    generateChoice,
    generateDate,
    generateDecimal,
    generateFirstName,
    generateInteger,
    generateLastName
} from "./generate.js";
import * as enums from './enums.js';


let addMethodePerType = initMethodPerType();
const generateMethodePerType = initGenerateMethodPerType();
let index = 0;
let counter = -1;
myAddEventListener("add-column-button", enums.event.click, () => addRow());
myAddEventListener("generate", enums.event.click ,() => generate());
function initMethodPerType() {
    let methodePerType = new Map()
    methodePerType[enums.dataType.integer] = (id) => {
        addIntegerSettings(id)
    }
    methodePerType[enums.dataType.decimal] = (id) => {
        addDecimalSettings(id)
    }
    methodePerType[enums.dataType.index] = (id) => {
        addIndexSettings(id)
    }
    methodePerType[enums.dataType.firstName] = (id) => {
        addFirstNameSettings(id)
    }
    methodePerType[enums.dataType.lastName] = (id) => {
        addLastNameSettings(id)
    }
    methodePerType[enums.dataType.choice] = (id) => {
        addChoiceSettings(id)
    }
    methodePerType[enums.dataType.date] = (id) => {
        addDateSettings(id)
    }
    return methodePerType
}
function initGenerateMethodPerType() {
    let methodePerType = new Map()
    methodePerType[enums.dataType.integer] = (settings) => {
        return generateInteger(settings)
    }
    methodePerType[enums.dataType.decimal] = (settings) => {
        return generateDecimal(settings)
    }
    methodePerType[enums.dataType.index] = (settings) => {
        counter++;
        return parseInt(settings)+counter;
    }
    methodePerType[enums.dataType.firstName] = (settings) => {
        return generateFirstName()
    }
    methodePerType[enums.dataType.lastName] = (settings) => {
        return generateLastName()
    }
    methodePerType[enums.dataType.choice] = (settings) => {
        return generateChoice(settings)
    }
    methodePerType[enums.dataType.date] = (settings) => {
        return generateDate(settings)
    }
    return methodePerType
}

function executeAddMethodePerType(type,id) {
    const parent = document.getElementById("tr-"+id);
    const settings = parent.getElementsByClassName("settings-container")[0];
    settings.innerHTML = "";
    addMethodePerType[type](settings);
}



function removeAllSettings(parent) {
    parent.getElementsByClassName("settings")[0].innerHTML = "";
}


function addRow() {
    const parent = document.getElementById("table");
    const row = myCreateElement(enums.tag.tr,'tr-'+index);

    const move = myCreateElement(enums.tag.td,'');
    const name = myCreateElement(enums.tag.td,'');
    const type = myCreateElement(enums.tag.td,'');
    const settings = myCreateElement(enums.tag.td,'settings-'+index, ["settings"]);
    const chance = myCreateElement(enums.tag.td,'chance-'+index, ["chance"]);

    const select = createSelectField("select", "select-"+index, ["table-data","type"]);
    const chanceInput = createInputField("", "chance", enums.inputType.number,0, ["table-data","empty-chance"], true);


    select.addEventListener(enums.event.change, (e) => executeAddMethodePerType(select.value, e.target.id.split("-")[1]));

    name.appendChild(createInputField("name-"+index, "name", enums.inputType.text,"name"+index, ["table-data","name"], true));
    type.appendChild(select);
    settings.appendChild(myCreateElement(enums.tag.div,'',["settings-container" ,"d-flex","table-data"]));
    chance.appendChild(chanceInput);

    row.appendChild(move);
    row.appendChild(name);
    row.appendChild(type);
    row.appendChild(settings);
    row.appendChild(chance);

    parent.appendChild(row);

    executeAddMethodePerType(select.value, index);
    index++;
}

function generate() {
    const parent = document.getElementById("table");
    const columns = parent.getElementsByTagName("tr");
    const numberOfRows = document.getElementById("number-of-rows").value;
    let row
    let data = [Array.from(columns).map(column => column.getElementsByClassName("name")[0].value)];
    for (let j = 0; j < numberOfRows; j++) {
        row = [];
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const emptyChance = column.getElementsByClassName("empty-chance")[0].value;
            if (Math.random() > emptyChance / 100) {
                const type = column.getElementsByClassName("type")[0].value;
                const settings = Array.from(column.getElementsByClassName("field")).map(field => field.value);
                row.push(generateMethodePerType[type](settings));
            } else {
                row.push("");
            }
        }
        data.push(row)
    }
    counter = -1;
    // console.log(data);
    exportToCsv(data);
}

function exportToCsv(data) {
    const csv = data.map(row => row.join(",")).join("\n");
    console.log(csv);
    // const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    // const csvUrl = URL.createObjectURL(csvData);
    // const hiddenElement = document.createElement('a');
    // hiddenElement.href = csvUrl;
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'data.csv';
    // hiddenElement.click();
    //
}
$(function() {
    $('#table.sortable').sortable({
        items: 'tr',
        cursor: 'move',
        opacity: 0.6,
        containment: 'parent',
        tolerance: 'pointer',
        axis: 'y'
    });
});



