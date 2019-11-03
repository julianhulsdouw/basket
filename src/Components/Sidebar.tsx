import React from 'react';
import ServicesComponent from './Services';
import { iServicesStore } from '../Stores/ServicesStore';
import MuteSoundTab from './Tabs/MuteSoundTab';
import MuteNotificationTab from './Tabs/MuteNotificationTab';
import PreferencesTab from './Tabs/PreferencesTab';
import { inject, observer } from 'mobx-react';
import arrayMove from 'array-move';

interface SidebarProps {
    ServicesStore?: iServicesStore
}

@inject('ServicesStore')
@observer
class Sidebar extends React.Component<SidebarProps> {
    state = { items: this.props.ServicesStore!.services };

    onSortEnd = ({ oldIndex, newIndex }) => {
        const sortedArray = arrayMove(this.props.ServicesStore!.services, oldIndex, newIndex);
        const sortedArrayItems = sortedArray.entries();

        const sortedServices = Array.from(sortedArrayItems).map((arrayItems) => {
            arrayItems[1].index = arrayItems[0];
            return arrayItems[1];
        });

        this.props.ServicesStore!.services = sortedServices;
        window.app.storage.persistServices();
    };

    render() {
        return (
            <div className="outer-sidebar">
                <div className="sidebar">
                    <ServicesComponent
                        items={this.state.items}
                        onSortEnd={this.onSortEnd}
                        distance={2}
                        axis="y"
                        lockAxis="y"
                        helperClass="is-reordering"
                    />

                    <div className="bottom">
                        <MuteNotificationTab />
                        <MuteSoundTab />
                        <PreferencesTab />
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
