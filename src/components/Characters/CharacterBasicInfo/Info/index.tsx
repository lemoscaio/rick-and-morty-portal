import { Link } from "react-router-dom"
import { Character } from "../../../../interfaces/Character"
import { Location } from "../../../../interfaces/Location"
import styles from "../CharacterBasicInfo.module.scss"

const infoToShow = ["status", "gender", "species", "origin", "location"]

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
	if (infoToShow.includes(infoName)) {
		const property = isOriginOrLocation(infoName) ? (
			<Link
				to={
					infoName === "origin"
						? `/locations/${origin?.id}`
						: `/locations/${location?.id}`
				}
				className={`${styles.propLinkValue}`}
			>
				{character[infoName].name}
			</Link>
		) : (
			<span className={styles.propValue}>{character[infoName]}</span>
		)

		return (
			<div
				key={infoName}
				className={styles.info}
			>
				{
					<span className={styles.label}>
						{infoName[0].toUpperCase() + infoName.substring(1)}:
					</span>
				}
				{property}
			</div>
		)
	} else {
		return <></>
	}
}
