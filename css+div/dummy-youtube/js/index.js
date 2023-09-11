
const short_hint = document.querySelector('.hint')
const short_close = document.querySelector('.close')
const search_input = document.querySelector('#search input')
const historywords = document.querySelector('#historywords')
const tohides = document.querySelectorAll('.toHide')
const more = document.querySelector('#more')
const less = document.querySelector('#less')
const menu = document.querySelector('#menu')
const min_menu = document.querySelector('#min-menu')
const burger = document.querySelector('#burger')
var r = document.querySelector(':root');

short_close.addEventListener('mouseenter', () => {
    short_hint.classList.toggle('active')
    short_close.classList.toggle('active')
})
short_close.addEventListener('mouseleave', () => {
    short_hint.classList.toggle('active')
    short_close.classList.toggle('active')
})
search_input.addEventListener('focus', () => {
    historywords.classList.toggle('active')
});
search_input.addEventListener('focusout', () => {
    historywords.classList.toggle('active')
});
more.addEventListener('click', () => {
    console.log("more is clicked")
    tohides.forEach(e => {
        e.classList.remove('hide')
    })
    less.classList.remove('hide')
    more.classList.add('hide')
})
less.addEventListener('click', () => {
    console.log("less is clicked")
    tohides.forEach(e => {
        e.classList.add('hide')
    })
    less.classList.add('hide')
    more.classList.remove('hide')
})
burger.addEventListener('click', () => {
    console.log('burger is clicked');
    var rs = getComputedStyle(r);
    var ssv = rs.getPropertyValue('--sideSize')
    if (ssv === '300px') {
        r.style.setProperty('--sideSize', '100px');
        menu.classList.toggle('active')
        min_menu.classList.toggle('active')        
    } else {
        r.style.setProperty('--sideSize', '300px');
        menu.classList.toggle('active')
        min_menu.classList.toggle('active')
    }
})

