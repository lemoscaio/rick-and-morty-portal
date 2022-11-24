import { Button } from "react-bootstrap"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

import styles from "./BackButton.module.scss"

export default function BackButton() {
	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
			<Button
				className={`d-flex align-items-center shadow-sm border-0 ${styles.button}`}
				onClick={() => navigate(-1)}
			>
				<BiArrowBack className="me-2 lh-1" /> <span>Go back</span>
			</Button>
		</div>
	)
}
