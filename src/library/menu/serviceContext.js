import { ipcRenderer } from 'electron';
import i18n from '../../config/i18n';
import GetWebview from '../webview';

class ContextMenu {
    constructor(store, service) {
        return [
            {
                label: service.title,
                enabled: false,
                accelerator: `CmdOrCtrl+${service.index + 1}`,
            },
            {
                label: i18n.t('edit'),
                click: () => {
                    store.dispatch(
                        'panels/showServicePanel',
                        service.identifier,
                    );
                },
                enabled: true,
            },
            {
                type: 'separator',
            },
            {
                label: i18n.t('reload'),
                click: () => {
                    const webview = GetWebview(service.identifier);
                    webview.loadURL(service.url);
                },
                enabled: service.enabled,
            },
            {
                type: 'separator',
            },
            {
                label: service.soundEnabled
                    ? i18n.t('sound_disable')
                    : i18n.t('sound_enable'),
                enabled: service.enabled,
                click: () => {
                    store.dispatch('services/toggleSound', service.identifier);

                    const webview = GetWebview(service.identifier);
                    const allSoundMuted =
                        store.getters['settings/getSoundMuted'];

                    // When toggling sound on a service ensure the sound is muted if
                    // the service is muted or all sound is muted.
                    webview.setAudioMuted(
                        !service.soundEnabled || allSoundMuted,
                    );
                },
            },
            {
                label: service.notificationsEnabled
                    ? i18n.t('notifications_disable')
                    : i18n.t('notifications_enable'),
                enabled: service.enabled,
                click: () => {
                    store.dispatch(
                        'services/toggleNotifications',
                        service.identifier,
                    );
                },
            },
            {
                label: service.enabled
                    ? i18n.t('service_disable')
                    : i18n.t('service_enable'),
                click: async () => {
                    await store.dispatch(
                        'services/toggleService',
                        service.identifier,
                    );

                    ipcRenderer.send('re-draw-menu');
                },
            },
            {
                type: 'separator',
            },
            {
                label: i18n.t('remove_service'),
                enabled: true,
                click: async () => {
                    if (
                        // eslint-disable-next-line no-alert
                        window.confirm(i18n.t('confirm_delete_service'))
                    ) {
                        if (
                            store.getters['panels/activePanelService'] ===
                            service.identifier
                        ) {
                            await store.dispatch('panels/hidePanels');
                        }

                        await store.dispatch(
                            'services/removeService',
                            service.identifier,
                        );

                        ipcRenderer.send('re-draw-menu');
                    }
                },
            },
        ];
    }
}

export default ContextMenu;
