import  React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from '../Login';
import Home from '../../pages/Home';
import Events from '../../pages/Events';

class App extends Component {

    render(){
        return (
            <Router basename={'/'}>
                <div className="app">
                    <Login />
                    <div className="app-body">
                        <Route exact path="/" component={Home} />
                        <Route path="/events" component={Events} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;