import GetWebview from '../webview';
import i18n from '../../config/i18n';

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

    ipcRenderer.on('editService', (event, identifier) => {
        store.dispatch('panels/showServicePanel', identifier);
    });

    ipcRenderer.on('reloadService', (event, identifier, url) => {
        const webview = GetWebview(identifier);
        webview.loadURL(url);
    });

    ipcRenderer.on('toggleNotifications', (event, identifier) => {
        store.dispatch('services/toggleNotifications', identifier);
    });

    ipcRenderer.on('toggleSound', (event, identifier, soundEnabled) => {
        store.dispatch('services/toggleSound', identifier);

        const webview = GetWebview(identifier);
        const allSoundMuted = store.getters['settings/getSoundMuted'];

        // When toggling sound on a service ensure the sound is muted if
        // the service is muted or all sound is muted.
        webview.setAudioMuted(!soundEnabled || allSoundMuted);
    });

    ipcRenderer.on('toggleService', async (event, identifier) => {
        await store.dispatch('services/toggleService', identifier);

        ipcRenderer.send('re-draw-menu');
    });

    ipcRenderer.on('removeService', async (event, identifier) => {
        if (
            // eslint-disable-next-line no-alert
            window.confirm(i18n.t('confirm_delete_service'))
        ) {
            if (store.getters['panels/activePanelService'] === identifier) {
                await store.dispatch('panels/hidePanels');
            }

            await store.dispatch('services/removeService', identifier);

            ipcRenderer.send('re-draw-menu');
        }
    });
}
