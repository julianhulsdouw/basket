import { observable, computed } from "mobx";
import Service from "../Models/Service";

export interface iServicesStore {
    services: Service[];
    enabledServices: Service[];
    orderdServices: Service[];
    setVisible(id: string): void;
    activeService(): void;
}

class ServicesStore<iServicesStore> {
    @observable services: Service[];

    constructor(services: Service[]) {
        this.services = services;
    }

    @computed get enabledServices(): Service[] {
        return this.services.filter(service => service.enabled);
    }

    @computed get orderdServices(): Service[] {
        return this.services.slice().sort((a, b) => (a.index > b.index) ? 1 : -1);
    }

    @computed get toJSON() {
        return JSON.stringify(this.services.map(service => service.toObject));
    }

    @computed get activeService() {
        return this.services.filter(service => service.isVisible === true)[0];
    }

    setVisible(id: string) {
        this.services.forEach(service => service.visible = false);

        this.services
            .filter(service => service.key === id)
            .forEach(service => service.visible = true);
    }
}

export default ServicesStore;
