/* eslint indent: 0 */ // --> OFF

import { isMac } from './environment';

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
                submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
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
                            console.log('developer console');
                            // this.stores.ServicesStore!.activeService.webview.openDevTools();
                        },
                        // enabled: this.stores.ServicesStore!.activeService,
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

                        // TODO: Make sure the preference/add view is closed
                        // TODO: make sure webview gets focussed.
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
