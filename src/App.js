import React from "react"
import Confetti from 'react-confetti'
import Die from "./Die"
import { nanoid } from "nanoid"

export default function App() {
    const [diceValues, setDiceValues] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    React.useEffect(() => {
        const allHeld = diceValues.every(die => die.isHeld)
        const firstValue = diceValues[0].value
        const allTheSameValue = diceValues.every(die => die.value === firstValue)
        if (allHeld && allTheSameValue) {
            setTenzies(true)
        }
    }, [diceValues])
    function generateNewDie() {
        return {
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false,
            id: nanoid()
        }
    }
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    function toggle(id) {
        setDiceValues(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }
    function rollDice() {
        if (tenzies) {
            setDiceValues(allNewDice())
            setTenzies(false)
        } else {
            setDiceValues(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        }
    }
    return (
        <main>
            {tenzies ? <Confetti /> : ""}
            <h1 className="title">Tenzies</h1>
            <br />
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceValues.map(die => (<Die
                    value={die.value}
                    key={die.id}
                    isHeld={die.isHeld}
                    onHeld={() => toggle(die.id)}
                />))}
            </div>
            <br />
            <br />
            <button className="rollBtn" onClick={rollDice}>{tenzies ? "Play Again" : "Roll"}</button>
        </main>
    )
}