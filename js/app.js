const x = document.getElementById(`getRecipe`);
x.addEventListener(`click`, on_change);

function on_change() {
    if (x.options[x.selectedIndex].value == `one`) {
        document.getElementById(`rice1`).style.display = `block`;
    } else {
        document.getElementById(`rice1`).style.display = `none`;
    }

    if (x.options[x.selectedIndex].value == `two`) {
        document.getElementById(`rice2`).style.display = `block`;
    } else {
        document.getElementById(`rice2`).style.display = `none`;
    }
}

document.getElementById(`input`).addEventListener(`keyup`, calcRice);
const inputBox = document.getElementById(`input`);

function calcRice() {
    document.getElementById(`ozSprouted`).value = inputBox.value * 6.53;
    document.getElementById(`ozWhite`).value = inputBox.value * 4.82;
}

document.getElementById(`input`).addEventListener(`keyup`, calcWater);
const outputBox = document.getElementById(`input`);

function calcWater() {
    document.getElementById(`flOzSprouted`).value = outputBox.value * 16;
    document.getElementById(`flOzSprouted2`).value = outputBox.value * 4;
    document.getElementById(`flOzWhite`).value = outputBox.value * 16;
}

document.getElementById(`input`).addEventListener(`keyup`, calcOil);
const oilBox = document.getElementById(`input`);

function calcOil() {
    document.getElementById(`ozOil`).value = oilBox.value * 0.5;
    document.getElementById(`ozOil2`).value = oilBox.value * 0.5;
}
