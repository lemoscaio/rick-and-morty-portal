import { Container } from "react-bootstrap"
import BackButton from "../../components/BackButton"
import PageTitle from "../../components/PageTitle"
import notFoundImage from "/notfound.png"

import styles from "./notFoundPage.module.scss"

export default function NotFoundPage() {
	return (
		<section className={styles.notFoundPage}>
			<h1 className={styles.title}>
				Oh no! Seems you&apos;re in a pickle, Rick!
			</h1>
			<h5 className={styles.message}>Page not found</h5>
			<Container className="d-flex justify-content-center mb-5">
				<img
					src={notFoundImage}
					className={styles.image}
				/>
			</Container>
			<Container className="d-flex justify-content-center pb-5 mb-5">
				<BackButton />
			</Container>
		</section>
	)
}
