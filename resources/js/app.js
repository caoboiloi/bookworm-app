import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom";

import '../scss/app.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';

import { Provider } from "react-redux";
import { createStore } from "redux";

import Header from './components/header';
import Footer from './components/footer';

import Banner from './components/home/banner';
import WrapperHome from './components/home/wrapper';

import About from './components/about';

import WrapperProduct from './components/product/wrapper';

// Call reducers
import reducers from "./reducers/index";
// Create store
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header />

                        <Route exact path="/">
                            <Banner />
                            <WrapperHome />
                        </Route>

                        <Route exact path="/product/:redirectParams">
                            <WrapperProduct />
                        </Route>

                        <Route exact path="/about">
                            <About />
                        </Route>

                        <Route exact path="/cart">
                            <h1>cart</h1>
                        </Route>

                        <Footer />
                        <Route path="**" render={() => <h1>Route not found!</h1>}></Route>
                    </div>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
