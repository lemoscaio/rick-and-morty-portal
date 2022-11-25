import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Character } from "../../../interfaces/Character"
import { api } from "../../../services/api"

import styles from "./CharacterSmallCard.module.scss"

interface CharacterSmallCardProps {
	characterUrl: string
}

export default function CharacterSmallCard({
	characterUrl,
}: CharacterSmallCardProps) {
	const [character, setCharacter] = useState<Character | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		async function fetchCharacter() {
			const result = await api.get<Character>(characterUrl)
			const { data } = result

			if (data) setCharacter(data)
		}
		try {
			fetchCharacter()
		} catch (error) {
			if (controller.signal.aborted) return
			console.log(error)
		}

		return () => controller.abort()
	}, [])

	return (
		<>
			<Link to={`/characters/${character?.id}`}>
				<div className={styles.characterSmallCard}>
					<img
						className={styles.image}
						src={character?.image}
					/>
					<p className={styles.characterInfo}>{character?.name}</p>
				</div>
			</Link>
		</>
	)
}
