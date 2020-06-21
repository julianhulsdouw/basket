const electron = require('electron');
const path = require('path');
const fs = require('fs-extra');
const contextMenu = require('./webviewContext'); // Is actually used.
const Notification = require('./notification'); // Also actually used.

const webContents = electron.remote.getCurrentWebContents();
const ipcRenderer = electron.ipcRenderer;

window.session = webContents;

// Set empty functions for when there is no recipe available
// or specific functions aren't used.

// chekMessageCount should return the amount of unread messages
// this will be set in the unread bubble
window.checkMessageCount = () => {};

// Delay initializing because otherwise the init-recipe
// event will fail to trigger.
setTimeout(() => ipcRenderer.sendToHost('init'), 100);

ipcRenderer.once('init-recipe', (channel, message) => {
    // Require recipe for this specific service.
    require(path.join(__dirname, message.recipe));

    // Inject CSS if there is a service css file
    const cssPath = path.join(__dirname, message.recipe, 'style.css');
    fs.access(cssPath, fs.F_OK, (err) => {
        // If file doesn't exist show in log.
        if (err) {
            console.log('No style.css found, will not be loaded.');
            return;
        }

        // If the file does exist create style element in head
        const styles = document.createElement('style');

        const cssFile = fs.readFileSync(cssPath);
        styles.innerHTML = cssFile.toString();

        document.querySelector('head').appendChild(styles);
    });
});

setInterval(function() {
    ipcRenderer.sendToHost('message-count', window.checkMessageCount());
}, 1000);
