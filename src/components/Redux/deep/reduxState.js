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

const useSelector = `
import { useSelector, useDispatch } from "react-redux";
import { INCREMENT, DECREMENT } from "./actions/types"

const App = () => {
  const counter = useSelector(state => state.count.counter);  //State
  const dispatch = useDispatch();                             //Method
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => dispatch({ type: INCREMENT })}>Incr</button>
      <button onClick={() => dispatch({ type: DECREMENT })}>Decr</button>
    </div>
  );
};
`.trim();

const reducers = `
//reducers/reducers.js
import { INCREMENT, DECREMENT } from "../actions/types"

const initialState = {
  counter: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { counter: ++state.counter };
    case DECREMENT:
      return { counter: --state.counter };
    default:
      return state;
  }
}

export default rootReducer;


//actions/types.js
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
`.trim();

const curds = `
//components/index.js
import * as actions from "../actions";
import { connect } from "react-redux";

class Input extends Component {
  state = {
      title: "",
      content: ""
    };

  handleChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addPost(this.state.title, this.state.content);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" onChange={this.handleChange} value={this.state.title}
            required />
          
          <input type="text" name="content" onChange={this.handleChange} value={this.state.content}
            required
          />
          <button>Add</button>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  addPost: (title, content) => {
    dispatch(actions.addPost(title, content));
  }
})

export default connect(null, mapDispatchToProps)(Input);


//components/Item
import { connect } from "react-redux";
import * as actions from "../actions";

class Item extends Component {
  state = {
      isEdit: false,
      title: this.props.title,
      content: this.props.content
    };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  handleChangeContent = e => {
    this.setState({ content: e.target.value });
  };

  removePost = () => {
    this.props.removePost(this.props.id);
  };

  updatePost = () => {
    this.setState({ isEdit: true });
  };

  donePost = () => {
    this.props.updatePost(this.props.id, this.state.title, this.state.content);
    this.setState({ isEdit: false });
  };

  renderTitleInput = () => {
    return (
      <input type="text" onChange={this.handleChangeTitle} defaultValue={this.props.title} />
    );
  };

  renderContentInput = () => {
    return (
      <input type="text" onChange={this.handleChangeContent} defaultValue={this.props.content} />
    );
  };

  renderUpdateButton = () => {
    return (
      <button onClick={this.updatePost}>EDIT</button>
    );
  };

  renderDoneButton = () => {
    return (
      <button onClick={this.donePost}>DONE</button>
    );
  };

  render() {
    return (
      <div>
        {this.state.isEdit ? this.renderTitleInput() : this.props.title + ': '}
        {this.state.isEdit ? this.renderContentInput() : this.props.content}
        <br />
        {this.state.isEdit
          ? this.renderDoneButton()
          : this.renderUpdateButton()}
        <button onClick={this.removePost}>REMOVE</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removePost: id => {
    dispatch(actions.removePost(id));
  },
  updatePost: (id, title, content) => {
    dispatch(actions.updatePost(id, title, content));
  }
})

export default connect(null, mapDispatchToProps)(Item);


//components/List.js
import Item from "./item.jsx";

class List extends Component {
  render() {
    return (
        <div>
          {this.props.posts.map((post, index) => (
            <Item {...post} key={index} id={post.id} />
          ))}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post
})

export default connect(mapStateToProps, null)(List);



//reducers/post.js
import { ADD_POST, REMOVE_POST, UPDATE_POST } from "../actions/index.js";

const initialState = [];

export default function Post(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          content: action.content
        }
      ];
      
    case REMOVE_POST:
      return state.filter(({ id }) => id !== action.id);
      
    case UPDATE_POST:
      return state.map(
        post => (post.id === action.id ? { ...post, ...action } : post)
      );
      
    default:
      return state;
  }
}


//actions/types.js
export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const UPDATE_POST = "UPDATE_POST";


//actions/index.js
import { ADD_POST, REMOVE_POST, UPDATE_POST } from './types'

let nextId = 0;
export function addPost(title, content) {
  return {
    type: ADD_POST,
    id: nextId++,
    title,
    content
  };
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    id
  };
}

export function updatePost(id, title, content) {
  return {
    type: UPDATE_POST,
    id,
    title,
    content
  };
}`.trim();


class ReduxState extends Component {
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
              <h3>1. useSelector and useDispatch</h3>
              <div style={titles}>
                <PrismCode
                  code={useSelector}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>reducers</b>
              <br />

              <div style={titles}>
                <PrismCode
                  code={reducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2.Curd</h3>
              <div style={titles}>
                <PrismCode
                  code={curds}
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

export default (withStyles(styles)(ReduxState));