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
        },
      
        {
            question: "Where is the world tallest building located ?",
            choice1: "Africa",
            choice2: "California",
            choice3: "Dubai",
            choice4: "Italy",
            answer: "3"
        },
      
        {
            question: "The longest river in the United Kingdom is ?",
            choice1: "River Severn",
            choice2: "River Mersey",
            choice3: "River Trent",
            choice4: "River Tweed",
            answer: "1"
        },
      
      
        {
            question: "How many permanent teeth does a dog have ?",
            choice1: "38",
            choice2: "42",
            choice3: "40",
            choice4: "36",
            answer: "2"
        },
      
        {
            question: "Which national team won the football World cup in 2018 ?",
            choice1: "England",
            choice2: "Brazil",
            choice3: "Germany",
            choice4: "France",
            answer: "4"
        },
      
        {
            question: "Which US state was Donald Trump Born ?",
            choice1: "New York",
            choice2: "California",
            choice3: "New Jersey",
            choice4: "Los Angeles",
            answer: "1"
        },
      
        {
            question: "How man states does Nigeria have ?",
            choice1: "24",
            choice2: "30",
            choice3: "36",
            choice4: "37",
            answer: "3"
        },
      
        {
            question: "____ is the capital of Nigeria ?",
            choice1: "Abuja",
            choice2: "Lagos",
            choice3: "Calabar",
            choice4: "Kano",
            answer: "1"
        },
      
        {
            question: "Los Angeles is also known as ?",
            choice1: "Angels City",
            choice2: "Shining city",
            choice3: "City of Angels",
            choice4: "Lost Angels",
            answer: "3"
        },
      
        {
            question: "What is the capital of Germany ?",
            choice1: "Georgia",
            choice2: "Missouri",
            choice3: "Oklahoma",
            choice4: "Berlin",
            answer: "4"
        },
      
        {
            question: "How many sides does an hexagon have ?",
            choice1: "Six",
            choice2: "Sevene",
            choice3: "Four",
            choice4: "Five",
            answer: "1"
        },
      
        {
            question: "How many planets are currently in the solar system ?",
            choice1: "Eleven",
            choice2: "Seven",
            choice3: "Nine",
            choice4: "Eight",
            answer: "4"
        },
      
        {
            question: "Which Planet is the hottest ?",
            choice1: "Jupitar",
            choice2: "Mercury",
            choice3: "Earth",
            choice4: "Venus",
            answer: "2"
        },
      
        {
            question: "where is the smallest bone in human body located?",
            choice1: "Toes",
            choice2: "Ears",
            choice3: "Fingers",
            choice4: "Nose",
            answer: "2"
        },
      
        {
            question: "How many hearts does an Octopus have ?",
            choice1: "One",
            choice2: "Two",
            choice3: "Three",
            choice4: "Four",
            answer: "3"
        },
      
        {
            question: "How many teeth does an adult human have ?",
            choice1: "28",
            choice2: "30",
            choice3: "32",
            choice4: "36",
            answer: "3"
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

        return window.location.assign('/end.html')
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



