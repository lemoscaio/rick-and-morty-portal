import styles from "./Board.module.scss"

interface BoardProps {
	label?: string
	children?: React.ReactNode
}

export default function Board({ label, children }: BoardProps) {
	return (
		<div className={`${styles.board} shadow`}>
			<h4 className={styles.title}>{label}</h4>
			<div className={styles.boardContent}>{children}</div>
		</div>
	)
}
