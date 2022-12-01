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

const components = `
//components/create.js
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import * as actions from "../actions";
import "react-quill/dist/quill.snow.css";

class Create extends Component {
  state = {
      title: "",
      writer: localStorage.getItem("myUserName"),
      content: ""
    };

  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.createPost(
      this.state.title,
      this.state.writer,
      this.state.content
    );
  };

  handleChange = value => {
    this.setState({ content: value });
  };

  render() {
    if (!localStorage.getItem("jwtToken")) {
      return (
        <div style={{ textAlign: "center" }}>
          <h3>
            Not login!<br />Login, Please!
          </h3>
        </div>
      );
    }

    return (
        <div>
            <form onSubmit={this.onSubmit}>
              <form row>
                <p>Title</p>
                  <input type="text" name="title" onChange={this.onChange} />
                <p>Content</p>
                  <ReactQuill value={this.state.content} onChange={this.handleChange} />
              </form>
              <button>Send</button>
            </form>
        </div>
    );
  }
}

const mapStateToProps = state => ({
    username: state.user.username
});

const mapDispatchToProps = dispatch => ({
    createPost: (title, writer, content) => {
      dispatch(actions.createPost(title, writer, content));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);



//components/show.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class Show extends Component {
  componentDidMount() {
    this.props.getPostDetailFetch(this.props.match.params.id);
  }

  handleDelete = () => {
    this.props.deletePost(this.props.match.params.id);
  };

  render() {
    if (!this.props.post) {
      return <div>No post!</div>;
    }

    return (
      <div>
          <h1>POST DETAIL</h1>
          <h1>{this.props.post.title}</h1>
          <h5>writer: {this.props.post.writer}</h5>
          <h5>write_date: {this.props.post.write_date}</h5>
          <p dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
        <Link to={'/edit/'$'{this.props.match.params.id}'}>
          <button color="primary">EDIT</button>
        </Link>
        <button onClick={this.handleDelete}>DELETE</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    post: state.fetch.post
});

const mapDispatchToProps = dispatch => ({
    getPostDetailFetch: postId => {
      dispatch(actions.getPostDetailFetch(postId));
    },
    deletePost: postId => {
      dispatch(actions.deletePost(postId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);



//components/main.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class Main extends Component {
  state = {
      currentpage: 1,
      totalpage: 1
    };

  componentDidMount() {
    this.loadTotalPage();
    this.props.getPostFetch(this.state.currentpage);
  }

  loadTotalPage = () => {
    axios
      .get("http://localhost:3001/api/post/pages")
      .then(res => {
        console.log(res.data);
        this.setState({ totalpage: res.data });
      })
      .catch(err => console.log(err));
  };

  onChange = page => {
    this.setState({
      currentpage: page
    });
    this.props.getPostFetch(page);
  };

  render() {
    if (!this.props.posts) {
      return <div>No post!</div>;
    }

    return (
      <div>
          <div>
            {localStorage.getItem("jwtToken") ? (
              <Link to="/create"><button>Create</button></Link>
            ) : (
              <Link to="/create"><button disabled>Create</button></Link>
            )}
          </div>
          <div>
            {this.props.posts.map((post, index) => (
              <div key={index} style={{ border: "1px solid black" }}>
                <Link to={'/post/'$'{post._id}'}>{post.title}</Link>
                <br />
                <span>post: {post.writer}</span>
                <br />
                <span>write_date: {post.write_date}</span>
              </div>
            ))}
          </div>
          <div>
            <Pagination
              onChange={this.onChange}
              current={this.state.currentpage}
              total={this.state.totalpage}
              pageSize={5}
            />
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    posts: state.fetch.posts
});

const mapDispatchToProps = dispatch => ({
    getPostFetch: current => {
      dispatch(actions.getPostFetch(current));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);



//components/edit.js
import React, { Component } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import * as actions from "../actions";

class Edit extends Component {
  state = {
      title: this.props.post.title,
      writer: this.props.post.writer,
      content: this.props.post.content
    };

  componentDidMount() {
    this.props.getPostDetailFetch(this.props.match.params.id);
  }

  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.editPost(
      this.state.title,
      this.state.writer,
      this.state.content,
      this.props.match.params.id
    );
  };

  handleChange = value => {
    this.setState({ content: value });
  };

  render() {
    if (!this.props.post) {
      return <div>No post!</div>;
    }

    if (!localStorage.getItem("jwtToken")) {
      return (
        <div style={{ textAlign: "center" }}>
          <h3>Not login!</h3>
        </div>
      );
    }

    if (this.props.post.writer !== localStorage.getItem("myUserName")) {
      return (
        <div>
          <p>You are an unauthorized user.</p>
        </div>
      );
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <p>Title</p>
              <input type="text" name="title" defaultValue={this.props.post.title} onChange={this.onChange} />
            <p>Writer</p>
              <input type="text" name="writer" defaultValue={this.props.post.writer} onChange={this.onChange} />
            <p>Content</p>
              <ReactQuill value={this.state.content} onChange={this.handleChange} />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    post: state.fetch.post,
    username: state.user.username
});

const mapDispatchToProps = dispatch => ({
    getPostDetailFetch: postId => {
      dispatch(actions.getPostDetailFetch(postId));
    },
    editPost: (title, writer, content, postId) => {
      dispatch(actions.editPost(title, writer, content, postId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);



//components/signUp.js
import React, { Component } from "react";
import axios from "axios";
import history from "../history";

class Register extends Component {
  state = {
      username: "",
      password: "",
      name: "",
      email: "",
      alert: ""
    };

  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onLogin = event => {
    event.preventDefault();

    const { username, password, name, email } = this.state;

    axios.post("http://localhost:3001/api/auth/register", {
        username,
        password,
        name,
        email
      })
      .then(res => {
        this.setState({ alert: "" });
        history.push("/login");
      })
      .catch(err => {
        if (err.response.status === 600) {
          this.setState({ alert: "Username already exists" });
        } else if (err.response.status === 601) {
          this.setState({ alert: "Please input all fields" });
        }
      });
  };

  render() {
    return (
      <div>
            <h1>LOGIN</h1>
            <form onSubmit={this.onLogin}>
                <p>Username</p>
                  <input type="text" name="username" onChange={this.onChange} />
                <p>Password</p>
                  <input type="password" name="password" onChange={this.onChange} />
                <p>Name</p>
                  <input type="test" name="name" onChange={this.onChange} />
                <p>E-mail</p>
                  <input type="email" name="email" onChange={this.onChange} />
              <div>
                {this.state.alert}
                <br />
              </div>
              <button>Register</button>
            </form>
      </div>
    );
  }
}

export default Register;



//components/login.js
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Login extends Component {
  state = {
      username: "",
      password: "",
      alert: ""
    };

  onChange = event => {
    const state = this.state;

    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onLogin = event => {
    event.preventDefault();

    const { username, password } = this.state;

    this.props.login(username, password);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onLogin}>
            <p>Username</p>
              <input type="text" name="username" onChange={this.onChange} />
            <p>Password</p>
              <input type="password" name="password" onChange={this.onChange} />
          <div>
            {this.props.alert}
            <br />
          </div>
          <button>Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    alert: state.user.alert
});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => {
      dispatch(actions.login(username, password));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
`.trim();

