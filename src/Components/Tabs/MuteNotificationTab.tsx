import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { iSettingsStore } from '../../Stores/SettingsStore';

interface TabProps {
    SettingsStore?: iSettingsStore
}

@inject('SettingsStore')
@observer
class MuteNotificationTab extends React.Component<TabProps> {
    clickHandler() {
        this.props.SettingsStore!.toggleNotifications();
        window.app.storage.persistSettings();
    }

    @computed get notificationIcon() {
        if (this.props.SettingsStore!.notifications) {
            return './Static/serviceIcons/notifications-24px.svg';
        }

        return './Static/serviceIcons/notifications_off-24px.svg';
    }

    render() {
        return (
            <li
                className="sidebar-item small"
                key="mutenotification"
                onClick={() => this.clickHandler()}
            >
                <img src={this.notificationIcon}
                    className="sidebar-logo"
                    alt="Mute notifications"
                />
            </li>
        );
    }
}

export default MuteNotificationTab;
