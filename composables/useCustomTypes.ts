import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
export interface contentBlockTextCTA extends ParsedContent {
	tags: string[]
	text: string
	callToAction: {
		label: string
		to: string
		accent?: boolean
		download?: string
	}
}
export interface contentProject extends ParsedContent {
	header: string
	projectTags: string[]
	landing: boolean
	abstract: string
}
export interface pageSegment {
	title: string
	buttons: {
		label: string
		to: string
		accent?: boolean
		download?: string
	}[]
}
export interface pageInfo {
	page: string
}
export interface contentSegment extends ParsedContent {
	segment: Partial<pageSegment>
	contents: any
}
