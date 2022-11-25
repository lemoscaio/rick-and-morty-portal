import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Location } from "../../../interfaces/Location"
import styles from "./LocationCard.module.scss"

interface LocationCardProps {
	location: Location
}

export default function LocationCard({ location }: LocationCardProps) {
	return (
		<Card
			key={location.id}
			className={`${styles.card} border-0`}
		>
			<Link
				to={`/locations/${location.id}`}
				className="h-100 w-100 d-flex flex-column"
			>
				<Card.Body>
					<div className="d-flex justify-content-between mb-3">
						<div className={`${styles.locationName}`}>{location.name}</div>
						<div className={`${styles.locationType}`}>{location.type}</div>
					</div>
					{location.dimension && (
						<Card.Subtitle className={`${styles.locationDimension}`}>
							{location.dimension === "unknown"
								? "Unknown dimension"
								: location.dimension}
						</Card.Subtitle>
					)}
				</Card.Body>
				<Card.Footer className={styles.residents}>
					Residents: {location.residents.length}
				</Card.Footer>
			</Link>
		</Card>
	)
}
