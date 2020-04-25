import React from 'react';
import ElectronWebView from 'react-electron-web-view';
import { observer, inject } from 'mobx-react';
import Service from '../../Models/Service';
import IpcHandler from '../../Library/IpcHandler';
import { iServicesStore } from '../../Stores/ServicesStore';
import { iServicesWebviewsStore } from '../../Stores/ServicesWebviewsStore';
import { iSettingsStore } from '../../Stores/SettingsStore';

const { remote } = window.require('electron');
const shell = window.require('electron').shell;

interface iServiceWebviewProps {
    id: string
    ServicesStore?: iServicesStore
    ServicesWebviewsStore?: iServicesWebviewsStore
    SettingsStore?: iSettingsStore
}

@inject('ServicesStore', 'ServicesWebviewsStore', 'SettingsStore')
@observer
class ServiceWebView extends React.Component<iServiceWebviewProps> {
    id: string;
    webview: any;

    constructor(props) {
        super(props)
        this.id = props.id;
    }

    service(): Service {
        return this.props.ServicesWebviewsStore!.services
            .filter(service => service.key === this.id)[0];
    }

    addEventListeners(): void {
        if (this.webview && this.webview.view) {
            this.webview.view.addEventListener('new-window', (event) => {
                event.preventDefault();
                shell.openExternal(event.url);
            });

            this.webview.view.addEventListener('ipc-message', (event) => {
                if (event.channel === 'hello') {

                    console.log('test');

                    // const modulePath = path.join(__dirname, "/Services/whatsapp.com/index");
                    // console.log(modulePath);
                    // import(/* webpackMode: "eager" */ modulePath);
                    // const test = require('./Services/whatsapp.com/index.js');

                    this.service().webview.send('init-recipe', { test: 'jaa' });
                }

                if (event.channel === 'notification') {
                    const options = event.args[0].options;
                    options.serviceId = this.id;
                    options.title = event.args[0].title;

                    new IpcHandler(event.args[0].notificationId, options);
                }
            });
        }
    }

    render() {
        const OuterStyle = {
            width: '100%',
            height: '100%',
        };

        const classes = ['view'];
        if (this.service().isVisible) {
            classes.push('view-active');
        }

        return (
            <div id={this.id} className={classes.join(' ')} key={this.id}>
                <ElectronWebView
                    autosize
                    className="inner-view"
                    id={this.id}
                    onDidAttach={() => {
                        this.addEventListeners();

                        const isAudioMuted = !this.service().soundEnabled || !this.props.SettingsStore!.sound;
                        this.service().webview.view.setAudioMuted(isAudioMuted)
                    }}
                    partition={`persist:service-${this.id}`}
                    preload={`file://${remote.app.getAppPath()}/servicePreload.js`}
                    ref={(webview) => {
                        this.webview = webview;
                        this.service().webview = webview;
                    }}
                    src={this.service().url}
                    style={OuterStyle}
                    useragent={this.service().userAgent}
                />
            </div>
        )
    }
}

export default ServiceWebView;
