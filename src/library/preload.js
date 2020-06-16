import contextMenu from '@/library/menu/webviewContext';

const webContents = require('electron').remote.getCurrentWebContents();

const { session } = webContents;

window.session = session;

contextMenu();
