const ipcRenderer = require('electron').ipcRenderer;
const { v1: uuidv1 } = require('uuid');

class Notification {
    constructor(title = '', options = {}) {
        this.title = title;
        this.options = options;
        this.notificationId = uuidv1();
        this.permission = 'granted';

        ipcRenderer.sendToHost(
            'notification',
            this.onNotify({
                title: this.title,
                options: this.options,
                notificationId: this.notificationId,
            }),
        );

        ipcRenderer.once(`notification-onclick:${this.notificationId}`, () => {
            if (typeof this.onclick === 'function') {
                this.onclick();
            }
        });
    }

    static requestPermission(cb = null) {
        if (!cb) {
            return new Promise((resolve) => {
                resolve('granted');
            });
        }

        if (typeof cb === 'function') {
            return cb('granted');
        }

        return 'granted';
    }

    addEventListener(arg1, arg2) {
        if (arg1 === 'click') {
            this.onclick = arg2;
        }
    }

    // eslint-disable-next-line
    onNotify(data) {
        return data;
    }

    // eslint-disable-next-line
    onClick() {}

    // eslint-disable-next-line
    close() {}
}

window.Notification = Notification;
