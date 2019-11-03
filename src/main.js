const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

let mainWindow;
let forceQuit;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        titleBarStyle: process.platform === 'darwin' ? 'hidden' : '',
        title: 'Basket',
        height: 680,
        width: 900,
        minHeight: 680,
        minWidth: 900,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
        },
    });

    mainWindow.webContents.openDevTools();

    // and load the index.html of the app.
    mainWindow.loadURL(
        `file://${path.join(__dirname, "/index.html")}`
    );

    mainWindow.on("close", (event) => {
        event.preventDefault();
        if (!forceQuit && process.platform === "darwin") {
            mainWindow.hide();
        } else {
            app.exit(0);
        }
    });
};

app.on('ready', createWindow);

app.on("window-all-closed", (event) => {
    event.preventDefault();
    if (!forceQuit && process.platform === "darwin") {
        mainWindow.hide();
    } else {
        app.exit(0);
    }
});

app.on('before-quit', () => {
    forceQuit = true;
});

app.on("activate", () => {
    if (mainWindow === null) createWindow;
    else mainWindow.show();
});
