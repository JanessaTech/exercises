import {search_input, historywords, tohides, more, less} from "./common.js"

const header_burger = document.querySelector('#header .burger')
const menu_burger = document.querySelector('#menu .burger')
const menu  = document.querySelector('#menu')
const mask = document.querySelector('#mask')
const sub = document.querySelector('#sub')
const subed = document.querySelector('#subed')
const subaddedMesg = document.querySelector('#subaddedMesg')
const subedPopup = document.querySelector('#subedPopup')
const sharePopup = document.querySelector('#sharePopup')
const share = document.querySelector('#share')


header_burger.addEventListener('click', () => {
    console.log('header_burger is clicked in details');
    menu.classList.add('show')
    mask.classList.add('show')
})
menu_burger.addEventListener('click', () => {
    console.log('menu_burger is clicked in details');
    menu.classList.remove('show')
    mask.classList.remove('show')
})

mask.addEventListener('click', () => {
    menu.classList.remove('show')
    mask.classList.remove('show')
    sharePopup.classList.remove('show')
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
share.addEventListener('click', (e) => {
    e.preventDefault()
    mask.classList.add('show')
    sharePopup.classList.add('show')
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