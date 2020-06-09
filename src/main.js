const { app, BrowserWindow } = require('electron');


function createWindow() {
    // Create the browser window.
    const window = new BrowserWindow({
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
