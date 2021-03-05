import GetWebview from '../webview';

const { ipcRenderer } = require('electron');

export default function ipcRendererInit(store) {
    function getActiveWebView() {
        return GetWebview(store.getters['services/activeService'].identifier);
    }

    // Check and update AppIcon notification count
    // every 3 seconds
    setInterval(() => {
        ipcRenderer.send(
            'app-notification-count',
            store.getters['services/getTotalNotificationCount'],
        );
    }, 3000);

    ipcRenderer.on('openPreferencesPanel', () => {
        store.dispatch('panels/togglePreferencesPanel');

        if (document.activeElement) {
            document.activeElement.blur();
        }
    });

    ipcRenderer.on('openServiceDeveloperTools', () => {
        getActiveWebView().openDevTools();
    });

    ipcRenderer.on('resetZoomLevel', () => {
        getActiveWebView().setZoomLevel(0);
    });

    ipcRenderer.on('addZoomLevel', () => {
        const webview = getActiveWebView();

        webview.setZoomLevel(webview.getZoomLevel() + 1);
    });

    ipcRenderer.on('substractZoomLevel', () => {
        const webview = getActiveWebView();

        webview.setZoomLevel(webview.getZoomLevel() - 1);
    });

    ipcRenderer.on('changeService', (event, identifier) => {
        store.dispatch('services/setActive', identifier);

        const webview = GetWebview(
            store.getters['services/activeService'].identifier,
        );

        if (document.activeElement) {
            document.activeElement.blur();
        }

        webview.focus();
    });
}
