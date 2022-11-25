export interface ApiResult {
	info: ApiInfo
}

export interface ApiInfo {
	count: number
	pages: number
	next: string | null
	prev: string | null
}
