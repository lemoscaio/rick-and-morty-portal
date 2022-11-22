import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { GiHamburgerMenu } from "react-icons/gi"

import MortyIcon from "/morty.png"
import styles from "./Header.module.scss"

import { Container, Navbar, Nav } from "react-bootstrap"

export default function Header() {
	const navigate = useNavigate()
	const [selectedOption, setSelectedOption] = useState("characters")

	function onMenuClick(menuOption: string | null) {
		if (!menuOption || selectedOption === menuOption) return

		setSelectedOption(menuOption)
		return navigate(menuOption)
	}

	return (
		<Navbar
			className={`${styles.navbar} px-3 py-0 shadow`}
			expand="md"
			sticky="top"
			collapseOnSelect
		>
			<Container>
				<Navbar.Brand className="me-2 text-light user-select-none">
					<img
						src={MortyIcon}
						height="50"
						className="me-3"
					/>
					Rick and Morty
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav">
					<GiHamburgerMenu className="text-light" />
				</Navbar.Toggle>
				<Navbar.Collapse
					id="responsive-navbar-nav"
					className="justify-content-end mb-2"
				>
					<Nav
						justify
						activeKey={selectedOption}
						onSelect={(menuOption) => onMenuClick(menuOption)}
						className="align-items-center"
					>
						<Nav.Item
							className="py-sm-2"
							bsPrefix="nav-item"
						>
							<Nav.Link
								eventKey="characters"
								className="text-light"
							>
								Characters
							</Nav.Link>
						</Nav.Item>
						<Nav.Item
							className="py-sm-2"
							bsPrefix="nav-item"
						>
							<Nav.Link
								eventKey="locations"
								className="text-light"
							>
								Locations
							</Nav.Link>
						</Nav.Item>
						<Nav.Item
							className="py-sm-2"
							bsPrefix="nav-item"
						>
							<Nav.Link
								eventKey="episodes"
								className="text-light"
							>
								Episodes
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
