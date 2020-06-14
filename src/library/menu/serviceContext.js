import i18n from '../lang';
import AppMenu from './main';

class ContextMenu {
    constructor(store, service) {
        return [
            {
                label: service.title,
                accelerator: `CmdOrCtrl+${service.index + 1}`,
            },
            {
                type: 'separator',
            },
            {
                label: i18n.tc('reload'),
                click: () => {},
            },
            {
                type: 'separator',
            },
            {
                label: service.soundEnabled
                    ? i18n.tc('sound_disable')
                    : i18n.tc('sound_enable'),
                click: () => {},
            },
            {
                label: service.notificationsEnabled
                    ? i18n.tc('notifications_disable')
                    : i18n.tc('notifications_enable'),
                click: () => {},
            },
            {
                label: service.enabled
                    ? i18n.tc('service_disable')
                    : i18n.tc('service_enable'),
                click: () => {
                    store.dispatch(
                        'services/toggleService',
                        service.identifier,
                    );

                    new AppMenu(store); // eslint-disable-line no-new
                },
            },
            {
                type: 'separator',
            },
            {
                label: i18n.tc('remove_service'),
                enabled: true,
                click: () => {},
            },
        ];
    }
}

export default ContextMenu;
