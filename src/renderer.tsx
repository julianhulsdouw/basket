import React from 'react';
import ReactDOM from 'react-dom';
import AppLayoutComponent from './Components/AppLayout';
import './Sass/main.scss';
import { stores } from './Stores';
import { Provider } from 'mobx-react';
import AppMenu from './Library/AppMenu';
import AppStorage from './Library/AppStorage';
import './Sass/main.scss';

declare global {
    interface Window { app: any; }
}

window.addEventListener('load', () => {
    const menu = new AppMenu(stores);
    const storage = new AppStorage(stores);

    window.app = {
        menu,
        storage,
        render() {
            const app = (
                <Provider {...stores}>
                    <div className="app">
                        <div className="draggable"></div>

                        <div className="layout">
                            <AppLayoutComponent />
                        </div>
                    </div>
                </Provider>
            );

            ReactDOM.render(app, document.getElementById('root'));
        },
    }

    window.app.render();
});

window.addEventListener('dragover', event => event.preventDefault());
window.addEventListener('drop', event => event.preventDefault());
window.addEventListener('dragover', event => event.stopPropagation());
window.addEventListener('drop', event => event.stopPropagation());
