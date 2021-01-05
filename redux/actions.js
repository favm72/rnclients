import { baseUrl } from '../shared/baseUrl';

export async function postClient(client) {
	try {
		const response = await fetch(baseUrl + 'clients/create', {
				method: "POST",
				body: JSON.stringify(client),
				headers: {
					"Content-Type": "application/json"
			},
			credentials: "same-origin"
		})
		const data = await response.json()
		return data
	} catch (error) {
		return {
			status: false,
			message: error.message
		}
	}	
}
