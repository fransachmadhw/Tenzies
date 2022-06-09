import React from "react"

export default function Die(props) {
    const styles = {
        // backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    React.useEffect(() => {
        diceIcon()
    })

    function diceIcon() {
        switch (props.value) {
            case 1:
              return <i class='bx bx-dice-1'></i>;

            case 2:
              return <i class='bx bx-dice-2'></i>;

            case 3:
              return <i class='bx bx-dice-3'></i>;

            case 4:
              return <i class='bx bx-dice-4'></i>;

            case 5:
              return <i class='bx bx-dice-5'></i>;

            case 6:
              return <i class='bx bx-dice-6'></i>;

            default:
              return <i class='bx bx-dice-1'></i>;
          }
    }

    return (
        <div className={`die-face ${props.isHeld && 'held'}`} onClick={props.holdDice}>
            {/* <h2 className="die-num">{props.value}</h2> */}
            {diceIcon()}
        </div>
    )
}
