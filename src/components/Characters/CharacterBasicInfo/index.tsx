import axios from "axios"
import { useState, useEffect } from "react"

import { Character } from "../../../interfaces/Character"
import { Location } from "../../../interfaces/Location"
import styles from "./CharacterBasicInfo.module.scss"
import Info from "./Info"

interface CharacterBasicInfoProps {
	character: Character
}

export default function CharacterBasicInfo({
	character,
}: CharacterBasicInfoProps) {
	const [location, setLocation] = useState<Location | null>(null)
	const [origin, setOrigin] = useState<Location | null>(null)

	useEffect(() => {
		async function fetchOrigin() {
			if (character.origin.url) {
				const { data } = await axios.get(character.origin.url)
				console.log("origin", data)
				setOrigin(data)
			}
		}
		async function fetchLocation() {
			if (character.location.url) {
				const { data } = await axios.get(character.location.url)
				console.log("location", data)
				setLocation(data)
			}
		}

		const controller = new AbortController()

		try {
			fetchOrigin()
			fetchLocation()
		} catch (error) {
			if (controller.signal.aborted) return
			console.log(error)
		}

		return () => controller.abort()
	}, [])

	return (
		<div className={styles.basicInfo}>
			{character &&
				Object.keys(character).map((infoName) => {
					return (
						<Info
							key={infoName}
							character={character}
							infoName={infoName}
							location={location as Location}
							origin={origin as Location}
						/>
					)
				})}
		</div>
	)
}
