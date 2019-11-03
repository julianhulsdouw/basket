import uuidV1 from 'uuid/v1';
import Service from '../Models/Service';
import { stores } from '../Stores';
import { remote } from 'electron';

const mainWindow = remote.getCurrentWindow();
const { app } = remote;

export interface iIpcHandler {
    options: object
    service: Service
    notificationsEnabled: boolean
    soundEnabled: boolean
}

class IpcHandler<iIpcHandler> {
    options: any;
    service: Service;
    notificationsEnabled: boolean;
    soundEnabled: boolean;
    notificationId: string;

    constructor(notificationId: string, options: any) {
        this.options = options;
        this.service = stores.ServicesStore.services
            .filter(service => service.key === this.options.serviceId)[0];
        this.notificationsEnabled = stores.SettingsStore.notifications;
        this.soundEnabled = stores.SettingsStore.sound;
        this.notificationId = notificationId;

        this.handleIpcMessage();
    }

    handleIpcMessage() {
        this.options.tag = uuidV1();

        if (!this.service.notificationsEnabled || !this.notificationsEnabled) {
            return;
        }

        if (!this.service.sound || !this.soundEnabled) {
            this.options.silent = true;
        }

        const notification = new window.Notification(
            this.options.title,
            this.options
        );

        notification.onclick = (event) => {
            stores.ServicesStore.setVisible(this.options.serviceId);
            this.service.webview.send(
                `notification-onclick:${this.notificationId}`,
                event,
            );
            console.log(`notification-onclick:${this.notificationId}`);
            window.app.storage.persistServices();

            console.log(event);
            mainWindow.show();
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }

        setTimeout(function () {
            notification.close()
        }, 5000)
    }
}

export default IpcHandler
