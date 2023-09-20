const cmt0_comment_input = document.querySelector("#c2.comments #cmt0.comment_byme input")
const cmt0_actionOnComment = document.querySelector("#c2.comments #cmt0.comment_byme .actionOnComment")
const cmt0_comment_cancel_button = document.querySelector("#c2.comments #cmt0.comment_byme .cancelComment")
const cmt0_comment_submit_button = document.querySelector("#c2.comments #cmt0.comment_byme .submitComment")

cmt0_comment_input.addEventListener('focus', (e) => {
    e.preventDefault();
    cmt0_actionOnComment.classList.remove('cancled')
})

cmt0_comment_input.addEventListener('input', (e) => {
    console.log('input cmt0_comment_input')
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


const cmt1_comment_input = document.querySelector("#c2.comments #cmt1.comment_content .comment_byme input")
const cmt1_actionOnComment = document.querySelector("#c2.comments #cmt1.comment_content .comment_byme .actionOnComment")
const cmt1_comment_cancel_button = document.querySelector("#c2.comments #cmt1.comment_content .comment_byme .cancelComment")
const cmt1_comment_submit_button = document.querySelector("#c2.comments #cmt1.comment_content .comment_byme .submitComment")
const cmt1_reply_btn = document.querySelector("#c2 #cmt1_reply_btn")
const cmt1_comment_byme = document.querySelector("#c2 #cmt1 .comment_byme")
const cmt1_replies = document.querySelector("#c2.comments #cmt1.comment_content > div:nth-of-type(6)")
const cmt1_show_reply_btn = document.querySelector("#c2.comments #cmt1.comment_content > div:nth-of-type(5)")
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
cmt1_show_reply_btn.addEventListener('click', (e) => {
    e.preventDefault();
    var src = cmt1_show_reply_btn.firstChild.src
    if (src.includes("triangle-down")) {
        cmt1_show_reply_btn.firstChild.src = "./imgs/triangle-up.svg"
    } else {
        cmt1_show_reply_btn.firstChild.src = "./imgs/triangle-down.svg"
    }
    cmt1_replies.classList.toggle('showReplies')
})

const cmt2_comment_input = document.querySelector("#c2.comments #cmt2.comment_content .comment_byme input")
const cmt2_actionOnComment = document.querySelector("#c2.comments #cmt2.comment_content .comment_byme .actionOnComment")
const cmt2_comment_cancel_button = document.querySelector("#c2.comments #cmt2.comment_content .comment_byme .cancelComment")
const cmt2_comment_submit_button = document.querySelector("#c2.comments #cmt2.comment_content .comment_byme .submitComment")
const cmt2_reply_btn = document.querySelector("#c2 #cmt2_reply_btn")
const cmt2_comment_byme = document.querySelector("#c2 #cmt2 .comment_byme")
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


const cmt3_comment_input = document.querySelector("#c2.comments #cmt3.comment_content .comment_byme input")
const cmt3_actionOnComment = document.querySelector("#c2.comments #cmt3.comment_content .comment_byme .actionOnComment")
const cmt3_comment_cancel_button = document.querySelector("#c2.comments #cmt3.comment_content .comment_byme .cancelComment")
const cmt3_comment_submit_button = document.querySelector("#c2.comments #cmt3.comment_content .comment_byme .submitComment")
const cmt3_reply_btn = document.querySelector("#c2 #cmt3_reply_btn")
const cmt3_comment_byme = document.querySelector("#c2 #cmt3 .comment_byme")
const cmt3_replies = document.querySelector("#c2.comments #cmt3.comment_content > div:nth-of-type(6)")
const cmt3_show_reply_btn = document.querySelector("#c2.comments #cmt3.comment_content > div:nth-of-type(5)")
cmt3_comment_input.addEventListener('focus', (e) => {
    console.log('focus cmt1_comment_input')
    e.preventDefault();
    cmt3_actionOnComment.classList.remove('cancled')
})

cmt3_comment_input.addEventListener('input', (e) => {
    e.preventDefault();
    var text = e.target.value
    if(text.length > 0) {
        cmt3_comment_submit_button.classList.remove('disable')
    } else {
        cmt3_comment_submit_button.classList.add('disable')
    }
})
cmt3_comment_cancel_button.addEventListener('click', (e) => {
    e.preventDefault();
    cmt3_actionOnComment.classList.add('cancled')
    cmt3_comment_submit_button.classList.add('disable')
    cmt3_comment_input.value = ''
})
cmt3_reply_btn.addEventListener('click', (e) => {
    e.preventDefault();
    cmt3_comment_byme.classList.toggle('open')
})
cmt3_show_reply_btn.addEventListener('click', (e) => {
    e.preventDefault();
    var src = cmt3_show_reply_btn.firstChild.src
    if (src.includes("triangle-down")) {
        cmt3_show_reply_btn.firstChild.src = "./imgs/triangle-up.svg"
    } else {
        cmt3_show_reply_btn.firstChild.src = "./imgs/triangle-down.svg"
    }
    cmt3_replies.classList.toggle('showReplies')
})


const cmt4_comment_input = document.querySelector("#c2.comments #cmt4.comment_content .comment_byme input")
const cmt4_actionOnComment = document.querySelector("#c2.comments #cmt4.comment_content .comment_byme .actionOnComment")
const cmt4_comment_cancel_button = document.querySelector("#c2.comments #cmt4.comment_content .comment_byme .cancelComment")
const cmt4_comment_submit_button = document.querySelector("#c2.comments #cmt4.comment_content .comment_byme .submitComment")
const cmt4_reply_btn = document.querySelector("#c2 #cmt4_reply_btn")
const cmt4_comment_byme = document.querySelector("#c2 #cmt4 .comment_byme")
cmt4_comment_input.addEventListener('focus', (e) => {
    console.log('focus cmt1_comment_input')
    e.preventDefault();
    cmt4_actionOnComment.classList.remove('cancled')
})

cmt4_comment_input.addEventListener('input', (e) => {
    e.preventDefault();
    var text = e.target.value
    if(text.length > 0) {
        cmt4_comment_submit_button.classList.remove('disable')
    } else {
        cmt4_comment_submit_button.classList.add('disable')
    }
})
cmt4_comment_cancel_button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('comment_cancel_button click')
    cmt4_actionOnComment.classList.add('cancled')
    cmt4_comment_submit_button.classList.add('disable')
    cmt4_comment_input.value = ''
})
cmt4_reply_btn.addEventListener('click', (e) => {
    e.preventDefault();
    cmt4_comment_byme.classList.toggle('open')
})


