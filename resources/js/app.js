import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom";

import '../scss/app.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';

import Header from './components/header';
import Footer from './components/footer';

import Banner from './components/home/banner';
import WrapperHome from './components/home/wrapper';

import About from './components/about';

import WrapperProduct from './components/product/wrapper';

class App extends React.Component {
    render() {
        return (
        <Router>
            <div className="App">
                <Header />

                <Route exact path="/">
                    <Banner />
                    <WrapperHome />
                </Route>

                <Route exact path="/product">
                    <WrapperProduct />
                </Route>

                <Route exact path="/about">
                    <About />
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
