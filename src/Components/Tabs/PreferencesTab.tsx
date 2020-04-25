import React from 'react';
import { inject, observer } from 'mobx-react';
import { iSettingsStore } from '../../Stores/SettingsStore';
import { iServicesStore } from '../../Stores/ServicesStore';

interface TabProps {
    SettingsStore?: iSettingsStore
    ServicesStore?: iServicesStore
}

@inject('SettingsStore', 'ServicesStore')
@observer
class PreferencesTab extends React.Component<TabProps> {
    clickHandler() {
        this.props.ServicesStore!.enabledServices
            .forEach(service => service.visible = false);

        this.props.SettingsStore!.showPreferencesView();
    }

    render() {
        const classes = ['sidebar-item', 'small'];
        if (this.props.SettingsStore!.preferencesViewVisible) {
            classes.push('active');
        }

        return (
            <li
                className={classes.join(' ')}
                key="preferences"
                onClick={() => this.clickHandler()}
            >
                <img src="./Static/serviceIcons/preferences.svg" className="sidebar-logo" alt="Preferences" />
            </li>
        );
    }
}

export default PreferencesTab;
