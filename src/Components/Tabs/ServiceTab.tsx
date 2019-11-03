import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { cmdKey } from '../../Library/environment';
import Service from '../../Models/Service';
import { iServicesStore } from '../../Stores/ServicesStore';
import { iSettingsStore } from '../../Stores/SettingsStore';
import { iServicesWebviewsStore } from '../../Stores/ServicesWebviewsStore';

const electron = window.require('electron');

const { Menu } = electron.remote;

interface TabProps {
    icon: string
    id: string
    clickHandler: any
    index: number
    sortedIndex: number
    title: string
    ServicesStore?: iServicesStore
    SettingsStore?: iSettingsStore
    ServicesWebviewsStore?: iServicesWebviewsStore
    visible: boolean
}

@inject('ServicesStore', 'SettingsStore', 'ServicesWebviewsStore')
@observer
class ServiceTab extends React.Component<TabProps> {
    @observable visible: boolean;
    @observable icon: string;
    @observable id: string;
    @observable sortedIndex: number;
    @observable title: string;
    @observable clickHandler: any;

    constructor(props) {
        super(props);

        this.visible = props.visible;
        this.title = props.title;
        this.clickHandler = props.clickHandler;
        this.icon = props.icon;
        this.sortedIndex = props.sortedIndex;
        this.id = props.id;
    }

    service(): Service {
        return this
            .props
            .ServicesStore!
            .services
            .filter(service => service.key === this.id)[0];
    }

    defaultClickHandler() {
        if (!this.service().enabled) {
            return null;
        }

        if (this.props.SettingsStore!.preferencesViewVisible) {
            this.props.SettingsStore!.hidePreferencesView();
        }

        this.props.ServicesStore!.setVisible(this.id);
        window.app.storage.persistServices();
    }

    soundClickHandler() {
        this.service().setSound(!this.service().soundEnabled);
        window.app.storage.persistServices();
    }

    notificationClickHandler() {
        this.service().notificationsEnabled = !this.service().notificationsEnabled;
        window.app.storage.persistServices();
    }

    serviceClickHandler() {
        this.service().serviceEnabled = !this.service().serviceEnabled
        if (this.service().serviceEnabled) {
            this.defaultClickHandler();
        }
        window.app.menu.createMenu();
        window.app.storage.persistServices();
    }

    reloadClickHandler() {
        this.service().webview.reload();
    }

    removeClickHandler() {
        if (window.confirm('Are you sure you want to delete this service?')) {
            const index = this.props.ServicesStore!.services.indexOf(this.service());
            this.props.ServicesStore!.services.splice(index, 1);

            window.app.menu.createMenu();
            window.app.storage.persistServices();
        }
    }

    @computed get contextMenu() {
        const sound = this.service().soundEnabled;
        const notifications = this.service().notificationsEnabled;
        const enabled = this.service().enabled;

        const items: Electron.MenuItemConstructorOptions[] = [
            {
                label: this.service().title,
                accelerator: `CmdOrCtrl+${this.service().index + 1}`
            },
            {
                type: 'separator',
            },
            {
                label: 'Reload',
                click: () => this.reloadClickHandler(),
            },
            {
                type: 'separator',
            },
            {
                label: sound ? 'Disable sound' : 'Enable sound',
                click: () => this.soundClickHandler(),
            },
            {
                label: notifications ? 'Disable notifications' : 'Enable notifications',
                click: () => this.notificationClickHandler(),
            },
            {
                label: enabled ? 'Disable service' : 'Enable service',
                click: () => this.serviceClickHandler(),
            },
            {
                type: 'separator',
            },
            {
                label: 'Remove service',
                enabled: true,
                click: () => this.removeClickHandler(),
            },
        ];

        return Menu.buildFromTemplate(items);
    }

    @computed get currentIndex() {
        return this.sortedIndex;
    }

    render() {
        const classes = ['sidebar-item'];
        if (this.service().isVisible && this.service().enabled) {
            classes.push('active');
        }
        if (this.service().enabled === false) {
            classes.push('disabled');
        }

        const title = `${this.title} (${cmdKey} + ${this.currentIndex + 1})`

        return (
            <li
                className={classes.join(' ')}
                key={this.id}
                onClick={this.clickHandler}
                onContextMenu={() => this.contextMenu.popup()}
                title={title}
            >
                <img src={this.icon} className="sidebar-logo" alt={this.title} />
            </li>
        );
    }
}

export default SortableElement(ServiceTab);
