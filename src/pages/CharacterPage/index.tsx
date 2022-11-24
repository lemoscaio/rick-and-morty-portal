import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Image } from "react-bootstrap"

import { Character } from "../../interfaces/Character"
import { api } from "../../services/api"
import styles from "./CharacterPage.module.scss"

import BackButton from "../../components/BackButton"
import Board from "../../components/Board"
import PageTitle from "../../components/PageTitle"

const infoToShow = ["status", "gender", "species", "origin", "location"]

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

	console.log(character)

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
				<div className={styles.basicInfo}>
					{character &&
						Object.keys(character).map((characterProp) => {
							if (infoToShow.includes(characterProp)) {
								const label = (
									<span className={styles.label}>
										{characterProp[0].toUpperCase() +
											characterProp.substring(1)}
									</span>
								)
								const property =
									characterProp === "origin" || characterProp === "location" ? (
										<span className={styles.propValue}>
											{character[characterProp].name}
										</span>
									) : (
										<span className={styles.propValue}>
											{character[characterProp]}
										</span>
									)

								return (
									<div
										key={characterProp}
										className={styles.info}
									>
										{label}: {property}
									</div>
								)
							}
						})}
					{/* {character?.status && (
						<p>
							Status: <span>{character?.status}</span>
						</p>
					)}
					{character?.gender && (
						<p>
							Gender: <span>{character?.gender}</span>
						</p>
					)}
					{character?.species && (
						<p>
							Species: <span>{character?.species}</span>
						</p>
					)}
					{character?.type && (
						<p>
							Type: <span>{character?.type}</span>
						</p>
					)}
					{character?.origin.name && (
						<p>
							Origin: <span>{character?.origin.name}</span>
						</p>
					)}
					{character?.location.name && (
						<p>
							Location: <span>{character?.location.name}</span>
						</p>
					)} */}
				</div>
				<Board episodes={character?.episode as string[]} />
			</div>
		</div>
	)
}
