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

const actions = `
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getLists, filterContact, clearFilter } from "./actions/actions";

const App = ({ lists: { listVal, loading, filter }, getLists, filterContact, clearFilter }) => {
  const text = useRef("");
  useEffect(() => {
    getLists();
  }, [getLists]);

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <>
      <input ref={text} type="text" onChange={onChange} />
      <div>
        {loading ? (
          "oops"
        ) : filter ? (
          <div>
            {filter.map((items) => (
              <ul>
                <li>{items.name}</li>
                <li>{items.email}</li>
                <li>{items.phone}</li>
              </ul>
            ))}
          </div>
        ) : (
          <div>
            {listVal.map((list) => (
              <div>{list.name}</div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps, { getLists, filterContact, clearFilter })(App);`.trim();

const reducers = `
import {
  GET_LISTS,
  LISTS_ERROR,
  FILTER_LISTS,
  CLEAR_FILTER,
} from "../actions/types";

const initialState = {
  listVal: [],
  current: null,
  filter: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LISTS:
      return {
        ...state,
        listVal: payload,
        loading: false,
      };

    case LISTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case FILTER_LISTS:
      return {
        ...state,
        filter: state.listVal.filter((contact) => {
          const regex = new RegExp(''$'{payload}', "gi");

          return (
            contact.name.match(regex) ||
            contact.email.match(regex) ||
            contact.phone.match(regex)
          );
        }),
        loading: false,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filter: null,
        loading: false,
      };

    default:
      return state;
  }
}`.trim();

const components = `
import axios from "axios";
import {
  LISTS_ERROR,
  GET_LISTS,
  FILTER_LISTS,
  CLEAR_FILTER,
} from "./types";

export const getLists = () => async (dispatch) => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    dispatch({ type: GET_LISTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const filterContact = (text) => (dispatch) => {
  dispatch({ type: FILTER_LISTS, payload: text });
};

export const clearFilter = () => (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};
`.trim();


class ReactRedux extends Component {
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
              <h3>Filter</h3>
              <b>Components</b>
              <div style={titles}>
                <PrismCode
                  code={actions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Reducers</b>
              <div style={titles}>
                <PrismCode
                  code={reducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Actions</b>
              <div style={titles}>
                <PrismCode
                  code={components}
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

export default (withStyles(styles)(ReactRedux));