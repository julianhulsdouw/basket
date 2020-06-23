/* eslint indent: 0 */ // --> OFF
import { isMac } from '../environment';
import i18n from '../lang';
import GetWebview from '../webview';

const electron = window.require('electron');
const { Menu } = electron.remote;
const { ipcRenderer } = electron;

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
                              {
                                  label: i18n.t('check_updates'),
                                  click: () => {
                                      ipcRenderer.sendSync('check-for-updates');
                                  },
                              },
                              {
                                  label: i18n.t('preferences'),
                                  accelerator: 'CmdOrCtrl+,',
                                  click: async () => {
                                      await this.store.dispatch(
                                          'services/hideAllServices',
                                      );

                                      this.store.dispatch(
                                          'settings/showPreferences',
                                      );

                                      if (document.activeElement) {
                                          document.activeElement.blur();
                                      }
                                  },
                              },
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
                        label: i18n.t('open_service_developer_tools'),
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
                    {
                        label: i18n.t('menu_actual_size'),
                        click: () => {
                            const webview = GetWebview(
                                this.store.getters['services/activeService']
                                    .identifier,
                            );

                            webview.setZoomLevel(0);
                        },
                        accelerator: `CmdOrCtrl+0`,
                    },
                    {
                        label: i18n.t('menu_zoom_in'),
                        click: () => {
                            const webview = GetWebview(
                                this.store.getters['services/activeService']
                                    .identifier,
                            );

                            webview.setZoomLevel(webview.getZoomLevel() + 1);
                        },
                        accelerator: `CmdOrCtrl+=`,
                    },
                    {
                        label: i18n.t('menu_zoom_out'),
                        click: () => {
                            const webview = GetWebview(
                                this.store.getters['services/activeService']
                                    .identifier,
                            );

                            webview.setZoomLevel(webview.getZoomLevel() - 1);
                        },
                        accelerator: `CmdOrCtrl+-`,
                    },
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
                    click: async () => {
                        await this.store.dispatch('settings/hidePreferences');

                        this.store.dispatch(
                            'services/setActive',
                            service.identifier,
                        );

                        const webview = GetWebview(
                            this.store.getters['services/activeService']
                                .identifier,
                        );

                        if (document.activeElement) {
                            document.activeElement.blur();
                        }

                        webview.focus();
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
