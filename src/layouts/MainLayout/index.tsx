import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"

import styles from "./MainLayout.module.scss"

import Header from "../../components/Header"

export default function MainLayout() {
	return (
		<>
			<Header />
			<main className={styles.mainLayout}>
				<Container className="py-3 flex-fill border-0">
					<Outlet />
				</Container>
			</main>
		</>
	)
}
