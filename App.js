import React from "react"
import Confetti from "react-confetti"
import Die from "./components/Die"
import Stopwatch from "./components/Stopwatch"
import { nanoid } from "nanoid"
// import { useStopwatch } from 'react-timer-hook';

export default function App() {
    const [dice, setDice] = React.useState(newDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollNum, setRollNum] = React.useState(0)
    // const [bestRoll, setBestRoll] = React.useState(JSON.parse(localStorage.getItem("bestRoll")))

    const currentRoll = JSON.parse(localStorage.getItem('currentRoll'))
    const bestRoll = JSON.parse(localStorage.getItem('bestRoll'))

    React.useEffect(() => {
        const condition1 = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const condition2 = dice.every(die => die.value === firstValue)

        if(condition1 && condition2) {
            setTenzies(true)
            if(!bestRoll) {
                localStorage.setItem('bestRoll', JSON.stringify(rollNum))
            }
            if(rollNum < bestRoll) {
                localStorage.setItem('bestRoll', JSON.stringify(rollNum))
            }

        }
    }, [dice])

    function generateDice() {
        return {
            id: nanoid(),
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false
        }
    }

    function newDice() {
        const num = []
        while (num.length < 10) {
            num.push(generateDice())
        }
        return num
    }

    function rollDice() {
        if(!tenzies) {
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld ? die : generateDice()
            }))
            setRollNum(prev => prev + 1)
        }
        else {
            setDice(newDice())
            setTenzies(false)
            setRollNum(0)
        }
    }

    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? {
                ...die,
                isHeld: !die.isHeld
            } : die
        }))
    }

    const dieElements = dice.map(die =>
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    )

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            {tenzies && <h1 className="won">You Won!</h1>}
            <div className="roll-container">
                <div>Total rolls: {rollNum}</div>
                <div>Best rolls: {bestRoll ? bestRoll : "You haven't rolled yet"}</div>
            </div>
            <div className="time">
                <Stopwatch tenzies={tenzies} />
            </div>
            <div className="die-container">
                {dieElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}