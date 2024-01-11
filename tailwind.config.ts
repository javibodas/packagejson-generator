import type { Config } from 'tailwindcss'

export default <Config> {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'tilt-neon': ['var(--font-tilt-neon)'],
			},
			borderWidth: {
				'1' : '1px',
			},
			borderColor: {
				'garnet' : '#c12127',
				'bblue' : '#0976b4',
				'bgreen' : '#008000',
				'bgray' : '#5a5a5a'
			},
			textColor: {
				'garnet' : '#c12127'
			},
			backgroundColor: {
				'garnet' : '#c12127',
				'bblue' : '#0976b4',
				'bgreen' : '#008000',
				'bgray' : '#5a5a5a'
			},
			fontSize: {
				'2xs' : '10px',
				'base' : 'calc(0.35em + 0.35vw)',
				'10xl' : '150px'
			},
			spacing: {
				'1.5' : '0.35rem',
				'6-vh': '6vh',
				'80-vh' : '80vh',
				'80%' : '80%',
				'92-vh' : '92vh',
			}
		},
	},
	plugins: [],
}