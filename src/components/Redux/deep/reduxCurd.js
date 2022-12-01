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

const reducers = `
//reducers/data.js
const initialState = [
  { id: 1, title: "mukesh", last:'kumar' },
  { id: 2, title: "niketh", last:'kumar' },
  { id: 3, title: "subham", last:'kumar' },
  { id: 4, title: "sanya", last:'kumari' },
]


export default function(state = initialState, action){
  const {type, payload} = action;
  console.log('actions',action)
  
  switch (action.type) {
    case "ADD_POST":
      return state.concat([action.data]);
      
    case "DELETE_POST":
      return state.filter(post => post.id !== action.id);
      
    case "EDIT_POST":
      return state.map(post =>
        post.id === action.id ? { ...post, editing: !post.editing } : post
      );
      
    case "UPDATE":
      return state.map(post => {
        if (post.id === action.id) {
          return {
            ...post,
            title: action.data.newTitle,
            message: action.data.newMessage,
            editing: !post.editing
          };
        } else return post;
      });
    default:
      return state;
  }
}`.trim();

const comps = `
//components/post.js
import React, { Component } from "react";
import { connect } from "react-redux";

class Post extends Component {
  handleEdit = () => {
    this.props.dispatch({
      type: "EDIT_POST",
      id: this.props.post.id
    })
  }
  
  handleDelete = () => {
    this.props.dispatch({
      type: "DELETE_POST",
      id: this.props.post.id
    })
  }
  
  render() {
    return (
      <div>
        <h2>{this.props.post.title}</h2>
        <p>{this.props.post.message}</p>
        <button onClick={this.handleEdit}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

export default connect()(Post);


//components/editComponent.js
import React, { Component } from "react";
import { connect } from "react-redux";

class EditComponent extends Component {
  handleEdit = e => {
    e.preventDefault();
    const newTitle = this.getTitle.value;
    const newMessage = this.getMessage.value;
    const data = {
      newTitle,
      newMessage
    };
    this.props.dispatch({ type: "UPDATE", id: this.props.post.id, data: data });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleEdit}>
          <input type="text" ref={input => (this.getTitle = input)} defaultValue={this.props.post.title} />
          <br />
          <textarea rows="5" ref={input => (this.getMessage = input)} defaultValue={this.props.post.message} cols="28" />
          <br />
          <button>Update</button>
        </form>
      </div>
    );
  }
}

export default connect()(EditComponent);



//components/App.js
import React, { Component } from "react";
import { connect } from "react-redux";
import EditComponent from "./editComponent";
import Post from "./post";

class App extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const title = this.getTitle.value;
    const message = this.getMessage.value;
    const data = {
      id: new Date(),
      title,
      message,
      editing: false
    };

    this.props.dispatch({
      type: "ADD_POST",
      data
    });
    this.getTitle.value = "";
    this.getMessage.value = "";
  };
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={input => (this.getTitle = input)} />
          <br />
          <textarea ref={input => (this.getMessage = input)} rows="5" cols="28" />
          <button>Post</button>
        </form>
      
        {this.props.posts.map(post => (
          <div key={post.id}>
            {post.editing ? (
              <EditComponent post={post} key={post.id} />
            ) : (
              <Post key={post.id} post={post} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    posts: state.obj
});

export default connect(mapStateToProps)(App);
`.trim();


class ReduxCurd extends Component {
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
              <h3>Reducers</h3>
              <div style={titles}>
                <PrismCode
                  code={reducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Components</h3>
              <div style={titles}>
                <PrismCode
                  code={comps}
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

export default (withStyles(styles)(ReduxCurd));
