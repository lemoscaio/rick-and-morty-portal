import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import BackButton from "../../components/BackButton"
import Board from "../../components/Board"
import CharacterSmallCard from "../../components/Characters/CharacterSmallCard"
import PageTitle from "../../components/PageTitle"
import { Location } from "../../interfaces/Location"
import { api } from "../../services/api"

import styles from "./LocationPage.module.scss"

export default function LocationPage() {
	const { locationId } = useParams()

	const [location, setLocation] = useState<Location | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		async function fetchLocation() {
			const { data } = await api.get<Location>(`/location/${locationId}`)
			setLocation(data)
		}
		try {
			fetchLocation()
		} catch (error) {
			if (controller.signal.aborted) return
			console.log(error)
		}

		return () => controller.abort()
	}, [])

	return (
		<div className={styles.wrapper}>
			<BackButton />
			<div className="mt-3">
				<PageTitle>{location?.name}</PageTitle>
			</div>
			<div className="mt-3">
				<h4 className="text-center mb-1">Informations</h4>
				<Container className="justify-content-center">
					<div className="text-center">
						<span className={styles.label}>Type: </span>
						<span className={styles.property}>{location?.type}</span>
					</div>
					<div className="text-center">
						<span className={styles.label}>Dimension: </span>
						<span className={styles.property}>{location?.dimension}</span>
					</div>
				</Container>
				<Container className="mt-3">
					<Board label="Residents">
						{location?.residents.map((resident) => {
							return (
								<CharacterSmallCard
									key={resident}
									characterUrl={resident}
								/>
							)
						})}
					</Board>
				</Container>
			</div>
		</div>
	)
}
