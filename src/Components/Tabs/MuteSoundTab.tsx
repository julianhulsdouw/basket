import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { iSettingsStore } from '../../Stores/SettingsStore';
import { iServicesStore } from '../../Stores/ServicesStore';

interface iTabProps {
    SettingsStore?: iSettingsStore
    ServicesStore?: iServicesStore
}

@inject('SettingsStore', 'ServicesStore')
@observer
class MuteTab extends React.Component<iTabProps> {
    clickHandler() {
        this.props.SettingsStore!.toggleSound();

        this.props.ServicesStore!.enabledServices
            .forEach((service) => {
                let audioMuted = !service.sound;
                const appAudioMuted = !this.props.SettingsStore!.sound
                if (appAudioMuted) {
                    audioMuted = appAudioMuted;
                }

                service.webview.view.setAudioMuted(audioMuted);
            });

        window.app.storage.persistSettings();
    }

    @computed get muteIcon() {
        if (this.props.SettingsStore!.sound) {
            return './Static/serviceIcons/volume_up-24px.svg';
        }

        return './Static/serviceIcons/volume_off-24px.svg';
    }

    render() {
        return (
            <li
                className="sidebar-item small"
                key="mutesound"
                onClick={() => this.clickHandler()}
            >
                <img src={this.muteIcon} className="sidebar-logo" alt="Mute sound" />
            </li>
        );
    }
}

export default MuteTab;
