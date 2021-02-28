import { useContext } from "react"
import { ChallengeContext } from "../contexts/ChallengeContext"
import styles from "../styles/Components/LevelUpModal.module.css"

export function LevelUpModal() {
    const { level, closelevelUpModal } = useContext(ChallengeContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <b>Parabéns</b>
                <p>você alcançou um novo level</p>
                <button type='button' onClick={closelevelUpModal}>
                    <img src='/icons/close.svg' alt='fechar modal' />
                </button>
            </div>
        </div>
    )
}
