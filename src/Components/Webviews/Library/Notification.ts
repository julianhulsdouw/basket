import { ipcRenderer } from 'electron';
import uuidV1 from 'uuid/v1';

class Notification {
    static permission = 'granted';
    title: string;
    options: object;
    notificationId: string;
    onclick: any;

    constructor(title = '', options = {}) {
        this.title = title;
        this.options = options;
        this.notificationId = uuidV1();

        ipcRenderer.sendToHost('notification', this.onNotify({
            title: this.title,
            options: this.options,
            notificationId: this.notificationId,
        }));

        ipcRenderer.once(`notification-onclick:${this.notificationId}`, () => {
            if (typeof this.onclick === 'function') {
                this.onclick();
            }
        });
    }

    static requestPermission(cb = null) {
        if (!cb) {
            return new Promise((resolve) => {
                resolve(Notification.permission);
            });
        }

        if (typeof (cb) === 'function') {
            // @ts-ignore
            return cb(Notification.permission);
        }

        return Notification.permission;
    }

    addEventListener(arg1, arg2) {
        if (arg1 === 'click') {
            this.onclick = arg2;
        }
    }

    onNotify(data) {
        console.log(data);
        return data;
    }

    onClick() { }

    close() { }
}

export default Notification;
