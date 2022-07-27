import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx';
import {Provider} from "react-redux";

import {store} from "./redux/store";
const rootElem = document.getElementById('root')

if(rootElem){
    const root = ReactDOM.createRoot(rootElem);

    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    );
}