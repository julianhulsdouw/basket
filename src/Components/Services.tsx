import React from 'react';
import { observer, inject } from 'mobx-react';
import { SortableContainer } from 'react-sortable-hoc';

import { iServicesStore } from '../Stores/ServicesStore';
import ServiceTab from './Tabs/ServiceTab';
import { iSettingsStore } from '../Stores/SettingsStore';

interface ServicesProps {
    items: any,
    ServicesStore?: iServicesStore,
    SettingsStore?: iSettingsStore,
}

@inject('ServicesStore', 'SettingsStore')
@observer
class Services extends React.Component<ServicesProps> {

    componentDidUpdate() {
        window.app.menu.createMenu();
    }

    setActive(identifier) {
        const service = this.props
            .ServicesStore!
            .services
            .filter(service => service.key === identifier)[0];

        if (!service.enabled || service.isVisible) {
            return null;
        }

        if (this.props.SettingsStore!.preferencesViewVisible) {
            this.props.SettingsStore!.hidePreferencesView();
        }

        this.props.ServicesStore!.setVisible(identifier);
        if (document.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
        service.webview.view.focus();
        window.app.storage.persistServices();
    }

    render() {
        return (
            <ul className="services">
                {this.props.ServicesStore!.services.map((service) => (
                    <ServiceTab
                        clickHandler={() => this.setActive(service.key)}
                        key={service.key}
                        icon={service.icon}
                        id={service.key}
                        index={service.currentIndex}
                        sortedIndex={service.index}
                        title={service.title}
                        visible={service.visible}
                    />
                ))}
            </ul>
        );
    }
}

export default SortableContainer(Services);
