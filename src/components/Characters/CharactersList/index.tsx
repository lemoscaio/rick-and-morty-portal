import { useCallback, useEffect, useState } from "react"

import Masonry from "react-masonry-css"
import styles from "./CharactersList.module.scss"

import CharacterCard from "../CharacterCard"
import { Characters } from "../../../interfaces/Characters"
import { api } from "../../../services/api"
import axios from "axios"
import { useInView } from "react-intersection-observer"
import { ApiInfo, ApiResult } from "../../../interfaces/api"
import { Accordion, Button, ButtonGroup, Container } from "react-bootstrap"

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
	const [filters, setFilters] = useState({
		name: "",
		status: "",
	})
	const [isFiltered, setIsFiltered] = useState(false)

	const { ref } = useInView({
		onChange: (inView) => {
			if (inView) fetchMoreCharacters()
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
	}, [isFiltered])

	const fetchCharacters = useCallback(async () => {
		const { data } = await api.get<ApiCharactersResult>(
			`/character${transformFilterToQueryString()}`,
		)

		setApiInfo(data.info)
		setCharacters(data.results)
	}, [filters, characters, apiInfo])

	const fetchMoreCharacters = useCallback(async () => {
		if (apiInfo?.next && apiInfo?.next?.length > 0) {
			const { data } = await axios.get<ApiCharactersResult>(apiInfo.next)

			setApiInfo(data.info)
			setCharacters((prev) => prev.concat(data.results))
		}
	}, [filters, characters, apiInfo])

	function transformFilterToQueryString() {
		const filterKeys = Object.keys(filters)
		const queryString = filterKeys.reduce((acc, curr, currentIndex) => {
			if (filters[curr])
				return (
					acc +
					`${curr}=${filters[curr]}${
						currentIndex === filterKeys.length - 1 ? "" : "&"
					}`
				)
			else return acc
		}, "?")

		return queryString
	}

	// TODO use useReducer instead
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFilters({ ...filters, name: e.target.value })
	}

	function onFilterChange(newStatus: string) {
		setFilters({ ...filters, status: newStatus })
	}

	function onFilterSubmit() {
		if (isFiltered) fetchCharacters()
		else {
			setIsFiltered(true)
		}
	}

	function onClearFilter() {
		setFilters({ name: "", status: "" })
		setIsFiltered(false)
	}

	function styleActiveButton(label: string) {
		if (filters.status === label) return "active"
		return ""
	}

	return (
		<>
			<Accordion
				className={`${styles.filterContainer} d-flex flex-column justify-content-center m-0 pt-3`}
			>
				<Accordion.Item
					eventKey="0"
					className={`${styles.accordionItem} m-0 p-0 border-0`}
				>
					<Accordion.Header className={`${styles.accordionHeader}`}>
						Filters
					</Accordion.Header>
					<Accordion.Body className="m-0 p-0">
						<Container className={`${styles.inputContainer} px-3 py-3`}>
							<label
								htmlFor="name-filter"
								className="pe-2"
							>
								Filter by name:{" "}
							</label>
							<input
								className={styles.filterInput}
								id="name-filter"
								name="name-filter"
								type="text"
								value={filters.name}
								placeholder="Character name"
								onChange={handleInputChange}
							/>
						</Container>
						<ButtonGroup
							className={`${styles.buttonGroup} mb-2 w-100 px-3 py-1`}
						>
							<Button
								className={`${styles.button} ${styleActiveButton("alive")}`}
								onClick={() => onFilterChange("alive")}
							>
								Alive
							</Button>
							<Button
								className={`${styles.button} ${styleActiveButton("dead")}`}
								onClick={() => onFilterChange("dead")}
							>
								Dead
							</Button>
							<Button
								className={`${styles.button} ${styleActiveButton("unknown")}`}
								onClick={() => onFilterChange("unknown")}
							>
								Unknown
							</Button>
						</ButtonGroup>
						<ButtonGroup
							className={`${styles.buttonGroup} mb-2 w-100 px-3 py-1`}
						>
							<Button
								className={`${styles.button}`}
								onClick={onFilterSubmit}
							>
								Filter
							</Button>
							<Button
								className={`${styles.button}`}
								onClick={onClearFilter}
							>
								Clear
							</Button>
						</ButtonGroup>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
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
