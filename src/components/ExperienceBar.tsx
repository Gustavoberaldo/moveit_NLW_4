import { useContext } from "react"
import { ChallengeContext } from "../contexts/ChallengeContext"
import styles from "../styles/Components/ExperienceBar.module.css"

export function ExperienceBar() {
    const { currentXP, experienceToNextLevel } = useContext(ChallengeContext)

    const percentToNextLevel = Math.round(currentXP * 100) / experienceToNextLevel

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span
                    className={styles.currentExperience}
                    style={{ left: `${percentToNextLevel}%` }}
                >
                    {currentXP} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}
