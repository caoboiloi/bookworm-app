import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom";

import '../scss/app.scss';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/header';
import Footer from './components/footer';

class App extends React.Component {
    render() {
        return (
        <Router>
            <div className="App">
                <Header />

                <Route exact path="/">
                    <h1>Home</h1>
                </Route>
                <Route exact path="/product">
                    <h1>product</h1>
                </Route>
                <Route exact path="/about">
                    <h1>about</h1>
                </Route>
                <Route exact path="/cart">
                    <h1>cart</h1>
                </Route>

                <Footer />
                {/* <Route path="**" render={() => <h1>Route not found!</h1>}></Route> */}
            </div>
        </Router>
        );
    }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
