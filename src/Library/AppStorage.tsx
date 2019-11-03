import { ServicesPath, SettingsPath } from './SettingsLoader';
const fs = window.require('fs');

export interface iAppStorage {
    stores: any
    persistServices(): void;
    persistSettings(): void;
}

class AppStorage<iAppStorage> {
    stores: any;

    constructor(stores) {
        this.stores = stores;
    }

    persistServices(): void {
        fs.writeFileSync(ServicesPath, this.stores.ServicesStore!.toJSON);
    }

    persistSettings(): void {
        fs.writeFileSync(SettingsPath, this.stores.SettingsStore!.toJSON);
    }
}

export default AppStorage
