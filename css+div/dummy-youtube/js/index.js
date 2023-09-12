
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
const actions = document.querySelectorAll('.actions')
const popup = document.querySelector('#popup')

short_close.addEventListener('mouseenter', () => {
    short_hint.classList.toggle('active')
    short_close.classList.toggle('active')
})
short_close.addEventListener('mouseleave', () => {
    short_hint.classList.toggle('active')
    short_close.classList.toggle('active')
})
search_input.addEventListener('focus', () => {
    //historywords.classList.toggle('active')
    historywords.style.display = "block"
});
search_input.addEventListener('focusout', () => {
    historywords.style.display = "none"
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

document.addEventListener('click', e =>{
    var className = e.target.parentElement.className
    if (className !== 'actions') {
        popup.style.display = "none";
    }
})