const cmt5_comment_input = document.querySelector("#c2.comments #cmt5.comment_content .comment_byme input")
const cmt5_actionOnComment = document.querySelector("#c2.comments #cmt5.comment_content .comment_byme .actionOnComment")
const cmt5_comment_cancel_button = document.querySelector("#c2.comments #cmt5.comment_content .comment_byme .cancelComment")
const cmt5_comment_submit_button = document.querySelector("#c2.comments #cmt5.comment_content .comment_byme .submitComment")
const cmt5_reply_btn = document.querySelector("#c2 #cmt5_reply_btn")
const cmt5_comment_byme = document.querySelector("#c2 #cmt5 .comment_byme")
cmt5_comment_input.addEventListener('focus', (e) => {
    console.log('focus cmt1_comment_input')
    e.preventDefault();
    cmt5_actionOnComment.classList.remove('cancled')
})

cmt5_comment_input.addEventListener('input', (e) => {
    e.preventDefault();
    var text = e.target.value
    if(text.length > 0) {
        cmt5_comment_submit_button.classList.remove('disable')
    } else {
        cmt5_comment_submit_button.classList.add('disable')
    }
})
cmt5_comment_cancel_button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('comment_cancel_button click')
    cmt5_actionOnComment.classList.add('cancled')
    cmt5_comment_submit_button.classList.add('disable')
    cmt5_comment_input.value = ''
})
cmt5_reply_btn.addEventListener('click', (e) => {
    e.preventDefault();
    cmt5_comment_byme.classList.toggle('open')
})