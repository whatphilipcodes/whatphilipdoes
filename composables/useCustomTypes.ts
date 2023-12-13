import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
export interface contentTextBlock extends ParsedContent {
	tags: string[]
	callToAction: { label: string; to: string }
}
