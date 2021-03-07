import i18n from '../../config/i18n';

class ServiceContext {
    constructor(mainWindow, service) {
        return [
            {
                label: service.title,
                enabled: false,
                accelerator: `CmdOrCtrl+${service.index + 1}`,
            },
            {
                label: i18n.t('edit'),
                click: () => {
                    mainWindow.webContents.send(
                        'editService',
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
                click: async () => {
                    mainWindow.webContents.send(
                        'reloadService',
                        service.identifier,
                        service.url,
                    );
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
                    mainWindow.webContents.send(
                        'toggleSound',
                        service.identifier,
                        service.soundEnabled,
                    );
                },
            },
            {
                label: service.notificationsEnabled
                    ? i18n.t('notifications_disable')
                    : i18n.t('notifications_enable'),
                enabled: service.enabled,
                click: () => {
                    mainWindow.webContents.send(
                        'toggleNotifications',
                        service.identifier,
                    );
                },
            },
            {
                label: service.enabled
                    ? i18n.t('service_disable')
                    : i18n.t('service_enable'),
                click: () => {
                    mainWindow.webContents.send(
                        'toggleService',
                        service.identifier,
                    );
                },
            },
            {
                type: 'separator',
            },
            {
                label: i18n.t('remove_service'),
                enabled: true,
                click: () => {
                    mainWindow.webContents.send(
                        'removeService',
                        service.identifier,
                    );
                },
            },
        ];
    }
}

export default ServiceContext;
