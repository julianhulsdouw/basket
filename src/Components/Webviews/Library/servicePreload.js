import { ipcRenderer } from 'electron';
import contextMenu from "./serviceContextMenu";
const fs = require('electron').remote.require('fs')
import Notification from "./Notification";

const path = require('electron').remote.require('path')

const webContents = require('electron').remote.getCurrentWebContents();
const { session } = webContents;

contextMenu();
window.Notification = Notification;
window.session = session;

setTimeout(() => {
    const elem = document.querySelector('.landing-title.version-title');
    if (elem && elem.innerText.toLowerCase().includes('google chrome')) {
        window.location.reload();
    }
}, 1000);

window.addEventListener('beforeunload', async () => {
    try {
        window.session.flushStorageData();
        window.session.clearStorageData({
            storages: ['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb'],
        });

        const registrations = await window.navigator.serviceWorker.getRegistrations();

        registrations.forEach((r) => {
            r.unregister();
        });
    } catch (err) {
        console.err(err);
    }
});
