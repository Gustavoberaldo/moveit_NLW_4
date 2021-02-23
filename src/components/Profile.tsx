import styles from "../styles/Components/Profile.module.css"

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src='http://github.com/Gustavoberaldo.png' alt='ma dude' />
            <div>
                <b>Gusta</b>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level 1
                </p>
            </div>
        </div>
    )
}
