import EpisodeCard from "../EpisodeCard"

import styles from "./Board.module.scss"

interface BoardProps {
	episodes: string[]
}

export default function Board({ episodes }: BoardProps) {
	return (
		<div className={`${styles.board} shadow`}>
			<h4 className={styles.title}>Episodes</h4>
			<div className={styles.boardContent}>
				{episodes?.map((episodeUrl) => {
					return (
						<EpisodeCard
							episodeUrl={episodeUrl}
							key={episodeUrl}
						/>
					)
				})}
			</div>
		</div>
	)
}
