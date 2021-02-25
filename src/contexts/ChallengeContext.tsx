import { createContext, ReactNode, useEffect, useState } from "react"
import challenges from "../../challenges.json"

interface Challenge {
    type: "body" | "eye"
    description: string
    amount: number
}

interface ChallengesContextData {
    level: number
    currentXP: number
    challengesCompleted: number
    experienceToNextLevel: number
    activeChallenge: Challenge
    resetChallenge: () => void
    levelUp: () => void
    startNewChallenge: () => void
    completeChallenge: () => void
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentXP, setCurrentXP] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(
            Math.random() * challenges.length
        )
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission == 'granted'){
            new Notification('Novo desafio 🎉',{
                body: `Valendo ${challenge.amount} xp!` 
            })
        }
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge

        let finalXP = currentXP + amount
        if (finalXP >= experienceToNextLevel) {
            finalXP = finalXP - experienceToNextLevel
            levelUp()
        }

        setCurrentXP(finalXP)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    return (
        <ChallengeContext.Provider
            value={{
                level,
                currentXP,
                challengesCompleted,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
            }}
        >
            {children}
        </ChallengeContext.Provider>
    )
}
