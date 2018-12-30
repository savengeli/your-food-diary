import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';
import {createStore, applyMiddleware}  from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer'

const store = createStore(reducer, applyMiddleware(thunk));

WebFont.load({
    google: {
        families: ['Indie Flower', 'cursive']
    }
});

ReactDOM.render(<Provider store={store}><App /></Provider>, 
    document.getElementById('root'));

serviceWorker.unregister();
