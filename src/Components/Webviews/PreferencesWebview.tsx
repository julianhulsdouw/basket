import React from 'react';
import ElectronWebView from 'react-electron-web-view';
import { observer, inject } from 'mobx-react';

@inject('ServicesStore')
@observer
class PreferencesWebview extends React.Component {
    render() {
        const OuterStyle = {
            width: '100%',
            height: '100%',
        };

        return (
            <div id="preferences" className="view view-active" key="preferences">
                <ElectronWebView
                    id="preferences"
                    src="./preferences.html"
                    className="inner-view"
                    style={OuterStyle}
                />
            </div>
        )
    }
}

export default PreferencesWebview;
