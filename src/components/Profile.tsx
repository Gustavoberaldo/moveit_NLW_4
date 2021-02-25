import { useContext } from "react"
import { ChallengeContext } from "../contexts/ChallengeContext"
import styles from "../styles/Components/Profile.module.css"

export function Profile() {
    const { level } = useContext(ChallengeContext)
    return (
        <div className={styles.profileContainer}>
            <img src='http://github.com/Gustavoberaldo.png' alt='ma dude' />
            <div>
                <b>Gusta</b>
                <p>
                    <img src='icons/level.svg' alt='level' />
                    Level {level}
                </p>
            </div>
        </div>
    )
}
