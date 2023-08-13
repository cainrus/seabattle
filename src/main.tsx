import {DevSupport} from "@react-buddy/ide-toolbox";
import React from 'react'

import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css';
import {ComponentPreviews, useInitial} from "./dev";

import reportWebVitals from "./reportWebVitals";
import App from './App.tsx'
import './index.scss';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <App/>
        </DevSupport>
    </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
