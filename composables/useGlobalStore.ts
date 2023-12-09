export const useGlobalStore = defineStore('global', () => {
	const scrollStopperCollection: Ref<HTMLElement | null>[] = []
	function addScrollStop(target: Ref<HTMLElement | null>) {
		scrollStopperCollection.push(target)
	}

	return { scrollStopperCollection, addScrollStop }
})
