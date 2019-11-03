import { computed, observable } from 'mobx';
import ElectronWebView from 'react-electron-web-view';
import { stores } from '../Stores';

class Service {
    @observable notificationsEnabled: boolean = true;
    @observable serviceEnabled: boolean = true;
    @observable soundEnabled: boolean = true;
    @observable visible: boolean = true;
    @observable index: number = 1;
    icon: string = '';
    key: string = '';
    title: string = '';
    url: string = '';
    webview: ElectronWebView;

    fromJson(service): this {
        if ('icon' in service) {
            this.setIcon(service.icon);
        }

        if ('title' in service) {
            this.setTitle(service.title);
        }

        if ('index' in service) {
            this.setIndex(service.index);
        }

        if ('url' in service) {
            this.setUrl(service.url);
        }

        if ('key' in service) {
            this.setKey(service.key);
        }

        if ('soundEnabled' in service) {
            this.setSound(service.soundEnabled);
        }

        if ('notificationsEnabled' in service) {
            this.setNotifications(service.notificationsEnabled);
        }

        if ('serviceEnabled' in service) {
            this.setEnabled(service.serviceEnabled);
        }

        if ('visible' in service) {
            this.setVisible(service.visible);
        }

        return this;
    }

    setTitle(title: string): this {
        this.title = title;
        return this;
    }

    setIcon(icon: string): this {
        this.icon = icon;
        return this;
    }

    setIndex(index: number): this {
        this.index = index;
        return this;
    }

    setUrl(url: string): this {
        this.url = url;
        return this;
    }

    setKey(key: string): this {
        this.key = key;
        return this;
    }

    setSound(soundEnabled: boolean): this {
        this.soundEnabled = soundEnabled;

        if (this.webview && stores.SettingsStore.sound) {
            this.webview.view.setAudioMuted(!soundEnabled);
        }

        return this;
    }

    setNotifications(notificationsEnabled: boolean): this {
        this.notificationsEnabled = notificationsEnabled;
        return this;
    }

    setEnabled(serviceEnabled: boolean): this {
        this.serviceEnabled = serviceEnabled;
        return this;
    }

    setVisible(visible: boolean): this {
        this.visible = visible;
        return this;
    }

    @computed get isVisible() {
        return this.visible;
    }

    @computed get sound() {
        return this.soundEnabled;
    }

    @computed get notifications() {
        return this.notificationsEnabled;
    }

    @computed get enabled() {
        return this.serviceEnabled;
    }

    @computed get currentIndex() {
        return this.index;
    }

    @computed get userAgent() {
        return window.navigator.userAgent.replace(/(Basket|Electron)([^\s]+\s)/g, '');
    }

    @computed get toObject() {
        return {
            serviceEnabled: this.enabled,
            icon: this.icon,
            index: this.currentIndex,
            key: this.key,
            notificationsEnabled: this.notificationsEnabled,
            soundEnabled: this.soundEnabled,
            title: this.title,
            url: this.url,
            visible: this.isVisible,
        };
    }
}

export default Service
