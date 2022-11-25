import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import CharacterPage from "../pages/CharacterPage"
import CharactersPage from "../pages/CharactersPage"
import EpisodePage from "../pages/EpisodePage.tsx"
import EpisodesPage from "../pages/EpisodesPage"
import LocationPage from "../pages/LocationPage"
import LocationsPage from "../pages/LocationsPage"
import NotFoundPage from "../pages/NotFoundPage"

export default function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/"
				element={<MainLayout />}
			>
				<Route
					index
					element={<CharactersPage />}
				/>
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
					path="/locations/:locationId"
					element={<LocationPage />}
				/>
				<Route
					path="/episodes"
					element={<EpisodesPage />}
				/>
				<Route
					path="/episodes/:episodeId"
					element={<EpisodePage />}
				/>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Route>
		</Routes>
	)
}