const reducers = `
//actions/index.js
import axios from "axios";
import history from "../history";

const API_URL = "http://localhost:3001/api";

export const PRESERVE_TOKEN = "PRESERVE_TOKEN";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const GET_POST_FETCH = "GET_POST_FETCH";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const EDIT_POST = "EDIT_POST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const GET_POST_DETAIL_FETCH = "GET_POST_DETAIL_FETCH";
export const GET_POST_DETAIL_SUCCESS = "GET_POST_DETAIL_SUCCESS";

export function preserveToken(token) {
  return {
    type: "PRESERVE_TOKEN",
    token
  };
}

export function login(username, password) {
  return function(dispatch) {
    axios
      .post('$'{API_URL}/auth/login, { username, password })
      .then(res => {
        dispatch(loginSuccess(res.data, username));
        dispatch(preserveToken(res.data.token));
        history.push("/");
      })
      .catch(err => {
        if (err.response.status === 401) {
          dispatch(loginFailure(err));
        }
      });
  };
}

export function loginSuccess(data, username) {
  return {
    type: "LOGIN_SUCCESS",
    data,
    username
  };
}

export function loginFailure(data) {
  return {
    type: "LOGIN_FAILURE",
    data
  };
}

export function getPostFetch(current) {
  return function(dispatch) {
    axios
      .get('$'{API_URL}/post/pages/' + current)
      .then(res => {
        dispatch(getPostSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getPostSuccess(posts) {
  return {
    type: "GET_POST_SUCCESS",
    posts
  };
}

export function createPost(title, writer, content) {
  return function(dispatch) {
    axios
      .post('$'{API_URL}/post', { title, writer, content })
      .then(res => {
        dispatch(createPostSuccess(res.data));
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function createPostSuccess(post) {
  return {
    type: "CREATE_POST_SUCCESS",
    post
  };
}

export function editPost(title, writer, content, postId) {
  return function(dispatch) {
    axios
      .put('$'{API_URL}/post/ + postId, { title, writer, content })
      .then(res => {
        dispatch(editPostSuccess(res.data));
        history.push("/post/" + postId);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function editPostSuccess(post) {
  return {
    type: "EDIT_POST_SUCCESS",
    post
  };
}

export function deletePost(postId) {
  return function(dispatch) {
    axios
      .delete('$'{API_URL}/post/ + postId)
      .then(res => {
        dispatch(deletePostSuccess(res.data));
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function deletePostSuccess(post) {
  return {
    type: "DELETE_POST_SUCCESS",
    post
  };
}

export function getPostDetailFetch(postId) {
  return function(dispatch) {
    axios
      .get('$'{API_URL}/post/' + postId)
      .then(res => {
        dispatch(getPostDetailSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getPostDetailSuccess(post) {
  return {
    type: "GET_POST_DETAIL_SUCCESS",
    post
  };
}


//reducers/fetch.js
import {
  CREATE_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  GET_POST_SUCCESS,
  GET_POST_DETAIL_SUCCESS
} from "../actions/index.jsx";

const initialState = { posts: [], post: [] };

export default function fetch(state = initialState, action) {
  switch (action.type) {
    case GET_POST_SUCCESS:
      return { posts: action.posts };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        ...action.post
      };
      
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        ...action.post
      };
 
    case DELETE_POST_SUCCESS:
      return state;

    case GET_POST_DETAIL_SUCCESS:
      return { post: action.post };
    default:
      return state;
  }
}


//reducers/user.js
import {
  PRESERVE_TOKEN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/index.jsx";
import axios from "axios";

const initialState = {
  username: "",
  alert: ""
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case PRESERVE_TOKEN:
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      );
      return state;
    case LOGIN_SUCCESS:
      localStorage.setItem("jwtToken", action.data.token);
      localStorage.setItem("myUserName", action.username);
      return {
        username: action.username
      };
    case LOGIN_FAILURE:
      return {
        username: "",
        alert: "Login failed."
      };
    default:
      return state;
  }
}



//reducers/index.js
import { combineReducers } from "redux";
import fetch from "./fetch";
import user from "./user";

const index = combineReducers({
  fetch,
  user
});

export default index;


//history.js
import createHistory from "history/createBrowserHistory";

export default createHistory();


//App.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";
import * as actions from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.preserveToken();
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("myUserName");
    history.push("/");
  };

  render() {
    return (
      <div>
        <div className="header">
          {localStorage.getItem("jwtToken") ? (
            <button onClick={this.logout}>Logout</button>
          ) : (
            <div>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/register"><button>Register</button></Link>
            </div>
          )}
        </div>
        {this.props.children}
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  preserveToken: () => {
    dispatch(actions.preserveToken());
  }
});

export default connect(null,  mapDispatchToProps)(App);



//index.js
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import Main from "./components/main";
import Edit from "./components/edit";
import Create from "./components/create";
import Show from "./components/show";
import Login from "./components/login";
import Register from "./components/signUp";
import stores from "./reducers";
import history from "./history";
import "bootstrap/dist/css/bootstrap.min.css";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(
  stores,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={App} />
        <Route exact path="/" component={Main} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/create" component={Create} />
        <Route path="/post/:id" component={Show} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
`.trim();

