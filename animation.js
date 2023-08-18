const drop_down_bttn = document.getElementById('drop_down_bttn');
const menu = document.getElementById('menu');
const checkMark = document.getElementById('check-mark');
const CV = document.getElementById('myFile');

let menu_hidden = true;

function pressedMenu() {
    if (menu_hidden) {
        console.log('opened the menu');
        menu.style.display = 'block';
        drop_down_bttn.style.backgroundColor = 'gray'
        menu_hidden = false;
    }else {
        console.log('closed the menu')
        menu.style.display = 'none'
        drop_down_bttn.style.backgroundColor = 'whitesmoke'
        menu_hidden = true;
    }
}
function show_checmark() {
    checkMark.style.visibility = 'visible';
    checkMark.style.display = 'block';
}
// CV.addEventListener('change', show_checmark);
drop_down_bttn.addEventListener('click', pressedMenu);
