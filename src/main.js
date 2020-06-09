const { app, BrowserWindow } = require('electron');
import settings from 'electron-settings';

async function createWindow() {
    const mainWindowStateKeeper = await windowStateKeeper('main');

    // Create the browser window.
    const window = new BrowserWindow({
        titleBarStyle: process.platform === 'darwin' ? 'hidden' : '',
        title: 'Basket',
        x: mainWindowStateKeeper.x,
        y: mainWindowStateKeeper.y,
        width: mainWindowStateKeeper.width,
        height: mainWindowStateKeeper.height,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
        },
    });
    // Track window state
    mainWindowStateKeeper.track(window);

    // if (isDevMode) {
    window.webContents.openDevTools();
    // }

    // and load the index.html of the app.
    window.loadFile('index.html');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

async function windowStateKeeper(windowName) {
    let window, windowState;

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
        ['resize', 'move', 'close'].forEach(event => {
            win.on(event, saveState);
        });
    }

    await setBounds();

    return ({
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        isMaximized: windowState.isMaximized,
        track,
    });
}
