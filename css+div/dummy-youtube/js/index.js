
import {search_input, historywords, tohides, more, less} from "./common.js"

const short_hint = document.querySelector('.hint')
const short_close = document.querySelector('.close')
const burger = document.querySelector('#burger')
const r = document.querySelector(':root');
const menu = document.querySelector('#menu')
const min_menu = document.querySelector('#min-menu')

const actions = document.querySelectorAll('.actions')
const popup = document.querySelector('#popup')
const short_actions = document.querySelectorAll('.short_actions')
const short_popup = document.querySelector('#short_popup')

/* set home as the working tab*/
var home = document.querySelector('#menu ul.pri li:nth-child(1)')
home.classList.add('cur')

/* close shorts */
short_close.addEventListener('mouseenter', () => {
    short_hint.classList.toggle('active')
    short_close.classList.toggle('active')
})
short_close.addEventListener('mouseleave', () => {
    short_hint.classList.toggle('active')
    short_close.classList.toggle('active')
})

burger.addEventListener('click', () => {
    console.log('burger is clicked');
    var rs = getComputedStyle(r);
    var ssv = rs.getPropertyValue('--sideSize')
    if (ssv.trim() === '300px') {
        console.log("=== 300px")
        r.style.setProperty('--sideSize', '100px');
        menu.classList.toggle('active')
        min_menu.classList.toggle('active')        
    } else {
        console.log("!== 300px")
        r.style.setProperty('--sideSize', '300px');
        menu.classList.toggle('active')
        min_menu.classList.toggle('active')
    }
})

actions.forEach(e => e.addEventListener('click', (e)=> {
    var p = e.target.parentElement
    var rect = p.getBoundingClientRect();
    popup.style.top = rect.top + 50;
    popup.style.left = rect.left - 250;
    popup.style.display = "block";
}))
short_actions.forEach(e => e.addEventListener('click', (e)=> {
    var p = e.target.parentElement
    var rect = p.getBoundingClientRect();
    short_popup.style.top = rect.top + 50;
    short_popup.style.left = rect.left - 250;
    short_popup.style.display = "block";
}))

document.addEventListener('click', e =>{
    var className = e.target.parentElement.className
    if (className !== 'actions' && className !== 'short_actions') {
        popup.style.display = "none";
        short_popup.style.display = "none";
    } else if (className === 'actions') {
        short_popup.style.display = "none";
    } else {
        popup.style.display = "none";
    }
})

