export const search_input = document.querySelector('#search input')
export const historywords = document.querySelector('#historywords')
search_input.addEventListener('focus', () => {
    historywords.style.display = "block"
});
search_input.addEventListener('focusout', () => {
    historywords.style.display = "none"
});

export const tohides = document.querySelectorAll('.toHide')
export const more = document.querySelector('#more')
export const less = document.querySelector('#less')
more.addEventListener('click', (e) => {
    console.log("more is clicked")
    e.preventDefault()
    tohides.forEach(e => {
        e.classList.remove('hide')
    })
    less.classList.remove('hide')
    more.classList.add('hide')
})
less.addEventListener('click', (e) => {
    console.log("less is clicked")
    e.preventDefault()
    tohides.forEach(e => {
        e.classList.add('hide')
    })
    less.classList.add('hide')
    more.classList.remove('hide')
})