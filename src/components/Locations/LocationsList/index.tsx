import { useState, useEffect, useCallback } from "react"
import axios from "axios"

import { Container } from "react-bootstrap"
import { ApiInfo, ApiResult } from "../../../interfaces/api"
import { Location } from "../../../interfaces/Location"
import { Locations } from "../../../interfaces/Locations"
import { api } from "../../../services/api"

import styles from "./LocationsList.module.scss"
import LocationCard from "../LocationCard"
import Pagination from "../../Pagination"

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
			console.log("UseEffect")
			fetchLocations(page)
		} catch (error) {
			if (controller.signal.aborted) return
			console.log(error)
		}

		return () => controller.abort()
	}, [page])

	const fetchLocations = useCallback(
		async (currentPage: number) => {
			console.log("Fetching")
			const { data } = await api.get<ApiLocationsResult>(
				`/location?page=${currentPage}`,
			)
			console.log(data)
			setApiInfo(data.info)
			setLocations(data.results)
		},
		[locations, apiInfo],
	)

	function onPaginationClick(e: React.MouseEvent) {
		const name = e.currentTarget.id

		if (name === "page-first") {
			setPage(1)
		}
		if (name === "page-last") {
			setPage(apiInfo.pages)
		}

		if (name === "page-back") {
			setPage((prev) => {
				if (prev > 1) return prev - 1
				return prev
			})
		}
		if (name === "page-next") {
			setPage((prev) => {
				if (prev < apiInfo.pages) return prev + 1
				return prev
			})
		}
	}

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
					onPaginationClick={onPaginationClick}
				/>
			</Container>
		</>
	)
}
