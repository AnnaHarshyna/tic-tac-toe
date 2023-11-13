const WINNING_COMBOS = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,4,8],[2,4,6],[0,3,6],
    [1,4,7],[2,5,8]
]

const START_CELLS = ["","","","","","","","",""]

const CIRCLE_CLASS = "circle"
const CROSS_CLASS = 'cross'
const SQUARE_CLASS = 'square'


const gameBoard = document.querySelector('#gameboard')


const infoDisplay = document.querySelector('#info')

let elementToGo = CIRCLE_CLASS

const message = document.createElement('p')
message.classList.add('message')

function startGame() {
    gameBoard.innerHTML = ''

    START_CELLS.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add(SQUARE_CLASS)
        cellElement.id = index
        cellElement.addEventListener('click', addElement)
        gameBoard.append(cellElement)
     })

    message.textContent = "Circle goes first"
    infoDisplay.append(message)
}

startGame()

function addElement(e) {
  const element = document.createElement('div')
  element.classList.add(elementToGo)
  e.target.append(element)
  elementToGo = elementToGo === CIRCLE_CLASS ? CROSS_CLASS : CIRCLE_CLASS
  message.textContent = "Add " + elementToGo
  e.target.removeEventListener("click", addElement)
  checkScore()
}

function checkScore() {
   const allSquares = document.querySelectorAll(".square")


const isDraw = (Array.from(allSquares).every(square => square.firstChild))

if (isDraw) {
    message.textContent = "Draw!"
    showPlayAgainButton()
}

  
    WINNING_COMBOS.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains(CROSS_CLASS))

            const circleWins = array.every(cell => 
                allSquares[cell].firstChild?.classList.contains(CIRCLE_CLASS))

            if (crossWins) {
                message.textContent = "Cross Won! 🎉"
                gameBoard.classList.add('disabled')
            showPlayAgainButton()
            } else if (circleWins) {
                message.textContent = "Circle Won! 🎉"
                gameBoard.classList.add('disabled')
            showPlayAgainButton()
            }      
    })
}

function showPlayAgainButton() {
    const playAgainButton = document.createElement('button')
    playAgainButton.classList.add('button')
    playAgainButton.textContent= "Play again!"
    infoDisplay.append(playAgainButton)
    playAgainButton.addEventListener('click', resetBoard)
}

function hidePlayAgainButton() {
    const playAgainButton = document.querySelector('button')
    playAgainButton.remove()
    gameBoard.classList.remove('disabled')
}

function resetBoard(_e) {
    hidePlayAgainButton()
    startGame()
}