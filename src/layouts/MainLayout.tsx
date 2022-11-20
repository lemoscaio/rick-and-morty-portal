import { Outlet } from "react-router-dom"
import Header from "../components/Header"

import { Container } from "react-bootstrap"

export default function MainLayout() {
	return (
		<>
			<Header />
			<Container className="w-100 m-0 px-3 py-3">
				<Outlet />
			</Container>
		</>
	)
}
