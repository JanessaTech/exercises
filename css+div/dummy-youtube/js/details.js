const burger = document.querySelector('#burger')
const menu  = document.querySelector('#menu')
const search_input = document.querySelector('#search input')
const historywords = document.querySelector('#historywords')

menu.classList.add('hide');
burger.addEventListener('click', () => {
    console.log('burger is clicked in details');
    menu.classList.toggle('hide')
})
search_input.addEventListener('focus', () => {
    historywords.style.display = "block"
});
search_input.addEventListener('focusout', () => {
    historywords.style.display = "none"
});
