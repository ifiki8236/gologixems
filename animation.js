// import { drop_down_bttn } from "./variables";

let drop_down_bttn = document.getElementsByClassName('drop_down_bttn');

function pressedMenu() {
    alert('Function is working!');
    console.log('menu pressed');
    // animation_vars.menu.style.display = 'block';
}

drop_down_bttn.addEventListener('click', pressedMenu);