const servers = `
//config/config.js
module.exports = {
  secret: "reactauth"
};


//config/passport.js
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../models/Users.js");
var config = require("./config.js");

module.exports = function(passport) {
  // jwt options
  var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret
  };

  passport.use(
    new JwtStrategy(options, function(payload, done) {
      User.findOne({ _id: payload._id }, function(err, user) {
        if (err) {
          console.log("error: " + err);
          return done(err, false);
        }
        if (user) {
          console.log("user: " + user);
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};



//models/Post.js
var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  title: String,
  writer: String,
  content: String,
  write_date: {
    type: Date,
    default: () => new Date().getTime() + 1000 * 60 * 60 * 9
  }
});

module.exports = mongoose.model("Post", PostSchema);



//models/Users.js
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function(next) {
  var user = this;

  if (!this.isModified("password")) {
    return next();
  }

  return bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      return next();
    });
  });
});

// 비밀번호 비교
UserSchema.methods.comparePassword = function(pwd, cb) {
  bcrypt.compare(pwd, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);



//routes/auth.js
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var passport = require("passport");
require("../config/passport")(passport);

var config = require("../config/config.js");
var User = require("../models/Users.js");


router.post("/register", (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.name
  ) {
    return res
      .status(601)
      .send({ success: false, msg: "Please pass username and password." });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name
    });
    // save the user
    newUser.save((err) => {
      if (err) {
        return res
          .status(600)
          .send({ success: false, msg: "Username already exists." });
      }
      return res.json({ success: true, msg: "Successful created new user." });
    });
  }
});

router.post("/login", (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "User not found."
        });
      } 
      else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            var token = jwt.sign(user.toJSON(), config.secret);
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Wrong password."
            });
          }
        });
      }
    }
  );
});

module.exports = router;



//routes/post.js
var express = require("express");
var router = express.Router();
var Post = require("../models/Post.js");
var passport = require("passport");
require("../config/passport.js")(passport);


function getToken(headers) {
  var splited = headers.authorization.split(" ");
  if (splited.length == 2) {
    return splited[1];
  } else {
    return null;
  }
}

router.get("/", (req, res, next) => {
  Post.find()
    .sort({ write_date: -1 })
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

router.get("/pages/:id", (req, res, next) => {
  Post.find()
    .sort({ write_date: -1 })
    .skip((req.params.id - 1) * 5)
    .limit(5)
    .exec((err, list) => {
      if (err) return next(err);
      res.json(list);
    });
});

router.get("/pages", (req, res, next) => {
  Post.find()
    .countDocuments()
    .exec((err, list) => {
      if (err) return next(err);
      res.json(list);
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post("/", passport.authenticate("jwt", { session: false }), (
  req,
  res,
  next
) => {
  var token = getToken(req.headers);
  if (token) {
    Post.create(req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

router.put("/:id", (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;


//server.js
var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var passport = require("passport");
require("./config/passport.js")(passport);

var post = require("./routes/post");
var auth = require("./routes/auth");
var app = express();

var mongoose = require("mongoose");

var cors = require("cors");

var PORT = 3001;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "../build")));

// CORS
app.use(cors());

mongoose
  .connect(
    "mongodb://localhost:27017/mern-crud",
    { useNewUrlParser: true, promiseLibrary: require("bluebird") }
  )
  .then(() => console.log("Successfully Connect!"))
  .catch(err => console.error(err));

app.use("/api/post", post);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  return res.end("Successfully Working API Server!");
});

app.use(function(req, res, next) {
  var err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT);

module.exports = app;
`.trim();


class SignUp extends Component {
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
              <h3>Mern curd Class & SignUp</h3>
              <b>Components</b>
              <div style={titles}>
                <PrismCode
                  code={components}
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
              <b>Server</b>
              <div style={titles}>
                <PrismCode
                  code={servers}
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

export default (withStyles(styles)(SignUp));
