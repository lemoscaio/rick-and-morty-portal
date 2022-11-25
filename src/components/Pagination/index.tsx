import { Container, Pagination as BootstrapPagination } from "react-bootstrap"

import styles from "./Pagination.module.scss"

interface PaginationProps {
	currentPage: number
	pages: number
	setPage: (value: React.SetStateAction<number>) => void
}

export default function Pagination({
	currentPage,
	pages,
	setPage,
}: PaginationProps) {
	function onPaginationClick(e: React.MouseEvent) {
		const name = e.currentTarget.id

		if (name === "page-first") {
			setPage(1)
		}
		if (name === "page-last") {
			setPage(pages)
		}

		if (name === "page-back") {
			setPage((prev) => {
				if (prev > 1) return prev - 1
				return prev
			})
		}
		if (name === "page-next") {
			setPage((prev) => {
				if (prev < pages) return prev + 1
				return prev
			})
		}
	}

	return (
		<Container
			className={`${styles.paginationWrapper} mt-3 d-flex justify-content-center`}
		>
			<BootstrapPagination>
				<BootstrapPagination.First
					disabled={currentPage === 1 ? true : false}
					id="page-first"
					onClick={onPaginationClick}
				/>
				<BootstrapPagination.Prev
					id="page-back"
					onClick={onPaginationClick}
				/>
				<BootstrapPagination.Item active>
					{currentPage}
				</BootstrapPagination.Item>
				<BootstrapPagination.Next
					id="page-next"
					onClick={onPaginationClick}
				/>
				<BootstrapPagination.Last
					disabled={currentPage === pages ? true : false}
					id="page-last"
					onClick={onPaginationClick}
				/>
			</BootstrapPagination>
		</Container>
	)
}
