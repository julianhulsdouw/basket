import React from 'react';
import ReactDOM from 'react-dom';
import AppLayoutComponent from './Components/AppLayout';
import './Sass/main.scss';
import { stores } from './Stores';
import { Provider } from 'mobx-react';
import AppStorage from './Library/AppStorage';
import './Sass/main.scss';

declare global {
    interface Window { app: any; }
}

window.addEventListener('load', () => {
    const storage = new AppStorage(stores);

    console.log('preferences loaded');
    // window.app = {
    //     storage,
    //     render() {
    //         const app = (
    //             <Provider {...stores}>
    //                 <div className="app">
    //                     <div className="draggable"></div>

    //                     <div className="layout">
    //                         <AppLayoutComponent />
    //                     </div>
    //                 </div>
    //             </Provider>
    //         );

    //         ReactDOM.render(app, document.getElementById('root'));
    //     },
    // }

    // window.app.render();
});
