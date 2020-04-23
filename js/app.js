function on_change(el) {
    if (el.options[el.selectedIndex].value == 'one') {
        document.getElementById('rice1').style.display = 'block';
    } else {
        document.getElementById('rice1').style.display = 'none';
    }
    if (el.options[el.selectedIndex].value == 'two') {
        document.getElementById('rice2').style.display = 'block';
    } else {
        document.getElementById('rice2').style.display = 'none';
    }
}
