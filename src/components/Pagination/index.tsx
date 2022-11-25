import { Container, Pagination as BootstrapPagination } from "react-bootstrap"

import styles from "./Pagination.module.scss"

interface PaginationProps {
	currentPage: number
	pages: number
	onPaginationClick: (e: React.MouseEvent) => void
}

export default function Pagination({
	currentPage,
	pages,
	onPaginationClick,
}: PaginationProps) {
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
