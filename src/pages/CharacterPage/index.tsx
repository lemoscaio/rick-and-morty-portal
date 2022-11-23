import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate, useParams } from "react-router-dom"

import { Button, Image } from "react-bootstrap"

import { Character } from "../../interfaces/Character"
import { api } from "../../services/api"
import styles from "./CharacterPage.module.scss"

import PageTitle from "../../components/PageTitle"

export default function CharacterPage() {
	const { characterId } = useParams()
	const navigate = useNavigate()

	const [character, setCharacter] = useState<Character | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		async function fetchCharacter() {
			const { data } = await api.get<Character>(`/character/${characterId}`)
			setCharacter(data)
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
		<div className={styles.wrapper}>
			<Button
				className={`d-flex align-items-center shadow-sm border-0 ${styles.button}`}
				onClick={() => navigate(-1)}
			>
				<BiArrowBack className="me-2 lh-1" /> <span>Go back</span>
			</Button>
			<div className="d-flex w-100 justify-content-center p-3">
				{character?.image && (
					<Image
						src={character?.image}
						roundedCircle
						thumbnail
						width="150"
					/>
				)}
			</div>
			<PageTitle>{character?.name}</PageTitle>
		</div>
	)
}
