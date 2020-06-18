const electron = require('electron');
const path = require('path');
const contextMenu = require('./webviewContext'); // Is actually used.
const Notification = require('./notification');

const webContents = electron.remote.getCurrentWebContents();
const ipcRenderer = electron.ipcRenderer;

window.session = webContents;

// Set empty functions for when there is no recipe available
// or specific functions aren't used.a1

// chekMessageCount should return the amount of unread messages
// this will be set in the unread bubble
window.checkMessageCount = () => {};

// Delay initializing because otherwise the init-recipe
// event will fail to trigger.
setTimeout(() => ipcRenderer.sendToHost('init'), 100);

ipcRenderer.once('init-recipe', (channel, message) => {
    // Require recipe for this specific service.
    require(path.join(__dirname, message.recipe));
});

setInterval(function() {
    ipcRenderer.sendToHost('message-count', window.checkMessageCount());
}, 1000);
