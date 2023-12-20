import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
export interface contentTextBlock extends ParsedContent {
	tags: string[]
	text: string
	callToAction: { label: string; to: string }
}
export interface contentProject extends ParsedContent {
	header: string
	tags: string[]
	landing: boolean
}
export interface pageSegment {
	dynHeadPrefix: string
	dynHeadHighlight: string
	buttons: {
		label: string
		to: string
		accent: boolean
	}[]
}
