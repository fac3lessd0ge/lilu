import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import App from './App';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyles = createGlobalStyle`
  :root {
    --headerColor: #E8DFAB;
    --footerColor: #7bc25e;
    --buttonColor: #60be3b;
    --toastify-color-progress-light: var(--buttonColor);
    --toastify-toast-min-height: 50px;
  }

  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles />
      <App />
      <ToastContainer
				position="top-center"
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
        draggableDirection={'y'}
        draggablePercent={60}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
    </BrowserRouter>
  </Provider>
);