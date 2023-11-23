import type { Config } from 'tailwindcss'

export default {
	content: [],
	theme: {
		extend: {
			colors: {
				mono: {
					'50': '#f2f2f2',
					'100': '#e6e6e6',
					'200': '#cccccc',
					'300': '#b3b3b3',
					'400': '#999999',
					'500': '#808080',
					'600': '#666666',
					'700': '#4d4d4d',
					'800': '#333333',
					'900': '#1a1a1a',
					'950': '#0d0d0d',
				},
				cinnabar: {
					'50': '#fdece7',
					'100': '#fcd9cf',
					'200': '#f9b39f',
					'300': '#f68c6f',
					'400': '#f3663f',
					'500': '#e63e0f',
					'600': '#c0330c',
					'700': '#902609',
					'800': '#601a06',
					'900': '#300d03',
					'950': '#180602',
				},
			},
			fontSize: {
				sm: '0.75rem',
				base: '1rem',
				lg: '1.5rem',
				xl: '2.5rem',
			},
			fontFamily: {
				jost: 'Jost',
			},
		},
	},
	plugins: [],
} satisfies Config
