import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css'
import Home from './screens/Home';
import { Switch, Route } from 'react-router-dom';
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
// import "bootstrap/dist/js/bootstrap.bundle"

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

  moment().locale("fr")
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/admin*" component={AdminLayout} />
        <Route path="/*" component={MainLayout} />
        {/* <Route path="/auth*" component={AuthLayout} /> */}
      </Switch>
      <ToastContainer position="top-right"
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover/>
    </BrowserRouter>
  );
}

export default App;
