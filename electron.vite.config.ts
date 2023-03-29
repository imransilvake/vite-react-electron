import { defineConfig } from 'electron-vite';
import { resolve } from 'path';
import path from 'path';

export default defineConfig({
	main: {
		build: {
			outDir: 'electron/output',
			rollupOptions: {
				input: { index: resolve(__dirname, 'electron/src/main/index.ts') },
				output: { dir: resolve(__dirname, 'electron/output/main') }
			}
		}
	},
	preload: {
		build: {
			outDir: 'electron/output',
			rollupOptions: {
				input: { index: resolve(__dirname, 'electron/src/preload/index.ts') },
				output: { dir: resolve(__dirname, 'electron/output/preload') }
			}
		}
	},
	renderer: {
		root: '.',
		build: {
			outDir: 'electron/output',
			rollupOptions: {
				input: { index: resolve(__dirname, 'index.html') },
				output: { dir: resolve(__dirname, 'electron/output/renderer') }
			}
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src/app'),
				'@assets': path.resolve(__dirname, './src/assets')
			}
		}
	}
});
