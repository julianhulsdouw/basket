const electron = require('electron');
const path = require('path');

// Is actually used.
const contextMenu = require('./webviewContext');

const webContents = electron.remote.getCurrentWebContents();
const ipcRenderer = electron.ipcRenderer;

window.session = webContents;

ipcRenderer.sendToHost('init');

ipcRenderer.once('init-recipe', (channel, message) => {
    require(path.join(__dirname, message.recipe));
});
