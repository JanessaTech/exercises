const cmt0_comment_input = document.querySelector(".comments #cmt0.comment_byme input")
const cmt0_actionOnComment = document.querySelector(".comments #cmt0.comment_byme .actionOnComment")
const cmt0_comment_cancel_button = document.querySelector(".comments #cmt0.comment_byme .cancelComment")
const cmt0_comment_submit_button = document.querySelector(".comments #cmt0.comment_byme .submitComment")

cmt0_comment_input.addEventListener('focus', (e) => {
    e.preventDefault();
    cmt0_actionOnComment.classList.remove('cancled')
})

cmt0_comment_input.addEventListener('input', (e) => {
    e.preventDefault();
    var text = e.target.value
    if(text.length > 0) {
        cmt0_comment_submit_button.classList.remove('disable')
    } else {
        cmt0_comment_submit_button.classList.add('disable')
    }
})
cmt0_comment_cancel_button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('comment_cancel_button click')
    cmt0_actionOnComment.classList.add('cancled')
    cmt0_comment_submit_button.classList.add('disable')
    cmt0_comment_input.value = ''
})


const cmt1_comment_input = document.querySelector(".comments #cmt1.comment_content .comment_byme input")
const cmt1_actionOnComment = document.querySelector(".comments #cmt1.comment_content .comment_byme .actionOnComment")
const cmt1_comment_cancel_button = document.querySelector(".comments #cmt1.comment_content .comment_byme .cancelComment")
const cmt1_comment_submit_button = document.querySelector(".comments #cmt1.comment_content .comment_byme .submitComment")
const cmt1_reply_btn = document.querySelector("#cmt1_reply_btn")
const cmt1_comment_byme = document.querySelector("#cmt1 .comment_byme")
cmt1_comment_input.addEventListener('focus', (e) => {
    console.log('focus cmt1_comment_input')
    e.preventDefault();
    cmt1_actionOnComment.classList.remove('cancled')
})

cmt1_comment_input.addEventListener('input', (e) => {
    e.preventDefault();
    var text = e.target.value
    if(text.length > 0) {
        cmt1_comment_submit_button.classList.remove('disable')
    } else {
        cmt1_comment_submit_button.classList.add('disable')
    }
})
cmt1_comment_cancel_button.addEventListener('click', (e) => {
    e.preventDefault();
    cmt1_actionOnComment.classList.add('cancled')
    cmt1_comment_submit_button.classList.add('disable')
    cmt1_comment_input.value = ''
})
cmt1_reply_btn.addEventListener('click', (e) => {
    e.preventDefault();
    cmt1_comment_byme.classList.toggle('open')
})

const cmt2_comment_input = document.querySelector(".comments #cmt2.comment_content .comment_byme input")
const cmt2_actionOnComment = document.querySelector(".comments #cmt2.comment_content .comment_byme .actionOnComment")
const cmt2_comment_cancel_button = document.querySelector(".comments #cmt2.comment_content .comment_byme .cancelComment")
const cmt2_comment_submit_button = document.querySelector(".comments #cmt2.comment_content .comment_byme .submitComment")
const cmt2_reply_btn = document.querySelector("#cmt2_reply_btn")
const cmt2_comment_byme = document.querySelector("#cmt2 .comment_byme")
cmt2_comment_input.addEventListener('focus', (e) => {
    console.log('focus cmt1_comment_input')
    e.preventDefault();
    cmt2_actionOnComment.classList.remove('cancled')
})

cmt2_comment_input.addEventListener('input', (e) => {
    e.preventDefault();
    var text = e.target.value
    if(text.length > 0) {
        cmt2_comment_submit_button.classList.remove('disable')
    } else {
        cmt2_comment_submit_button.classList.add('disable')
    }
})
cmt2_comment_cancel_button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('comment_cancel_button click')
    cmt2_actionOnComment.classList.add('cancled')
    cmt2_comment_submit_button.classList.add('disable')
    cmt2_comment_input.value = ''
})
cmt2_reply_btn.addEventListener('click', (e) => {
    e.preventDefault();
    cmt2_comment_byme.classList.toggle('open')
})