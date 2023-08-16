let drop_down_bttn = document.getElementById('drop_down_bttn');
let menu = document.getElementById('menu');
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

drop_down_bttn.addEventListener('click', pressedMenu);
