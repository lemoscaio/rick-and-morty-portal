import { Link } from "react-router-dom"
import { Character } from "../../../../interfaces/Character"
import { Location } from "../../../../interfaces/Location"
import styles from "../CharacterBasicInfo.module.scss"

const infoToShow = ["status", "gender", "species", "type", "origin", "location"]

const labels = {
	status: "Status",
	gender: "Gender",
	species: "Species",
	type: "Type",
	origin: "Origin",
	location: "Last seen in",
}

interface InfoProps {
	character: Character
	infoName: string
	location: Location
	origin: Location
}

function isOriginOrLocation(infoName: string) {
	return infoName === "origin" || infoName === "location"
}

export default function Info({
	character,
	infoName,
	location,
	origin,
}: InfoProps) {
	function getLocationLink() {
		if (infoName === "origin" && character[infoName].url)
			return `/locations/${origin?.id}`
		if (infoName === "location" && character[infoName].url)
			return `/locations/${location?.id}`

		return ""
	}

	if (infoToShow.includes(infoName)) {
		const property = isOriginOrLocation(infoName) ? (
			<Link
				to={getLocationLink()}
				className={`${styles.propLinkValue}`}
			>
				{character[infoName].name}
			</Link>
		) : (
			<span className={styles.propValue}>{character[infoName]}</span>
		)

		return character[infoName] ? (
			<div
				key={infoName}
				className={styles.info}
			>
				{<span className={styles.label}>{labels[infoName]}:</span>}
				{property}
			</div>
		) : (
			<></>
		)
	} else {
		return <></>
	}
}
