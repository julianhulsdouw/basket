import { v1 as uuidv1 } from 'uuid';
import { remote } from 'electron';
import GetWebview from '../webview';

const mainWindow = remote.getCurrentWindow();

class NotificationHandler {
    constructor(notificationId, options, store) {
        this.notificationId = notificationId;
        this.options = options;

        this.store = store;
        this.service = store.getters['services/serviceByIdentifier'](
            options.identifier,
        );

        this.allNotificationsMuted =
            store.getters['settings/getNotificationsMuted'];
        this.allSoundMuted = store.getters['settings/getSoundMuted'];

        this.handleNotification();
    }

    handleNotification() {
        this.options.tag = uuidv1();

        if (!this.service.notificationsEnabled || this.allNotificationsMuted) {
            return;
        }

        if (!this.service.soundEnabled || this.allSoundMuted) {
            this.options.silent = true;
        }

        const notification = new window.Notification(
            this.options.title,
            this.options,
        );

        notification.onclick = (event) => {
            // Set the correct webview as active
            this.store.dispatch('services/setActive', this.service.identifier);

            // Send the event to the correct webview.
            const webview = GetWebview(this.service.identifier);
            webview.send(`notification-onclick:${this.notificationId}`, event);

            // Make sure the app gets opened
            mainWindow.show();
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        };

        setTimeout(() => {
            notification.close();
        }, 5000);
    }
}

export default NotificationHandler;
