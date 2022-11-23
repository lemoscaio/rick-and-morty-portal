import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import CharacterPage from "../pages/CharacterPage"
import CharactersPage from "../pages/CharactersPage"
import EpisodesPage from "../pages/EpisodesPage"
import LocationsPage from "../pages/LocationsPage"

export default function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/"
				element={<MainLayout />}
			>
				<Route
					path="characters"
					element={<CharactersPage />}
				/>
				<Route
					path="characters/:characterId"
					element={<CharacterPage />}
				/>
				<Route
					path="/locations"
					element={<LocationsPage />}
				/>
				<Route
					path="/episodes"
					element={<EpisodesPage />}
				/>
			</Route>
		</Routes>
	)
}
