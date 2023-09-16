import {search_input, historywords, tohides, more, less} from "./common.js"

const header_burger = document.querySelector('#header .burger')
const menu_burger = document.querySelector('#menu .burger')
const menu  = document.querySelector('#menu')
const mask = document.querySelector('#mask')
const sub = document.querySelector('#sub')
const subed = document.querySelector('#subed')
const subaddedMesg = document.querySelector('#subaddedMesg')
const subedPopup = document.querySelector('#subedPopup')

header_burger.addEventListener('click', () => {
    console.log('header_burger is clicked in details');
    menu.classList.toggle('show')
    mask.classList.toggle('show')
})
menu_burger.addEventListener('click', () => {
    console.log('menu_burger is clicked in details');
    menu.classList.toggle('show')
    mask.classList.toggle('show')
})

mask.addEventListener('click', () => {
    menu.classList.toggle('show')
    mask.classList.toggle('show')
})
sub.addEventListener('click', (e) => {
    e.preventDefault()
    sub.classList.remove('open')
    subed.classList.add('open')
    subaddedMesg.classList.toggle('open')
})
subed.addEventListener('click', (e) => {
    e.preventDefault()
    subedPopup.classList.add('open')
})


document.addEventListener('click', (e) => {
    console.log(e.target)
    console.log('document click')
    console.log(e.target.id)
    if (e.target.id !== 'subed') {
        console.log('e.target.id !== subed')
        subedPopup.classList.remove('open');
    }else {
        console.log('e.target.id == subed')
    }
})