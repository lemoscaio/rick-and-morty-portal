import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Image } from "react-bootstrap"

import { Character } from "../../interfaces/Character"
import { api } from "../../services/api"
import styles from "./CharacterPage.module.scss"

import BackButton from "../../components/BackButton"
import Board from "../../components/Board"
import CharacterBasicInfo from "../../components/Characters/CharacterBasicInfo"
import PageTitle from "../../components/PageTitle"

export default function CharacterPage() {
	const { characterId } = useParams()

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
			<BackButton />
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
			<div
				className={`${styles.informationWrapper} mt-3 d-flex flex-column flex- fill w-100`}
			>
				<h4 className="text-center mb-1">Informations</h4>
				{character && <CharacterBasicInfo character={character} />}
				<Board episodes={character?.episode as string[]} />
			</div>
		</div>
	)
}
