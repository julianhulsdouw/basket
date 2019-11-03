import React from 'react';
import { observer, inject } from 'mobx-react';

import SidebarComponent from './Sidebar';
import ServiceWebviewComponent from './Webviews/ServiceWebview';
import PreferencesWebviewComponent from './Webviews/PreferencesWebview';
import { iSettingsStore } from '../Stores/SettingsStore';
import { iServicesWebviewsStore } from '../Stores/ServicesWebviewsStore';

interface AppLayoutProps {
    SettingsStore?: iSettingsStore
    ServicesWebviewsStore?: iServicesWebviewsStore
}

@inject('ServicesWebviewsStore', 'SettingsStore')
@observer
class AppLayout extends React.Component<AppLayoutProps> {

    preferencesWebview() {
        if (this.props.SettingsStore!.preferencesViewVisible) {
            return <PreferencesWebviewComponent />
        }
    }

    render() {
        return (
            <div className="layout">
                <SidebarComponent />

                <div className="views">
                    {this.props.ServicesWebviewsStore!.enabledWebviews.map(service => (
                        <ServiceWebviewComponent
                            id={service.key}
                            key={service.key}
                        />
                    ))}

                    {this.preferencesWebview()}

                </div>
            </div>
        );
    }
}

export default AppLayout;
