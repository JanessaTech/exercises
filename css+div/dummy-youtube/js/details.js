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
const closeSharePopup = document.querySelector('#sharePopup #close')
const moreAction = document.querySelector('#others #more')
const moreActionPopup = document.querySelector('#moreActionPopup')
const summary = document.querySelector('#intro #summary span')
const summary_showMore = document.querySelector("#intro #summary #showMore")
const summary_showLess = document.querySelector("#intro #summary #showLess")



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
    var rect = subed.getBoundingClientRect()
    subedPopup.style.top = rect.top + 60;
    subedPopup.style.left = rect.left;
    subedPopup.style.display = "block";
})
share.addEventListener('click', (e) => {
    e.preventDefault()
    mask.classList.add('show')
    sharePopup.classList.add('show')
})
closeSharePopup.addEventListener('click', (e) => {
    e.preventDefault();
    mask.classList.remove('show')
    sharePopup.classList.remove('show')
})
moreAction.addEventListener('click', (e) => {
    var p = e.target.parentElement
    var rect = p.getBoundingClientRect();
    moreActionPopup.style.top = rect.top + 60;
    moreActionPopup.style.left = rect.left;
    moreActionPopup.style.display = "block";
}) 
summary.addEventListener('click', (e) => {
    e.preventDefault();
    summary.style.cursor = 'default'
    summary.style.height = 'fit-content'
    summary_showMore.style.display = 'none'
    summary_showLess.style.display = 'block'
})
summary_showMore.addEventListener('click', (e) => {
    e.preventDefault();
    summary.style.height = 'fit-content'
    summary_showMore.style.display = 'none'
    summary_showLess.style.display = 'block'
})
summary_showLess.addEventListener('click', (e) => {
    e.preventDefault();
    summary.style.height = '200px'
    summary.style.cursor = 'pointer'
    summary_showMore.style.display = 'block'
    summary_showLess.style.display = 'none'
})


document.addEventListener('click', (e) => {
    console.log('document click')
    console.log(e.target)
    var parentId = e.target.parentElement.id
    if (parentId !== 'more') {
        moreActionPopup.style.display = "none";
    }
    if (e.target.id !== 'subed') {
        console.log('e.target.id !== subed')
        subedPopup.style.display = "none";
    }else {
        console.log('e.target.id == subed')
    }
})