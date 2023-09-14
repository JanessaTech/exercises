import {search_input, historywords, tohides, more, less} from "./common.js"

const header_burger = document.querySelector('#header .burger')
const menu_burger = document.querySelector('#menu .burger')
const menu  = document.querySelector('#menu')
const mask = document.querySelector('#mask')

header_burger.addEventListener('click', () => {
    console.log('burger is clicked in details');
    menu.classList.toggle('show')
    mask.classList.toggle('show')
})
menu_burger.addEventListener('click', () => {
    console.log('burger is clicked in details');
    menu.classList.toggle('show')
    mask.classList.toggle('show')
})

mask.addEventListener('click', () => {
    menu.classList.toggle('show')
    mask.classList.toggle('show')
})