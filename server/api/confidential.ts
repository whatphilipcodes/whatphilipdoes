export default defineEventHandler(async (event) => {
	// handle query params
	const { test } = getQuery(event)

	// handle post data
	const { testnumber } = await readBody(event)

	return {
		message: `this has been sent from the backend. test: ${test}, testnumber: ${testnumber}`,
	}
})
