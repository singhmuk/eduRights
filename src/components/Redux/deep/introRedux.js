import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

// import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import ReduxFig from '../../../assets/js/redux.png'

const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 350,
  width: 500
}

const styles = theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: "center"
  }
})


const code = ``.trim();

// const code = ``.trim();

// const code = ``.trim();

// const code = ``.trim();



class IntroRedux extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4><Sidebar /></h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>1.What is Redux</h3>
              <img src={ReduxFig} alt="Omega" className="responsive" style={redesign} />
              <p>
                Only way to change the state is by firing actions from our application and then writing
                reducers for these actions that modify the state. The entire state transition is kept inside reducers and should not
                have any side-effects. All of these
                data is retained by redux in a closure that redux calls a store . It also provides us a recipe of creating the
                store, namely createStore(x).
                <br />
                <br />

                The createStore function accepts another function, as an argument. The passed in
                function is responsible for returning the state of the application at that point in time, which is then persisted in
                the store. This passed in function is known as the reducer.
                This store can only be updated by dispatching an action.
                <br />
                <br />

                <ul>
                  <li>Our App dispatches an action, it is passed into reducer. </li>
                  <li>The reducer returns a fresh instance of the state.</li>
                  <li>The store notifies our App and it can begin it's re render as required.</li>
                </ul>
              </p>
              <br />

              <h3>2.Principles of Redux</h3>
              <p>
                Three most important principles:<br />
                <ul>
                  <li><b>Single Source of Truth: </b>The state of our whole application is stored in an object tree within a single store.</li>
                  <li><b>State is Read-only: </b>The only way to change the state is to emit an action,
                    an object describing what happened. This means nobody can directly change the state of our application.</li>
                  <li><b>Changes are made with pure functions: </b>To specify how the state tree is transformed by actions, we write pure reducers. A
                    reducer is a central place where state modification takes place. Reducer is a function which takes state and action
                    as arguments, and returns a newly updated state.</li>
                </ul>
              </p>
              <br />

              <h3>3.What is Redux Thunk used for</h3>
              <p>
                Redux thunk is middleware that allows us to write action creators that return a function instead of an action. The
                thunk can then be used to delay the dispatch of an action if a certain condition is met. This allows us to handle the
                asyncronous dispatching of actions. The inner function receives the store methods dispatch and getState as parameters.
                To enable Redux Thunk, we need to use applyMiddleware()
              </p>
              <h3>4.Explain the components of Redux</h3>
              <p>
                <ul>
                  <li><b>Action: </b>Are payloads of information that send data from our
                    application to our store. We send them to the store using store.dispatch().</li>
                  <li><b>Reducer: </b>specify how the application’s state changes in response to actions sent to the store.</li>
                  <li><b>Store: </b>Is the object that brings Action and Reducer together. The store has the following responsibilities:</li>
                  <ul>
                    <li>Holds application state</li>
                    <li>Allows access to state via getState()</li>
                    <li>Allows state to be updated via dispatch(action)</li>
                    <li>Registers listeners via subscribe(listener)</li>
                    <li>Handles unregistering of listeners via the function returned by subscribe(listener)</li>
                  </ul>
                </ul>
              </p>
              <br />

              <h3>5.What are the advantages of Redux?</h3>
              <p>
                <ul>
                  <li><b>Predictability of outcome: </b>Since there is always one source of truth, there is no confusion about how to sync the
                    current state with actions and other parts of the application.</li>
                  <li><b>Maintainability: </b>The code becomes easier to maintain with a predictable outcome and strict structure.</li>
                  <li><b>Server-side rendering: </b>You just need to pass the store created on
                    the server, to the client side. This is very useful for initial render and provides a better user experience as it
                    optimizes the application performance.</li>
                </ul>
              </p>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(IntroRedux));
