import React from 'react';
import { useStopwatch } from 'react-timer-hook';

export default function Stopwatch(props) {
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      reset,
    } = useStopwatch({ autoStart: true });

    const timePlayed = `${hours}:${minutes}:${seconds}`
    const bestTime = JSON.parse(localStorage.getItem('bestTime'))

    React.useEffect(() => {
        if(props.tenzies) {
            pause()
            if(!bestTime) {
                localStorage.setItem('bestTime', JSON.stringify(timePlayed))
            }
            if(timePlayed < bestTime) {
                localStorage.setItem('bestTime', JSON.stringify(timePlayed))
            }
        }
    })

    function startTime() {
        reset()
        start()
    }

    function resetTime() {
        reset()
        pause()
    }

    // React.useEffect(() => {
    //     if(props.tenzies) {
    //         reset()
    //     }
    // })

    return (
        <div className='time-container'>
            <div className='time-set'>
                <div>Time spent: {timePlayed}</div>
                <div>Best time: {bestTime ? bestTime : "You haven't played yet"}</div>
            </div>
            <div className='time-buttons'>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )
}