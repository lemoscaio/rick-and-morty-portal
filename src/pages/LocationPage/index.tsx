import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Location } from "../../interfaces/Location"

export default function LocationPage() {
	const { locationId } = useParams()

	const [location, setLocation] = useState<Location | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		async function fetchLocation() {
			const { data } = await api.get<Location>(`/character/${locationId}`)
			setCharacter(data)
		}
		try {
			fetchCharacter()
		} catch (error) {
			if (controller.signal.aborted) return
			console.log(error)
		}

		return () => controller.abort()
	}, [])

	return <div>Location</div>
}
