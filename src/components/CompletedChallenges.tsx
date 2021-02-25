import { useContext } from "react"
import { ChallengeContext } from "../contexts/ChallengeContext"
import styles from "../styles/Components/CompletedChallenges.module.css"

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengeContext)
    return (
        <div className={styles.competedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}
