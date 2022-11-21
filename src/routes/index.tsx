import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import CharactersPage from "../pages/ChractersPage"
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
					path="/characters"
					element={<CharactersPage />}
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
