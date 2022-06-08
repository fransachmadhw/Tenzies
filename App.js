import React from "react"
import Confetti from "react-confetti"
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App() {
    const [dice, setDice] = React.useState(newDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollNum, setRollNum] = React.useState(0)

    React.useEffect(() => {
        const condition1 = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const condition2 = dice.every(die => die.value === firstValue)

        if(condition1 && condition2) {
            setTenzies(true)
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
            <div>Roll: {rollNum}</div>
            <div className="die-container">
                {dieElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}