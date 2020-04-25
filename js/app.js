const x = document.getElementById(`getRecipe`);

x.addEventListener(`click`, on_change);

function on_change(el) {
    if (el.options[el.selectedIndex].value == `one`) {
        document.getElementById(`rice1`).style.display = `block`;
    } else {
        document.getElementById(`rice1`).style.display = `none`;
    }
    if (el.options[el.selectedIndex].value == `two`) {
        document.getElementById(`rice2`).style.display = `block`;
    } else {
        document.getElementById(`rice2`).style.display = `none`;
    }
}

document.getElementById(`input`).addEventListener(`keyup`, calcRice);

var inputBox = document.getElementById(`input`);

function calcRice(){
    document.getElementById(`ozSprouted`).value = inputBox.value*6.53;
    document.getElementById(`ozWhite`).value = inputBox.value*4.82;
}

