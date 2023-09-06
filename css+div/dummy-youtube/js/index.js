
const short_hint = document.querySelector('.hint')
const short_close = document.querySelector('.close')
short_close.addEventListener('mouseenter', () => {
    short_hint.classList.toggle('active')
    short_close.classList.toggle('active')
    

})
short_close.addEventListener('mouseleave', () => {
    short_hint.classList.toggle('active')
    short_close.classList.toggle('active')
})
