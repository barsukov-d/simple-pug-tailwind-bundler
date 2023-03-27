import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';
import { resolve } from 'path';

import { viteStaticCopy } from 'vite-plugin-static-copy';

const fs = require('fs');
const path = require('path');

// Замените этот путь своим путем к папке с HTML-файлами
const htmlFolderPath = './pages';

function createHtmlStructure(folderPath) {
	const files = fs.readdirSync(folderPath);
	const structure = {};

	files.forEach((file) => {
		const filePath = path.join(folderPath, file);
		const stats = fs.statSync(filePath);

		if (stats.isDirectory()) {
			const nestedStructure = createHtmlStructure(filePath);
			Object.assign(structure, nestedStructure);
		} else if (path.extname(file) === '.html') {
			const name = path.basename(file, '.html');
			structure[name] = filePath;
		}
	});

	return structure;
}

let htmlStructure = createHtmlStructure(htmlFolderPath);
htmlStructure = { ...htmlStructure, index: './index.html' };
console.log(htmlStructure);

const input = Object.fromEntries(
	Object.entries(htmlStructure).map(([key, value]) => [
		key,
		resolve(__dirname, value),
	])
);

const options = { pretty: true }; // FIXME: pug pretty is deprecated!
const locals = { name: 'My Pug' };

function resolveAlias(path) {
	const aliases = {
		'@': '/src',
		'@components': '/src/components',
		'@utils': '/src/utils',
	};

	for (const [alias, replacement] of Object.entries(aliases)) {
		if (path.startsWith(alias)) {
			return path.replace(alias, replacement);
		}
	}
	return path;
}

export default defineConfig({
	resolve: {
		alias: {
			'@': '/src',
		},
	},

	plugins: [
		pugPlugin({
			locals: {
				resolve: resolveAlias,
			},
		}),
		viteStaticCopy({
			targets: [
				{
					src: ['src/video'],
					dest: 'src',
				},
			],
		}),
	],
	build: {
		assetsDir: 'assets2',
		cssCodeSplit: true,
		rollupOptions: {
			input,
			output: {
				entryFileNames: 'assets/[name].js', // Entry file names
				assetFileNames: 'assets/[name][extname]',
				chunkFileNames: '[name] - [hash].js',
			},
		},
	},
});
