import { useCallback, useEffect, useState } from "react"

import Masonry from "react-masonry-css"
import styles from "./CharactersList.module.scss"

import CharacterCard from "../CharacterCard"
import { Characters } from "../../../interfaces/Characters"
import { api } from "../../../services/api"
import axios from "axios"
import { useInView } from "react-intersection-observer"
import { ApiInfo, ApiResult } from "../../../interfaces/api"

const masonryBreakpointColumnsObj = {
	default: 5,
	1400: 4,
	1200: 4,
	992: 3,
	768: 2,
	576: 2,
}

export interface ApiCharactersResult extends ApiResult {
	results: Characters
}

export default function CharactersList() {
	const [characters, setCharacters] = useState<Characters>([])
	const [apiInfo, setApiInfo] = useState<ApiInfo>({
		count: 0,
		pages: 0,
		next: null,
		prev: null,
	})

	const { ref } = useInView({
		onChange: (inView) => {
			if (inView) fetchCharacters()
		},
		threshold: 0,
		rootMargin: "50px",
	})

	useEffect(() => {
		const controller = new AbortController()

		try {
			fetchCharacters()
		} catch (error) {
			if (controller.signal.aborted) return
			console.log(error)
		}

		return () => controller.abort()
	}, [])

	const fetchCharacters = useCallback(async () => {
		if (apiInfo?.next && apiInfo?.next?.length > 0) {
			const { data } = await axios.get<ApiCharactersResult>(apiInfo.next)

			setApiInfo(data.info)
			setCharacters((prev) => prev.concat(data.results))
		} else {
			const { data } = await api.get<ApiCharactersResult>("/character")

			setApiInfo(data.info)
			setCharacters(data.results)
		}
	}, [characters, apiInfo])

	return (
		<>
			<Masonry
				breakpointCols={masonryBreakpointColumnsObj}
				className={`${styles.myMasonryGrid} mt-3`}
				columnClassName={styles.myMasonryGridColumn}
			>
				{characters.map((character, index) => (
					<CharacterCard
						character={character}
						key={character.id}
						ref={characters.length - 5 === index ? ref : null}
					></CharacterCard>
				))}
			</Masonry>
		</>
	)
}
