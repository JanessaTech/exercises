const comment_input = document.querySelector(".comments .comment_byme input")
const actionOnComment = document.querySelector(".comments .comment_byme .actionOnComment")
const comment_cancel_button = document.querySelector(".comments .comment_byme .cancelComment")
const comment_submit_button = document.querySelector(".comments .comment_byme .submitComment")

comment_input.addEventListener('focus', (e) => {
    e.preventDefault();
    actionOnComment.classList.remove('cancled')
})

comment_input.addEventListener('input', (e) => {
    e.preventDefault();
    var text = e.target.value
    if(text.length > 0) {
        comment_submit_button.classList.remove('disable')
    } else {
        comment_submit_button.classList.add('disable')
    }
})
comment_cancel_button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('comment_cancel_button click')
    actionOnComment.classList.add('cancled')
    comment_submit_button.classList.add('disable')
    comment_input.value = ''
})