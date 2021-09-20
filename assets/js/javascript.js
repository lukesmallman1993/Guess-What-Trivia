const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
        {
            question: "How many days makes a week ?",
            choice1: "10 days",
            choice2: "14 days",
            choice3: "5 days",
            choice4: "7 days",
            answer: "4"
        },
      
        {
            question: "How many players are allowed on a soccer pitch ?",
            choice1: "10 players",
            choice2: "11 players",
            choice3: "9 players",
            choice4: "12 players",
            answer: "2"
        },
      
        {
            question: "Who was the first President of USA ?",
            choice1: "Donald Trump",
            choice2: "Barack Obama",
            choice3: "Abraham Lincoln",
            choice4: "George Washington",
            answer: "4"
        },
      
        {
            question: "30 days has ______ ?",
            choice1: "January",
            choice2: "December",
            choice3: "June",
            choice4: "August",
            answer: "3"
        },
      
        {
            question: "How manay hours can be found in a day ?",
            choice1: "30 hours",
            choice2: "38 hours",
            choice3: "48 hours",
            choice4: "24 hours",
            answer: "4"
        },
      
        {
            question: "Which is the longest river in the world ?",
            choice1: "River Nile",
            choice2: "Long River",
            choice3: "River Niger",
            choice4: "Lake Chad",
            answer: "1"
        },
      
        {
            question: "_____ is the hottest Continent on Earth ?",
            choice1: "Oceania",
            choice2: "Antarctica",
            choice3: "Africa",
            choice4: "North America",
            answer: "3"
        },
      
        {
            question: "Which country is the largest in the world ?",
            choice1: "Russia",
            choice2: "Canada",
            choice3: "Africa",
            choice4: "Egypt",
            answer: "1"
        },
      
        {
            question: "Which of these numbers is an odd number ?",
            choice1: "Ten",
            choice2: "Twelve",
            choice3: "Eight",
            choice4: "Eleven",
            answer: "4"
        },
      
        {
            question: `"You Can't see me" is a popular saying by`,
            choice1: "Eminem",
            choice2: "Bill Gates",
            choice3: "Chris Brown",
            choice4: "John Cena",
            answer: "4"
        }
      
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end-page.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

/* -------------------------------- END */

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')

    
}

/* -------------------- HIGHSCORE */

const highScoresList = document.querySelector('#highScoresList')
const highScore = JSON.parse(localStorage.getItem("highScore")) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")

