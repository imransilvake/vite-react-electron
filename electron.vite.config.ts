import { defineConfig, splitVendorChunkPlugin } from 'electron-vite';
import { resolve } from 'path';
import path from 'path';
import { loadEnv } from 'vite';

const configuration = defineConfig(({ mode }) => {
	// load env file based on `mode` in the current working directory.
	// set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, process.cwd());

	return {
		main: {
			plugins: [splitVendorChunkPlugin()],
			build: {
				outDir: 'electron/output',
				rollupOptions: {
					input: { index: resolve(__dirname, 'electron/src/main/index.ts') },
					output: { dir: resolve(__dirname, 'electron/output/main') }
				}
			}
		},
		preload: {
			plugins: [splitVendorChunkPlugin()],
			build: {
				outDir: 'electron/output',
				rollupOptions: {
					input: { index: resolve(__dirname, 'electron/src/preload/index.ts') },
					output: { dir: resolve(__dirname, 'electron/output/preload') }
				}
			}
		},
		renderer: {
			plugins: [splitVendorChunkPlugin()],
			server: { port: +env.VITE_ELECTRON_PORT, open: false },
			preview: { port: +env.VITE_ELECTRON_PORT_PREVIEW, open: false },
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
	};
});
export default configuration;
