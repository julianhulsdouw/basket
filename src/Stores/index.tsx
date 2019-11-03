import ServicesStore from './ServicesStore';
import SettingsStore from './SettingsStore';
import ServicesWebviewsStore from './ServicesWebviewsStore';

import { ServicesJson, SettingsJson } from '../Library/SettingsLoader';
import Service from '../Models/Service';

let Settings = new SettingsStore();
if (SettingsJson) {
    Settings = Settings.fromJson(JSON.parse(SettingsJson));
}

const Services: Service[] = [];
const ParsedServices = JSON.parse(ServicesJson);
if (ParsedServices.length) {
    ParsedServices.forEach((service) => {
        const newService = new Service().fromJson(service);
        Services.push(newService);
    });
}

export const stores = {
    ServicesStore: new ServicesStore(Services),
    ServicesWebviewsStore: new ServicesWebviewsStore(Services),
    SettingsStore: Settings,
}
