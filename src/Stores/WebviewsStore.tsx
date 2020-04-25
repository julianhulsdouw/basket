import { observable, computed } from "mobx";
import Service from "../Models/Service";

export interface iWebviewsStore {
    services: Service[]
    enabledWebviews: Service[]
    preferences: any;
    preferencesWebview: any;
}

class WebviewsStore<iWebviewsStore> {
    @observable services: Service[];
    @observable preferences: any;

    constructor(services: Service[]) {
        this.services = services;
    }

    @computed get enabledWebviews(): Service[] {
        return this.services.filter(service => service.enabled);
    }

    @computed get preferencesWebview(): any {
        return this.preferences;
    }
}

export default WebviewsStore;
