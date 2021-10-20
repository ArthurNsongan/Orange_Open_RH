import logo from './logo.svg';
import './App.css';
import 'boosted/dist/css/boosted.css';
import 'react-toastify/dist/ReactToastify.css'
import Home from './screens/Home';
import { Switch, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import $ from 'jquery'
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import "moment/locale/fr";

// import { ScrollToTop } from 'react-router-scroll-to-top';
import ScrollRestoration from 'react-scroll-restoration'
import { Provider } from 'react-redux';
// import "bootstrap/dist/js/bootstrap.bundle"

import AppStore from './redux/appStore'
import { everyRequestConfig, getAuthHeaders, getToken, IsConnected } from './services/Auth';

import Layouts from './layouts';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({
      "top": 0,
      "behavior": "auto",
      "left": 0
    });
    console.log("window scrolled !!!")
  }, [])

  return null;
}


function App() {

  everyRequestConfig();

  moment().locale("fr");
  
  return (
    <Provider store={AppStore}>
      <BrowserRouter>
        <ScrollRestoration />
        <Switch>
          <Layouts />
        </Switch>
        <ToastContainer position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
