import { isMac } from './environment';
const electron = window.require('electron');
const { Menu } = electron.remote;

export interface iAppMenu {
    stores: any
    createMenu: void
}

class AppMenu<iAppMenu> {
    stores: any;

    constructor(stores) {
        this.stores = stores;
        this.createMenu()
    }

    createMenu() {
        const template = [
            ...(isMac ? [{
                label: 'app.name',
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    {
                        label: 'Preferences',
                        accelerator: `CmdOrCtrl+,`,
                        click: () => {
                            this.stores.ServicesStore!.enabledServices
                                .forEach(service => service.visible = false);

                            this.stores.SettingsStore!.showPreferencesView();
                        },
                    },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideothers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }] : []),
            {
                label: 'File',
                submenu: [
                    isMac ? { role: 'close' } : { role: 'quit' }
                ]
            },
            {
                label: 'Edit',
                submenu: [
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' },
                    ...(isMac ? [
                        { role: 'pasteAndMatchStyle' },
                        { role: 'delete' },
                        { role: 'selectAll' },
                        { type: 'separator' },
                        {
                            label: 'Speech',
                            submenu: [
                                { role: 'startspeaking' },
                                { role: 'stopspeaking' }
                            ]
                        }
                    ] : [
                            { role: 'delete' },
                            { type: 'separator' },
                            { role: 'selectAll' }
                        ])
                ]
            },
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'forcereload' },
                    { role: 'toggledevtools' },
                    {
                        label: 'Open Service Developer Tools',
                        click: () => {
                            this.stores.ServicesStore!.activeService.webview.openDevTools();
                        },
                        // enabled: this.stores.ServicesStore!.activeService,
                    },
                    { type: 'separator' },
                    { role: 'resetzoom' },
                    { role: 'zoomin' },
                    { role: 'zoomout' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' }
                ]
            },
            {
                label: 'Services',
                submenu: this.stores.ServicesStore!.orderdServices.map((service) => {
                    return {
                        label: service.title,
                        accelerator: service.index < 9 ? `CmdOrCtrl+${service.index + 1}` : null,
                        enabled: service.enabled,
                        click: () => {
                            if (this.stores.SettingsStore!.preferencesViewVisible) {
                                this.stores.SettingsStore!.hidePreferencesView();
                            }
                            this.stores.ServicesStore!.setVisible(service.key);

                            service.webview.focus();
                            if (document.activeElement) {
                                (document.activeElement as HTMLElement).blur();
                            }
                            service.webview.view.focus();
                        }
                    };
                }),
            },
            {
                label: 'Window',
                submenu: [
                    { role: 'minimize' },
                    { role: 'zoom' },
                    ...(isMac ? [
                        { type: 'separator' },
                        { role: 'front' },
                        { type: 'separator' },
                        { role: 'window' }
                    ] : [
                            { role: 'close' }
                        ])
                ]
            },
        ]

        Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    }
}

export default AppMenu
