/** @type {import('tailwindcss').Config} */

function generateSpacing(step, max) {
	const spacing = {};

	for (let i = 0.5; i <= max; i += step) {
		const key = i.toFixed(1);
		const remValue = i * 0.25;
		spacing[key] = `${remValue}rem`;
	}

	return spacing;
}

module.exports = {
	content: ['./src/**/*.{html,js,pug}', './index.html'],
	theme: {
		extend: {
			spacing: {
				'5px': '0.3125rem',
				'560px': '35rem',
				...generateSpacing(0.5, 60),
			},
			aspectRatio: {
				25: '25',
				37: '37',
			},
		},

		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},

		colors: {
			body: '#f5f5f5',
			'background-header': 'rgb(255, 255, 255, 0.85)',
			white: '#ffffff',
			blue: '#005fbe',
			'light-blue': 'rgba(105, 180, 246, 0.1)',
			'light-blue-2': 'rgba(105, 180, 246, 0.2)',
			'light-blue-3': '#dce7f4',
			'gray-blue': '#486284',
			red: '#c20019',
			black: '#222222',
		},

		container: {
			center: true,
			padding: {
				DEFAULT: '0.3125rem',
				sm: '0.625rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},

		borderRadius: {
			10: '40px',
			'23px': '23px',
			'44px': '44px',
		},
	},
	corePlugins: {
		aspectRatio: false,
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
};
