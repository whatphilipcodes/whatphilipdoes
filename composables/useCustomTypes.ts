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

/**
 * Represents a content project.
 */
export interface contentProject extends ParsedContent {
	/**
	 * The header image data.
	 */
	header: imageData

	/**
	 * Optional. The badge that is displayed on the project.
	 */
	badge?: badgeData

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

	/**
	 * Data for the footer segment of the project page.
	 */
	footer: pageSegment
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
	title?: string
	/**
	 * An array of button data.
	 */
	buttons: buttonData[]
	/**
	 * An optional callback string.
	 */
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

/**
 * Represents the data structure for a badge.
 */
export interface badgeData {
	/**
	 * The icon that is displayed as badge.
	 */
	icon: string
	/**
	 * Text that is shown when hovering over the badge.
	 */
	info: string
	/**
	 * Optional. Specifies a link to open when clicking on the badge.
	 */
	link?: string
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
