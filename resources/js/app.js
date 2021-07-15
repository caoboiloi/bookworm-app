import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.scss';

class App extends React.Component {
    render() {
        return (
            <h1>Hello mn</h1>
        //   <Router>
        //     <div className="App">
        //       <Navbar />

        //       <Route exact path="/">

        //       </Route>
        //       <Route exact path="/contact">

        //       </Route>
        //       <Route exact path="/hello">

        //       </Route>
        //       {/* <Route path="**" render={() => <h1>Route not found!</h1>}></Route> */}
        //     </div>
        //   </Router>
        );
      }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
