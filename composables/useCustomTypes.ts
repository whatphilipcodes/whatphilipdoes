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
	buttons: buttonData[]
}

/**
 * Represents a content project.
 */
export interface contentProject extends ParsedContent {
	/**
	 * The header image data.
	 */
	header: videoData

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
 * Used to represent content that is not directly rendered using the ContentRenderer but rather used as a data source in the page template.
 */
export interface contentPassive extends ParsedContent {
	/**
	 * pageSegments that are used to control the reactive nav element.
	 */
	segments: Partial<pageSegment>[]
	/**
	 * Any content that is hardcoded into the page tampate.
	 */
	bundle: any
}

// molecules

/**
 * Represents a page segment.
 */
export interface pageSegment {
	/**
	 * Title of the page the segment is associated to (what philip)
	 */
	page: string
	/**
	 * The name of the page segment (does)
	 */
	name: string
	/**
	 * An array of button data for the touch controls.
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
	variant?: string

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
 * Represents the data structure for a video.
 */
export interface videoData {
	/**
	 * The source URL of the video.
	 */
	src: string

	/**
	 * The URL of the video's poster image.
	 */
	poster: string
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
	 * The start row for the image when displayed in a grid (only md and lg breakpoints).
	 */
	startRow?: string

	/**
	 * The start column for the image when displayed in a grid (only md and lg breakpoints).
	 */
	startCol?: string

	/**
	 * Indicates if the image should be displayed in a narrow layout (only sm breakpoint).
	 */
	smnarrow?: boolean
}

/**
 * Enables tailwindcss autocompletion and syntax highlighting within the script tag.
 */
export function tw(classes: string | TemplateStringsArray): string {
	return classes.toString()
}
