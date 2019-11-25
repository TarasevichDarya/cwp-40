var React = require("react");
var ReactDOM = require("react-dom");
var redux = require("redux");
var Provider = require("react-redux").Provider;
var reducer = require("./reducer.jsx");
var AppView = require("./appview.jsx");
var App = require("./apps.jsx");
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
 
var store = redux.createStore(reducer);

class About extends React.Component{
        render(){
            return <div>
            <h1>Add: Drawing up the route</h1> 
            <h2>Creator: Evgenii</h2> 
            <h4>Task: <a href="https://accetone.github.io/cwp/tasks/40.html">Lab40</a></h4> 
            <h5>2019</h5>
            </div>;
        }
}

class NotFound extends React.Component{
        render(){
            return <h2>Page not found</h2>;
    }
}
 
store.dispatch({
  type: "SET_STATE",
  state: {
  	past: [],
    paths: [ " Car Moscow 4 Hour",  " Bike Minsk 4 Hour",  " Bus Rio 60 Hour" ],
    future: []
  }
});
 

ReactDOM.render(
  <Provider store={store}>
  <Router>
            <Switch>
                <Route exact path="/" component={AppView} />
                <Route path="/about" component={About} />
                <Route path="/app" component={App} />
                <Route component={NotFound} />
            </Switch>
        </Router>
  </Provider>,
  document.getElementById("container")
);