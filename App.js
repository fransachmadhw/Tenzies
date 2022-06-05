import React from "react"
import Confetti from "react-confetti"
import Die from "./components/Die"

export default function App() {
    const [dice, setDice] = React.useState(newDice())

    function newDice() {
        const num = []
        while (num.length < 10) {
            num.push(Math.floor(Math.random() * 6) + 1)
        }
        return num
    }

    function rollDice() {
        setDice(newDice())
    }

    const dieElements = dice.map(die => <Die value={die} />)

    return (
        <main>
            <div className="die-container">
                {dieElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                Roll
            </button>
        </main>
    )
}