import { observable, computed } from "mobx";

export interface iSettingsStore {
    sound: boolean;
    notifications: boolean
    preferencesViewVisible: boolean
    fromJson(): this
    toggleSound(): void
    toggleNotifications(): void
    showPreferencesView(): void
    hidePreferencesView(): void
}

class SettingsStore<iSettingsStore> {
    @observable notifications: boolean;
    @observable preferencesViewVisible: boolean;
    @observable sound: boolean;

    constructor() {
        this.preferencesViewVisible = false;
        this.sound = true; // TODO default value for now
        this.notifications = true; // TODO default value for now
    }

    fromJson(settings): this {
        this.sound = 'sound' in settings ? settings.sound : true;
        this.notifications = 'notifications' in settings ? settings.notifications : true;

        return this;
    }

    @computed get toJSON() {
        return JSON.stringify({
            notifications: this.notifications,
            sound: this.sound,
        });
    }

    toggleNotifications() {
        this.notifications = !this.notifications;
    }

    showPreferencesView() {
        this.preferencesViewVisible = true;
    }

    hidePreferencesView() {
        this.preferencesViewVisible = false;
    }

    toggleSound() {
        this.sound = !this.sound;
    }

}

export default SettingsStore;
