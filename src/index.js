import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './utility/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fff',
            main: '#ef5366',
            dark: '#000',
        },
        secondary: {
            main: 'rgba(240, 240, 240, 0.8)',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
