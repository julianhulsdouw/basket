const { app, BrowserWindow } = require('electron');
import settings from 'electron-settings';

let mainWindow;
let forceQuit;

async function createWindow() {
    const mainWindowStateKeeper = await windowStateKeeper('main');

    // Create the browser window.
    mainWindow = new BrowserWindow({
        titleBarStyle: process.platform === 'darwin' ? 'hidden' : '',
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

    // if (isDevMode) {
    mainWindow.webContents.openDevTools();
    // }

    // and load the index.html of the app.
    mainWindow.loadFile('main.html');

    mainWindow.on("close", (event) => {
        event.preventDefault();
        if (!forceQuit && process.platform === "darwin") {
            mainWindow.hide();
        } else {
            app.exit(0);
        }
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

app.on('before-quit', () => {
    forceQuit = true;
});

app.on("activate", () => {
    if (mainWindow === null) createWindow;
    else mainWindow.show();
});

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
