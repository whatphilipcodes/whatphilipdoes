export const useGlobalStore = defineStore('global', () => {
	const scrollStopperCollection: Ref<HTMLElement>[] = []
	function addScrollStop(target: Ref<HTMLElement>) {
		scrollStopperCollection.push(target)
	}
	return { scrollStopperCollection, addScrollStop }
})
