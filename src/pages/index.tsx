import { GetServerSideProps } from "next"
import { CompletedChallenges } from "../components/CompletedChallenges"
import { Countdown } from "../components/Countdown"
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile"
import { ChallengeBox } from "../components/ChallengeBox"
import { CountdownProvider } from "../contexts/CountdownContext"
import { ChallengesProvider } from "../contexts/ChallengeContext"

import Head from "next/head"

import styles from "../styles/pages/Home.module.css"

interface HomeProps {
    level: number
    currentXP: number
    challengesCompleted: number
}

export default function Home(props: HomeProps) {
    // console.log(props)
    return (
        <ChallengesProvider
            level={props.level}
            currentXP={props.currentXP}
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                <Head>
                    <title>Início | move.it</title>
                </Head>
                <ExperienceBar />
                <CountdownProvider>
                    <section>
                        <div>
                            <Profile></Profile>
                            <CompletedChallenges></CompletedChallenges>
                            <Countdown></Countdown>
                        </div>
                        <div>
                            <ChallengeBox></ChallengeBox>
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    )
}

// essa função abaixo, roda somente no back-end, ela roda antes da página ser acessada no next.
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { level, currentXP, challengesCompleted } = ctx.req.cookies
    return {
        props: {
            level: Number(level),
            currentXP: Number(currentXP),
            challengesCompleted: Number(challengesCompleted),
        },
    }
}
