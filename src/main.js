import { autoUpdater } from 'electron-updater';
import settings from './library/settings';

const { app, BrowserWindow, ipcMain } = require('electron');
const { isDevMode } = require('./library/environment');

require('@electron/remote/main').initialize();

let mainWindow;
let forceQuit;

async function createWindow() {
    const mainWindowStateKeeper = await windowStateKeeper('main'); // eslint-disable-line

    // Create the browser window.
    mainWindow = new BrowserWindow({
        titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
        title: 'Basket',
        x: mainWindowStateKeeper.x,
        y: mainWindowStateKeeper.y,
        width: mainWindowStateKeeper.width,
        height: mainWindowStateKeeper.height,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            enableRemoteModule: true,
        },
    });

    // Track window state
    mainWindowStateKeeper.track(mainWindow);

    // and load the index.html of the app.
    await mainWindow.loadFile('app.html');

    if (isDevMode) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('close', (event) => {
        event.preventDefault();

        if (!forceQuit && process.platform === 'darwin') {
            mainWindow.hide();
        } else {
            app.exit(0);
        }
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});

app.on('before-quit', () => {
    forceQuit = true;
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    } else {
        mainWindow.show();
    }
});

async function windowStateKeeper(windowName) {
    let window;
    let windowState;

    async function setBounds() {
        // Restore from settings
        if (await settings.has(`windowState.${windowName}`)) {
            windowState = await settings.get(`windowState.${windowName}`);
            return;
        }
        // Default
        windowState = {
            x: undefined,
            y: undefined,
            width: 960,
            height: 680,
        };
    }

    function saveState() {
        if (!windowState.isMaximized) {
            windowState = window.getBounds();
        }
        windowState.isMaximized = window.isMaximized();
        settings.set(`windowState.${windowName}`, windowState);
    }

    function track(win) {
        window = win;
        ['resize', 'move', 'close'].forEach((event) => {
            win.on(event, saveState);
        });
    }

    await setBounds();

    return {
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        isMaximized: windowState.isMaximized,
        track,
    };
}

ipcMain.on('check-for-updates', () => {
    // Check for updates
    autoUpdater.checkForUpdatesAndNotify();

    // Show notification if there are no updates.
});
