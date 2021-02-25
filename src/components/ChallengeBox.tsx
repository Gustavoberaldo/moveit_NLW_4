import { useContext } from "react"
import { ChallengeContext } from "../contexts/ChallengeContext"
import styles from "../styles/Components/ChallengeBox.module.css"

export function ChallengeBox() {
    const {activeChallenge, resetChallenge} = useContext(ChallengeContext)

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt='' />
                        <b>Novo desafio</b>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            type='button'
                            className={styles.challengeFailedButton}
                            onClick={resetChallenge}
                        >
                            Falhei
                        </button>
                        <button
                            type='button'
                            className={styles.challengeSucceededButton}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <b>A cada ciclo um novo desafio</b>
                    <p>
                        <img src='icons/level-up.svg' alt='level up' />
                        Avance de level completando desafios
                    </p>
                </div>
            )}
        </div>
    )
}
