import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { Episode } from "../../../interfaces/Episode"

import styles from "./EpisodeCard.module.scss"

interface EpisodeCardProps {
	episodeUrl: string
}

export default function EpisodeSmallCard({ episodeUrl }: EpisodeCardProps) {
	const [episode, setEpisode] = useState<Episode>()

	useEffect(() => {
		const controller = new AbortController()

		async function fetchEpisode() {
			const { data } = await axios.get<Episode>(episodeUrl)

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
		<>
			<article className={`${styles.episodeCard} shadow-sm`}>
				<Link to={`/episodes/${episode?.id}`}>
					<div className={styles.episodeNumber}>{episode?.episode}</div>
					<span>{episode?.name}</span>
				</Link>
			</article>
		</>
	)
}
