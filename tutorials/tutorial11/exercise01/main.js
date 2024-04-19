const red = {'background': '#CC2233', 'text': '#DDFFFF'}
const blue = {'background': '#2244FF', 'text': '#FFFFDD'}
const pink = {'background': '#EE88BB', 'text': '#002200'}
const orange = {'background': '#EE9933', 'text': '#002244'}

function setColor(c) {
    let box = document.getElementById('box')
    box.style.backgroundColor = c.background
    box.style.color = c.text
}

