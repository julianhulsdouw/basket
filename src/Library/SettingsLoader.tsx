const electron = window.require('electron');
const fs = window.require('fs');
const path = require('path');
const { isDevMode } = require('../Library/environment');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const settingsFileNname = 'settings.json';
export const SettingsPath = isDevMode
    ? path.join(__dirname, '../' + settingsFileNname)
    : path.join(userDataPath, settingsFileNname);

const servicesFilename = 'services.json';
export const ServicesPath = isDevMode
    ? path.join(__dirname, '../' + servicesFilename)
    : path.join(userDataPath, servicesFilename);

let ServicesJson = "{}";
let SettingsJson = "{}";
if (fs.existsSync(ServicesPath)) {
    ServicesJson = fs.readFileSync(ServicesPath, 'utf-8');
}
if (fs.existsSync(SettingsPath)) {
    SettingsJson = fs.readFileSync(SettingsPath, 'utf-8');
}

export {
    ServicesJson,
    SettingsJson
}
