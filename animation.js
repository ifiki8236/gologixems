const drop_down_bttn = document.getElementById('drop_down_bttn');
const menu = document.getElementById('menu');
const checkMark = document.getElementById('check-mark');
const CV = document.getElementById('myFile');

let menu_hidden = true;

function pressedMenu() {
    if (menu_hidden) {
        console.log('opened the menu');
        menu.style.display = 'block';
        menu_hidden = false;
    }else {
        console.log('closed the menu')
        menu.style.display = 'none'
        menu_hidden = true;
    }
}
function show_checmark() {
    check_mark.style.visibility = 'visible';
    check_mark.style.display = 'block';
}
CV.addEventListener('change', show_checmark);
drop_down_bttn.addEventListener('click', pressedMenu);
