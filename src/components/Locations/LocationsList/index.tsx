import { useCallback, useEffect, useState } from "react"

import { Container } from "react-bootstrap"
import { ApiInfo, ApiResult } from "../../../interfaces/api"
import { Location } from "../../../interfaces/Location"
import { Locations } from "../../../interfaces/Locations"
import { api } from "../../../services/api"

import Pagination from "../../Pagination"
import LocationCard from "../LocationCard"
import styles from "./LocationsList.module.scss"

export interface ApiLocationsResult extends ApiResult {
	results: Locations
}

export default function LocationsList() {
	const [page, setPage] = useState(1)
	const [locations, setLocations] = useState<Location[]>([])
	const [apiInfo, setApiInfo] = useState<ApiInfo>({
		count: 0,
		pages: 0,
		next: null,
		prev: null,
	})

	useEffect(() => {
		const controller = new AbortController()

		try {
			fetchLocations(page)
		} catch (error) {
			if (controller.signal.aborted) return
			console.log(error)
		}

		return () => controller.abort()
	}, [page])

	const fetchLocations = useCallback(
		async (currentPage: number) => {
			const { data } = await api.get<ApiLocationsResult>(
				`/location?page=${currentPage}`,
			)
			setApiInfo(data.info)
			setLocations(data.results)
		},
		[locations, apiInfo],
	)

	return (
		<>
			<Container className={`mt-3 p-0 ${styles.LocationsList}`}>
				{locations &&
					locations.map((location: Location) => {
						return (
							<LocationCard
								key={location.id}
								location={location}
							/>
						)
					})}
			</Container>
			<Container className="mt-3 d-flex justify-content-center">
				<Pagination
					currentPage={page}
					pages={apiInfo.pages}
					setPage={setPage}
				/>
			</Container>
		</>
	)
}
