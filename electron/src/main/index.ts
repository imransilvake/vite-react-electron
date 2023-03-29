import { is } from '@electron-toolkit/utils';
import { app, BrowserWindow, shell } from 'electron';
import { join } from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';

function createWindow(): void {
	// create the browser window.
	const mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: true,
		kiosk: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		}
	});

	// maximize window
	mainWindow.maximize();

	// open the dev-tools.
	isDevelopment && mainWindow.webContents.openDevTools();

	// wait for ready to show the window
	mainWindow.on('ready-to-show', () => mainWindow.show());

	// handle window open
	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
	}
}

// this method will be called when Electron has finished
// initialization and is ready to create browser windows.
// some APIs can only be used after this event occurs.
app.on('ready', async () => {
	createWindow();
});

// activate
app.on('activate', () => {
	// on macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// quit when all windows are closed.
app.on('window-all-closed', () => {
	// on macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform === 'darwin') return;

	// quit
	app.quit();
});

// exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data !== 'graceful-exit') return;
			app.quit();
		});
	} else {
		process.on('SIGTERM', () => app.quit());
	}
}
