import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import BackButton from "../../components/BackButton"
import Board from "../../components/Board"
import CharacterSmallCard from "../../components/Characters/CharacterSmallCard"
import PageTitle from "../../components/PageTitle"
import { Episode } from "../../interfaces/Episode"
import { api } from "../../services/api"

import styles from "./EpisodePage.module.scss"

export default function EpisodePage() {
	const { episodeId } = useParams()

	const [episode, setEpisode] = useState<Episode | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		async function fetchEpisode() {
			const { data } = await api.get<Episode>(`/episode/${episodeId}`)
			setEpisode(data)
		}
		try {
			fetchEpisode()
		} catch (error) {
			if (controller.signal.aborted) return
			console.log(error)
		}

		return () => controller.abort()
	}, [])

	return (
		<div className={styles.wrapper}>
			<BackButton />
			<div className="mt-3">
				<PageTitle>{episode?.name}</PageTitle>
			</div>
			<div className="mt-3">
				<h4 className="text-center mb-2">Informations</h4>
				<Container className="justify-content-center">
					<div className="text-center">
						<span className={styles.label}>Episode: </span>
						<span className={styles.property}>{episode?.episode}</span>
					</div>
					<div className="text-center">
						<span className={styles.label}>Air date: </span>
						<span className={styles.property}>{episode?.air_date}</span>
					</div>
				</Container>
				<Container className="mt-3">
					<Board label="Residents">
						{episode?.characters.map((character) => {
							return (
								<CharacterSmallCard
									key={character}
									characterUrl={character}
								/>
							)
						})}
					</Board>
				</Container>
			</div>
		</div>
	)
}
