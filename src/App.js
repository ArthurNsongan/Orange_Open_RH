import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './screens/Home';
import { Switch, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="*" component={MainLayout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
