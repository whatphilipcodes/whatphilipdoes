import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
export interface contentTextBlock extends ParsedContent {
	tags: string[]
	text: string
	callToAction: { label: string; to: string; accent?: boolean }
}
export interface contentProject extends ParsedContent {
	header: string
	tags: string[]
	landing: boolean
}
export interface pageSegment {
	title: string
	buttons: {
		label: string
		to: string
		accent?: boolean
	}[]
}
export interface pageInfo {
	page: string
}
export interface contentSegment extends ParsedContent {
	segment: Partial<pageSegment>
	contents: any
}
