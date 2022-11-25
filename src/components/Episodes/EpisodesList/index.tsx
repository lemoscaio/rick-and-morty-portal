import { useCallback, useEffect, useState } from "react"

import { Container } from "react-bootstrap"
import { ApiInfo, ApiResult } from "../../../interfaces/api"
import { api } from "../../../services/api"

import { Episode } from "../../../interfaces/Episode"
import { Episodes } from "../../../interfaces/Episodes"
import Pagination from "../../Pagination"
import styles from "./EpisodesList.module.scss"
import EpisodeCard from "../EpisodeCard"

export interface ApiEpisodesResult extends ApiResult {
	results: Episodes
}

export default function EpisodesList() {
	const [page, setPage] = useState(1)
	const [episodes, setEpisodes] = useState<Episodes>([])
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
			fetchEpisodes(page)
		} catch (error) {
			if (controller.signal.aborted) return
			console.log(error)
		}

		return () => controller.abort()
	}, [page])

	const fetchEpisodes = useCallback(
		async (currentPage: number) => {
			const { data } = await api.get<ApiEpisodesResult>(
				`/episode?page=${currentPage}`,
			)
			console.log(data)
			setApiInfo(data.info)
			setEpisodes(data.results)
		},
		[episodes, apiInfo],
	)

	return (
		<>
			<Container className={`mt-3 p-0 ${styles.EpisodesList}`}>
				{episodes &&
					episodes.map((episode: Episode) => {
						return (
							<EpisodeCard
								key={episode.id}
								episode={episode}
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
