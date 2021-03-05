import AppMenu from '../menu/main';

const { app, ipcMain } = require('electron');

export default function ipcMainInit(settings, mainWindow) {
    ipcMain.on('app-notification-count', (event, count) => {
        app.badgeCount = count;
    });

    ipcMain.on('bouncybounce', () => {
        // Determine if we'd like the dock icon to bounce
        const shouldBounce = settings.getSync('settings.dockBounce') === true;

        // Only make bouncy bounce when on MacOS
        if (process.platform === 'darwin' && shouldBounce) {
            app.dock.bounce();
        }
    });

    // Redraw menu when neccesary
    ipcMain.on('re-draw-menu', () => {
        setTimeout(() => {
            new AppMenu(mainWindow, settings.getSync('services')); // eslint-disable-line
        }, 100);
    });
}
