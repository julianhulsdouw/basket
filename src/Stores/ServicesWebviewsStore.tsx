import { observable, computed } from "mobx";
import Service from "../Models/Service";

export interface iServicesWebviewsStore {
    services: Service[]
    enabledWebviews: Service[]
}

class ServicesWebviewsStore<iServicesWebviewsStores> {
    @observable services: Service[];

    constructor(services: Service[]) {
        this.services = services;
    }

    @computed get enabledWebviews(): Service[] {
        return this.services.filter(service => service.enabled);
    }
}

export default ServicesWebviewsStore;
