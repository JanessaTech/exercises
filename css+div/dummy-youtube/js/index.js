
const short_hint = document.querySelector('.hint')
const short_close = document.querySelector('.close')
const search_input = document.querySelector('#search input')
const historywords = document.querySelector('#historywords')
const tohides = document.querySelectorAll('.toHide')
const more = document.querySelector('#more')
const less = document.querySelector('#less')

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

