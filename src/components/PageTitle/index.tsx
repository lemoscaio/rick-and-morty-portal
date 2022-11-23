interface PageTilteProps {
	border?: boolean
	children?: React.ReactNode
}

export default function PageTitle({
	border = false,
	children,
}: PageTilteProps) {
	return (
		<div
			className={`fs-2 text-body text-center border-dark ${
				border ? "border-bottom" : ""
			}`}
		>
			{children}
		</div>
	)
}
