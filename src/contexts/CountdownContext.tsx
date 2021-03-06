import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react"
import { ChallengeContext } from "./ChallengeContext"

interface CountdownContextData {
    minutes: number
    seconds: number
    hasFinished: boolean
    isActive: boolean
    startCountdown: () => void
    resetCountdown: () => void
}

interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)
// variáveis globais
let countdownTimeout: NodeJS.Timeout
const maxTime = 5

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengeContext)
    
    const [isActive, setIsActive] = useState(false) // variável de estado
    const [hasFinished, setHasFinished] = useState(false) // variável de estado
    const [time, setTime] = useState(maxTime * 60) // variáveis do contador
    
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    
    // função do countdown
    function startCountdown() {
        setIsActive(true)
    }
    
    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setHasFinished(false)
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
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown,
            }}
        >
            {children}
        </CountdownContext.Provider>
    )
}
