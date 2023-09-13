import {search_input, historywords, tohides, more, less} from "./common.js"

const burger = document.querySelector('#burger')
const menu  = document.querySelector('#menu')

burger.addEventListener('click', () => {
    console.log('burger is clicked in details');
    menu.classList.toggle('show')
})