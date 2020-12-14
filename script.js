const work = document.querySelector('#text')
const start = document.querySelector('#start')
const time = document.querySelector('#time')
const reset = document.querySelector('#reset')
const audio = document.querySelector('#timerAudio')
const source = document.querySelector('source')

let interval
let x
let y = 0
let timeArray = [25*60, 5*60, 25*60, 5*60, 25*60, 5*60, 25*60, 15*60]
x = timeArray[y]
let count = false
let bisou = new Audio('bisou.mp3')
let doIt = new Audio('doIT.mp3')
let salutAToi = new Audio('salutAToi.mp3')
let audioArr = [salutAToi, bisou, doIt, bisou, doIt, bisou, doIt, bisou]

const timer = () => {
    if (x === timeArray[y]) {
        audioArr[y].play()
    }
        x--
        let minutes = Math.floor(x/60)
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        let seconds = Math.floor(x - (minutes*60))
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        if (x === 0) {
            y++
            if (y >= timeArray.length) {
                y = 0
            }
            audioArr[y].play()
            x = timeArray[y]
        }
        if (y === 0 || y === 2 || y === 4 || y === 6) {
            work.textContent = 'Time to work !'
        
        }
        else if (y === 1 || y === 3 || y === 5) {
            work.textContent = 'Time for a short break !'
        } else {
            work.textContent = 'Time for a long break !'
        }
        time.textContent = minutes + ':' + seconds
    
        interval = setTimeout(timer, 1000)
}



start.addEventListener('click', () => {
    if (!count) {
        timer()
        count = true
        start.textContent = 'STOP'
    } else {
        clearTimeout(interval)
        count = false
        start.textContent = 'START'
    }
})

reset.addEventListener('click', () => {
    clearTimeout(interval)
    y = 0
    x = timeArray[y]
    count = false
    start.textContent = 'START'
    time.textContent = '25:00'
    work.textContent = 'Time to work !'
})