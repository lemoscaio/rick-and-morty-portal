import Masonry from "react-masonry-css"
import characters from "../../../mocks/characters.json"

import styles from "./CharactersList.module.scss"

import CharacterCard from "../CharacterCard"

const masonryBreakpointColumnsObj = {
	default: 5,
	1400: 4,
	1200: 4,
	992: 3,
	768: 2,
	576: 2,
}

export default function CharactersList() {
	return (
		<>
			{/* <Container className={`mt-3 p-0 ${styles.CharactersList}`}> */}
			<Masonry
				breakpointCols={masonryBreakpointColumnsObj}
				className={`${styles.myMasonryGrid} mt-3`}
				columnClassName={styles.myMasonryGridColumn}
			>
				{characters.results.map((character) => (
					<CharacterCard
						character={character}
						key={character.id}
					></CharacterCard>
				))}
			</Masonry>
			{/* </Container> */}
		</>
	)
}
