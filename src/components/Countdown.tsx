import { useState, useEffect, useContext } from "react"
import { ChallengeContext } from "../contexts/ChallengeContext"
import styles from "../styles/Components/Countdown.module.css"

// variáveis globais
let countdownTimeout: NodeJS.Timeout
let maxTime = 0.1

export function Countdown() {
    const {startNewChallenge} = useContext(ChallengeContext)

    const [isActive, setIsActive] = useState(false) // variável de estado
    const [hasFinished, setHasFinished] = useState(false) // variável de estado
    const [time, setTime] = useState(maxTime * 60) // variáveis do contador

    
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("")
    const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("")

    // função do countdown
    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(maxTime * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {hasFinished ? (
                <button
                disabled
                className={styles.CountdownButton}
            >
                Ciclo encerrado
            </button>
            ) : (
                <>
                    {isActive ? (
                        <button
                            type='button'
                            className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button
                            type='button'
                            className={styles.CountdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                        </button>
                    )}
                </>
            )}
        </div>
    )
}
