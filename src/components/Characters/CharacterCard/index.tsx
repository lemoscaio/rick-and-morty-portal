import firstEpisode from "../../../mocks/episode.json"

import { IoIosFemale, IoIosMale } from "react-icons/io"

import { Card } from "react-bootstrap"

import styles from "./CharacterCard.module.scss"

interface Character {
	id: number
	name: string
	status: string
	species: string
	type: string
	gender: string
	origin: {
		name: string
		url: string
	}
	location: {
		name: string
		url: string
	}
	image: string
	episode: string[]
	url: string
	created: string
}

interface CharacterProps {
	character: Character
}

interface Episode {
	id: number
	name: string
	air_date: string
	episode: string
	characters: [string, string]
	url: string
	created: string
}

const genders = {
	Male: <IoIosMale />,
	Female: <IoIosFemale />,
	Unkown: "",
}

const status = {
	Alive: "alive",
	Dead: "dead",
	unknown: "unknown",
}

export default function CharacterCard({ character }: CharacterProps) {
	return (
		<Card
			className={`${styles.card} border-1 rounded-4 mb-2 bg-transparent text-break shadow-sm`}
		>
			<Card.Img src={character.image} />
			<Card.Body className={styles[".card-body"]}>
				<Card.Title
					className={`${styles.cardTitle} pb-1 d-flex align-items-flex-start justify-content-space-between `}
				>
					<div className="p-0 me-2 w-100 flex-fill fs-6">{character.name}</div>
					<div className="lh-1">{genders[character.gender]}</div>
				</Card.Title>
				<Card.Subtitle className="mb-2">
					<Card.Text className="mb-0 fw-bold">{character.species}</Card.Text>
					<Card.Text className="mb-1 fst-italic">{character.type}</Card.Text>
				</Card.Subtitle>
				{character.origin.url.length > 0 ? (
					<>
						<Card.Text className="mb-0 fw-bold">Origin:</Card.Text>
						<Card.Text className="mb-1">{character.origin.name}</Card.Text>
					</>
				) : null}
				{character.location.url.length > 0 ? (
					<>
						<Card.Text className="mb-0 fw-bold">Last known location:</Card.Text>
						<Card.Text className="mb-1">{character.location.name}</Card.Text>
					</>
				) : null}
				{firstEpisode ? (
					<>
						<Card.Text className="mb-0 fw-bold">First seen in:</Card.Text>
						<Card.Text className="mb-1">Episode: {firstEpisode.name}</Card.Text>
					</>
				) : null}
			</Card.Body>
			<Card.Footer className="justify-content-between text-center bg-light">
				<span className="fw-bold">STATUS: </span>
				<span className={styles[status[character.status]]}>
					{character.status.toUpperCase()}
				</span>
			</Card.Footer>
		</Card>
	)
}
