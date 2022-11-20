import { useState } from "react"
import { useNavigate } from "react-router-dom"

import MortyIcon from "/morty.png"

import { Navbar, Nav } from "react-bootstrap"

export default function Header() {
	const navigate = useNavigate()
	const [selectedOption, setSelectedOption] = useState("characters")

	function onMenuClick(menuOption: string | null) {
		if (!menuOption || selectedOption === menuOption) return

		setSelectedOption(menuOption)
		return navigate(menuOption)
	}

	return (
		<header>
			<Navbar
				className="px-3 py-2 border-bottom"
				expand="md"
				sticky="top"
				collapseOnSelect
			>
				<Navbar.Brand className="me-2">
					<img
						src={MortyIcon}
						height="50"
						className="me-3"
					/>
					Rick and Morty
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					id="responsive-navbar-nav"
					className="justify-content-end"
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
							<Nav.Link eventKey="characters">Characters</Nav.Link>
						</Nav.Item>
						<Nav.Item
							className="py-sm-2"
							bsPrefix="nav-item"
						>
							<Nav.Link eventKey="locations">Locations</Nav.Link>
						</Nav.Item>
						<Nav.Item
							className="py-sm-2"
							bsPrefix="nav-item"
						>
							<Nav.Link eventKey="episodes">Episodes</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	)
}
