import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
// content
export interface contentBlockTextCTA extends ParsedContent {
	tags: string[]
	text: string
	callToAction: buttonData
}
export interface contentProject extends ParsedContent {
	header: imageData
	projectTags: string[]
	landing: boolean
	abstract: string
}
export interface contentSegment extends ParsedContent {
	segment: Partial<pageSegment>
	contents: any
}

// molecules
export interface pageSegment {
	title: string
	buttons: buttonData[]
	callback?: string
}

// atoms
export interface buttonData {
	label: string
	to: string | (() => any)
	accent?: boolean
	download?: string
}

export interface imageData {
	src: string
	alt?: string
	rows?: string
	cols?: string
}
