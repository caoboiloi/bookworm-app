import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import '../scss/app.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';

import { Provider } from "react-redux";
import { createStore } from "redux";

import Header from './components/header';
import Footer from './components/footer';

import Banner from './components/home/banner';

import WrapperHome from './components/home/wrapper';

import WrapperProduct from './components/product/wrapper';

import WrapperCart from './components/cart/wrapper';

import WrapperDetail from './components/detail/wrapper';

import About from './components/about';

import NotFound from './components/404';

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
                        <Switch>
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
                                <WrapperCart />
                            </Route>

                            <Route exact path="/detail/:idBook">
                                <WrapperDetail />
                            </Route>

                            <Route path='/error' component={NotFound} />
                            <Redirect from='*' to='/error' />
                        </Switch>

                        <Footer />
                        {/* <Route path="**" render={() => <h1>Route not found!</h1>}></Route> */}
                    </div>
                </Router>
            </Provider>
        );
    }
}

const render = () => ReactDOM.render(<App />, document.getElementById("root"));

render();
