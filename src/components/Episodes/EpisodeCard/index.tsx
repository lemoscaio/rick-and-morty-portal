import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Episode } from "../../../interfaces/Episode"
import styles from "./EpisodeCard.module.scss"

interface EpisodeCardProps {
	episode: Episode
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
	return (
		<Card
			key={episode.id}
			className={`${styles.card} border-0`}
		>
			<Link
				to={`/episodes/${episode.id}`}
				className="h-100 w-100 d-flex flex-column"
			>
				<Card.Body>
					<div className="d-flex justify-content-between mb-1">
						<div className={`${styles.episodeName}`}>{episode.name}</div>
					</div>

					<Card.Subtitle className={`${styles.episodeNumber} mb-2`}>
						{episode.episode}
					</Card.Subtitle>
					<Card.Text className={`${styles.charactersOnEpisode}`}>
						Characters on episode: {episode.characters.length}
					</Card.Text>
				</Card.Body>
				<Card.Footer className={styles.airDate}>
					<p className="m-0 p-0">Air date: {episode.air_date}</p>
				</Card.Footer>
			</Link>
		</Card>
	)
}
