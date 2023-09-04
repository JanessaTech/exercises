const burger = document.querySelector('.burger')
const nav = document.querySelector('nav')
const cover = document.querySelector('.cover')
burger.addEventListener('click', ()  => {
    nav.classList.toggle('open')
    burger.classList.toggle('open')
    cover.classList.toggle('open')
})
cover.addEventListener('click', ()=> {
    nav.classList.toggle('open')
    burger.classList.toggle('open')
    cover.classList.toggle('open')
})
