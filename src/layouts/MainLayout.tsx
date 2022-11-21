import { Outlet } from "react-router-dom"
import Header from "../components/Header"

import { Container } from "react-bootstrap"

export default function MainLayout() {
	return (
		<>
			<Header />
			<Container className="py-3">
				<Outlet />
			</Container>
		</>
	)
}
