/* eslint indent: 0 */ // --> OFF

import { isMac } from '../environment';
import i18n from '../lang';
import GetWebview from '../webview';

const electron = window.require('electron');
const { Menu } = electron.remote;

class AppMenu {
    constructor(store) {
        this.store = store;

        const template = [
            ...(isMac
                ? [
                      {
                          label: 'app.name',
                          submenu: [
                              { role: 'about' },
                              { type: 'separator' },
                              // TODO: Disabled until there is a preferences modal.
                              //   {
                              //       label: 'Preferences',
                              //       accelerator: 'CmdOrCtrl+,',
                              //   },
                              { type: 'separator' },
                              { role: 'services' },
                              { type: 'separator' },
                              { role: 'hide' },
                              { role: 'hideothers' },
                              { role: 'unhide' },
                              { type: 'separator' },
                              { role: 'quit' },
                          ],
                      },
                  ]
                : []),
            {
                label: 'File',
                submenu: [
                    {
                        label: i18n.t('add_service'),
                        accelerator: 'CmdOrCtrl+N',
                        click: () => {
                            this.store.dispatch('services/addService');

                            new AppMenu(this.store); // eslint-disable-line no-new
                        },
                    },
                    isMac ? { role: 'close' } : { role: 'quit' },
                ],
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
                    ...(isMac
                        ? [
                              { role: 'pasteAndMatchStyle' },
                              { role: 'delete' },
                              { role: 'selectAll' },
                              { type: 'separator' },
                              {
                                  label: 'Speech',
                                  submenu: [
                                      { role: 'startspeaking' },
                                      { role: 'stopspeaking' },
                                  ],
                              },
                          ]
                        : [
                              { role: 'delete' },
                              { type: 'separator' },
                              { role: 'selectAll' },
                          ]),
                ],
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
                            const webview = GetWebview(
                                this.store.getters['services/activeService']
                                    .identifier,
                            );

                            webview.openDevTools();
                        },
                        enabled: this.store.getters['services/enabledServices']
                            .length,
                    },
                    { type: 'separator' },
                    { role: 'resetzoom' },
                    { role: 'zoomin' },
                    { role: 'zoomout' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' },
                ],
            },
            {
                label: 'Services',
                submenu: this.store.state.services.services.map((service) => ({
                    label: service.title,
                    accelerator:
                        service.index < 9
                            ? `CmdOrCtrl+${service.index + 1}`
                            : null,
                    enabled: service.enabled,
                    click: () => {
                        this.store.dispatch(
                            'services/setActive',
                            service.identifier,
                        );

                        const webview = GetWebview(
                            this.store.getters['services/activeService']
                                .identifier,
                        );

                        webview.focus();
                        if (document.activeElement) {
                            document.activeElement.blur();
                        }
                        // TODO: Make sure the preference/add view is closed
                    },
                })),
            },
            {
                label: 'Window',
                submenu: [
                    { role: 'minimize' },
                    { role: 'zoom' },
                    ...(isMac
                        ? [
                              { type: 'separator' },
                              { role: 'front' },
                              { type: 'separator' },
                              { role: 'window' },
                          ]
                        : [{ role: 'close' }]),
                ],
            },
        ];

        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    }
}

export default AppMenu;
