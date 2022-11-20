import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<MainLayout />}
					>
						<Route
							path="/characters"
							element={
								<>
									<div style={{ backgroundColor: "#f00" }}>Characters</div>
								</>
							}
						/>
						<Route
							path="/locations"
							element={
								<>
									<div>Locations</div>
								</>
							}
						/>
						<Route
							path="/episodes"
							element={
								<>
									<div>Episodes</div>
								</>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
