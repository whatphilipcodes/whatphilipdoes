export class utils {
	// molecules
	static getGridSpans(image: imageData): string {
		const { md: mdCol, lg: lgCol } = utils.getSeperateSpans(
			image.cols ?? '1 / 1',
		)
		const { md: mdRow, lg: lgRow } = utils.getSeperateSpans(
			image.rows ?? '1 / 1',
		)
		return `col-span-${mdCol} lg:col-span-${lgCol} row-span-${mdRow} lg:row-span-${lgRow}`
	}
	static getGridStarts(image: imageData): string {
		const { md: mdCol, lg: lgCol } = utils.getSeperateStarts(
			image.startCol ?? 'auto / auto',
		)
		const { md: mdRow, lg: lgRow } = utils.getSeperateStarts(
			image.startRow ?? 'auto / auto',
		)
		return `col-start-${mdCol} lg:col-start-${lgCol} row-start-${mdRow} lg:row-start-${lgRow}`
	}

	// atoms
	static getSeperateSpans(input?: string): { md: string; lg: string } {
		if (input === undefined) {
			return { md: '0', lg: '0' }
		}
		if (!input.match(/([1-9]|full) \/ ([1-9]|full)/)) {
			throw new Error(
				`Invalid row or column span in NuxtContent Markdown file detected: ${input} Please adhere to the correct syntax eg. '2 / 4'. Also double check YAML indentation.`,
			)
		}
		const [md, lg] = input.split('/').map((item) => item.trim())
		return { md, lg }
	}
	static getSeperateStarts(input?: string): { md: string; lg: string } {
		if (input === undefined) {
			return { md: '0', lg: '0' }
		}
		if (!input.match(/([1-9]|auto) \/ ([1-9]|auto)/)) {
			throw new Error(
				`Invalid row or column start in NuxtContent Markdown file detected: ${input} Please adhere to the correct syntax eg. '2 / 4'. Also double check YAML indentation.`,
			)
		}
		const [md, lg] = input.split('/').map((item) => item.trim())
		return { md, lg }
	}
}
