import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

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

const counters = `
//App.js
import React from "react";
import { connect } from "react-redux";
import { increment, decrement, reset } from "./actions/actions";

const App = ({ count, onDecrement, onIncrement, onReset }) => (
  <div>
    {console.log(count)}
    <p>Count: {count}</p>
    <button onClick={onDecrement}>-</button>
    <button onClick={onReset}>Reset</button>
    <button onClick={onIncrement}>+</button>
  </div>
);

const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch(increment());
    },
    onDecrement: () => {
      dispatch(decrement());
    },
    onReset: () => {
      dispatch(reset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



//actions/types.js
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";



//actions/actions.js
import { INCREMENT, DECREMENT, RESET } from "./types";

export function increment() {
  return {
    type: INCREMENT,
  };
}

export function decrement() {
  return {
    type: DECREMENT,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}



//reducers/index.js
import { INCREMENT, DECREMENT, RESET } from "../actions/types";

const initialState = {
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        count: state.count - 1,
      };
    case RESET:
      return {
        count: (state.count = 0),
      };
    default:
      return state;
  }
};



//index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


//store.js
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer, 
  compose(applyMiddleware(thunk))
  );

export default store;
`.trim();

const dropdawn = `
//store.js
import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga";

import rootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
)

export default store;


//components/addPlayer.js
import React, { Component, useState } from 'react';


class AddPlayer extends Component {
  state = {
    playerName: this.props.playerName,
    selectPlayer: this.props.selectPlayer,
    selectTeam: this.props.selectTeam
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddPlayer(this.state);
    this.setState({
      playerName: '',
      selectPlayer: '',
      selectTeam: ''
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Select Team
          <div>
            <select className="selectFields"
              type="text"
              name="teamName"
              id="inputTodoPriority"
              value={this.state.teamName}
              onChange={this.handleChange}
            >
              <option>Select</option>
              <option>Team A</option>
              <option>Team B</option>
            </select>
          </div>

          <br />
          Enter Player Name
          <div>
            <input className="input-text"
              name="playerName"
              type="text"
              value={this.state.playerName}
              onChange={this.handleChange}
              placeholder="Enter Name"
              />
          </div>

          <br />
          <div>
          Select Player Type:
            <select className="selectFields"
              type="text"
              name="playerType"
              id="inputTodoResponsible"
              value={this.state.playerType}
              onChange={this.handleChange}
            >
              <option>Select</option>
              <option>B</option>
              <option>Blw</option>
            </select><br />
          </div>

          <div>
            <button variant="contained"  type="submit"
            >Submit</button>
          </div>
        </form>
      </div>
    )
  }
}


export default AddPlayer;



//components/lists.js
//Lists component is root module.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPlayer from './addPlayer'


class Lists extends Component {
  state = {
    playerName:this.props.playerName
  };

  handleAdd = (addPlayers) => {
    this.setState({ playerName: [...this.state.playerName, addPlayers] });
  }

  render() {
    return (
      <div>
        Add Player
         <AddPlayer onAddPlayer={this.handleAdd} />
          Team A
          {this.state.playerName.map((player, index) =>
            <div key={index}>
              {
                (player.teamName === 'Team A') ?
                  <div>{player.playerName} ({player.playerType})</div>
                : ''
              }
            </div>
          )}

        <div>
          Team B
              {this.state.playerName.map((player, index) => {
                return (
                    <div key={index}>
                      {
                          (player.teamName === 'Team B') ?
                          <div>{player.playerName} ({player.playerType})</div>
                          : ''
                      }
                    </div>
                  )
              })}
            </div>
        </div>
    );
  }
}


const mapStateToProps = (state) => ({
  playerName: state.addTeamsObj
})


export default connect(mapStateToProps, null)(Lists);



//reducers/addTeams.js
// import { v4 as uuidv4 } from 'uuid';


const initalState = [
  {
    id: 1,
    playerName: "Virat Kohali",
    playerType: "B",
    teamName: "Team A",
  },
  {
    id: 2,
    playerName: "Axar Patel",
    playerType: "Blw",
    teamName: "Team B",
  }
];;

const addTeams = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_PLAYER":
      return [...state, {
        playerName: payload.playerName,
        playerType: payload.playerType,
        teamName: "",
        playerList: [],
      }];

    default:
      return state;
  }
};`.trim();

const toggle = `
//App.js
import { toggleFun } from "./actions/toggleAction";

const App = (props) => {
  return (
    <div>
      {props.data ? "Show" : "Hide"}
      <button onClick={props.onToggle}>Toggle</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data.toggle,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: () => {
      dispatch(toggleFun());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);


//reducers/toggleReducers.js
import { TOGGLES } from "../actions/types";

const initialState = {
  toggle: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log("reducers", state.toggle);
  switch (type) {
    case TOGGLES:
      return {
        ...state,
        toggle: !state.toggle,
      };

    default:
      return state;
  }
};



//actions/types.js
export const TOGGLES = "TOGGLES";



//actions/toggleAction.js
import { TOGGLES } from "./types";

export const toggleFun = () => {
  return {
    type: TOGGLES,
    payload: null,
  };
};
`.trim();



class CountersRedux extends Component {
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
              <h3>Counter</h3>
              <div style={titles}>
                <PrismCode
                  code={counters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Dropdawn</h3>
              <div style={titles}>
                <PrismCode
                  code={dropdawn}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Toggle</b>
              <div style={titles}>
                <PrismCode
                  code={toggle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(CountersRedux));
