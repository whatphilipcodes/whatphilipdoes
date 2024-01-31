import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
// content

/**
 * Represents a content block with text and a call-to-action.
 */
export interface contentBlockTextCTA extends ParsedContent {
	/**
	 * The tags associated with the content block.
	 */
	tags: string[]
	/**
	 * The text content of the block.
	 */
	text: string
	/**
	 * The call-to-action button data.
	 */
	callToAction: buttonData
}
export interface contentBlockTextCTA extends ParsedContent {
	tags: string[]
	text: string
	callToAction: buttonData
}

/**
 * Represents a content project.
 */
export interface contentProject extends ParsedContent {
	/**
	 * The header image data.
	 */
	header: imageData

	/**
	 * The tags associated with the project.
	 */
	projectTags: string[]

	/**
	 * Indicates if the project is shown in rotor on the landing page.
	 */
	landing: boolean

	/**
	 * The abstract of the project.
	 */
	abstract: string
}
export interface contentProject extends ParsedContent {
	header: imageData
	projectTags: string[]
	landing: boolean
	abstract: string
}

/**
 * Represents a content segment.
 */
export interface contentSegment extends ParsedContent {
	segment: Partial<pageSegment>
	contents: any
}

// molecules

/**
 * Represents a page segment.
 */
export interface pageSegment {
	/**
	 * The title of the page segment.
	 */
	title: string
	/**
	 * An array of button data.
	 */
	buttons: buttonData[]
	/**
	 * An optional callback string.
	 */
	callback?: string
}
export interface pageSegment {
	title: string
	buttons: buttonData[]
	callback?: string
}

// atoms

/**
 * Represents the data structure for a button.
 */
export interface buttonData {
	/**
	 * The label text for the button.
	 */
	label: string

	/**
	 * The destination URL or function to be executed when the button is clicked.
	 */
	to: string | (() => any)

	/**
	 * Optional. Specifies whether the button should have an accent style.
	 */
	accent?: boolean

	/**
	 * Optional. Specifies the file name when the button is used for server hosted direct downloads.
	 */
	download?: string
}
export interface buttonData {
	label: string
	to: string | (() => any)
	accent?: boolean
	download?: string
}

/**
 * Represents an image data object.
 */
export interface imageData {
	/**
	 * The source URL of the image.
	 */
	src: string

	/**
	 * The alternative text for the image.
	 */
	alt?: string

	/**
	 * The number of rows for the image when displayed in a grid (only md and lg breakpoints).
	 */
	rows?: string

	/**
	 * The number of columns for the image when displayed in a grid (only md and lg breakpoints).
	 */
	cols?: string

	/**
	 * Indicates if the image should be displayed in a narrow layout (only sm breakpoint).
	 */
	smnarrow?: boolean
}
export interface imageData {
	src: string
	alt?: string
	rows?: string
	cols?: string
	smnarrow?: boolean
}
