const work = document.querySelector('#text')
const start = document.querySelector('#start')
const time = document.querySelector('#time')
const reset = document.querySelector('#reset')
const audio = document.querySelector('#timerAudio')
const source = document.querySelector('source')
const workInput = document.querySelector('#timeWorking')
const shortInput = document.querySelector('#timeShortBreak')
const longInput = document.querySelector('#timeLongBreak')
let inputs = [workInput, shortInput, longInput]
let workingTime = Number(workInput.value)
let shortBreakTime = Number(shortInput.value)
let longBreakTime = Number(longInput.value)
let timeArray = [workingTime*60, shortBreakTime*60, workingTime*60, shortBreakTime*60, workingTime*60, shortBreakTime*60, workingTime*60, longBreakTime*60]
let interval
let y = 0
let x = timeArray[y]
for (let input of inputs) {
    input.addEventListener('change', (e) => {
        workingTime = Math.ceil(Number(workInput.value))
        workInput.value = workingTime
        if (workingTime < 10) {
            workingTime = '0' + workingTime
        }
        shortBreakTime = Math.ceil(Number(shortInput.value))
        shortInput.value = shortBreakTime
        longBreakTime = Math.ceil(Number(longInput.value))
        longInput.value = longBreakTime
        timeArray = [workingTime*60, shortBreakTime*60, workingTime*60, shortBreakTime*60, workingTime*60, shortBreakTime*60, workingTime*60, longBreakTime*60]
        time.textContent = workingTime+ ':00'
        x = timeArray[y]
    })
}

let count = false
let bisou = new Audio('bisou.mp3')
let doIt = new Audio('doIT.mp3')
let salutAToi = new Audio('salutAToi.mp3')
let audioArr = [salutAToi, bisou, doIt, bisou, doIt, bisou, doIt, bisou]

const timer = () => {
    console.log(timeArray[y])
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
    time.textContent = workingTime + ':00'
    work.textContent = 'Time to work !'
})