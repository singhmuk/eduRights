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


const configuration = `
if (process.env.NODE_ENV === 'test') {
  module.exports = {
    JWT_SECRET: 'codeworkrauthentication',
    oauth: {
      google: { clientID: 'number', clientSecret: 'string' },
      facebook: { clientID: 'number', clientSecret: 'string' },
    },
  };
} else {
  module.exports = {
    JWT_SECRET: 'codeworkrauthentication',
    oauth: {
      google: { clientID: 'number', clientSecret: 'string' },
      facebook: { clientID: 'number', clientSecret: 'string' },
    },
  };
}`.trim();

const helpers = `
const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
}`.trim();

const models = `
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  methods: { type: [String], required: true },
  local: {
    email: { type: String, lowercase: true },
    password: { type: String }
  },
  google: {
    id: { type: String },
    email: { type: String, lowercase: true }
  },
  facebook: {
    id: { type: String },
    email: { type: String, lowercase: true }
  }
});

userSchema.pre('save', async function (next) {
  try {
    console.log('entered');
    if (!this.methods.includes('local')) {
      next();
    }
    
    const user = this;
    if (!user.isModified('local.password')) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    this.local.password = passwordHash;
    console.log('exited');
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
}

const User = mongoose.model('user', userSchema);

module.exports = User;`.trim();

const controllers = `
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    let foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    // Is there a Google account with the same email?
    foundUser = await User.findOne({
      $or: [
        { "google.email": email },
        { "facebook.email": email },
      ]
    });
    if (foundUser) {
      foundUser.methods.push('local')
      foundUser.local = {
        email: email,
        password: password
      }
      await foundUser.save()
      
      const token = signToken(foundUser);
      res.cookie('access_token', token, {
        httpOnly: true
      });
      res.status(200).json({ success: true });
    }

    // Is there a Google account with the same email?
    foundUser = await User.findOne({ "facebook.email": email });
    if (foundUser) {
      foundUser.methods.push('local')
      foundUser.local = {
        email: email,
        password: password
      }
      await foundUser.save()
     
      const token = signToken(foundUser);
      res.status(200).json({ token });
    }

    const newUser = new User({
      methods: ['local'],
      local: {
        email: email,
        password: password
      }
    });

    await newUser.save();

    
    const token = signToken(newUser);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },

  signIn: async (req, res, next) => {
    
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },

  signOut: async (req, res, next) => {
    res.clearCookie('access_token');
    res.json({ success: true });
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },

  linkGoogle: async (req, res, next) => {
    res.json({
      success: true,
      methods: req.user.methods,
      message: 'Successfully linked account with Google'
    });
  },

  unlinkGoogle: async (req, res, next) => {
    if (req.user.google) {
      req.user.google = undefined
    }

    const googleStrPos = req.user.methods.indexOf('google')
    if (googleStrPos >= 0) {
      req.user.methods.splice(googleStrPos, 1)
    }
    await req.user.save()

    res.json({
      success: true,
      methods: req.user.methods,
      message: 'Successfully unlinked account from Google'
    });
  },

  facebookOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },

  linkFacebook: async (req, res, next) => {
    res.json({
      success: true,
      methods: req.user.methods,
      message: 'Successfully linked account with Facebook'
    });
  },

  unlinkFacebook: async (req, res, next) => {
    if (req.user.facebook) {
      req.user.facebook = undefined
    }
    
    const facebookStrPos = req.user.methods.indexOf('facebook')
    if (facebookStrPos >= 0) {
      req.user.methods.splice(facebookStrPos, 1)
    }
    await req.user.save()

    res.json({
      success: true,
      methods: req.user.methods,
      message: 'Successfully unlinked account from Facebook'
    });
  },

  dashboard: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({
      secret: "resource",
      methods: req.user.methods
    });
  },

  checkAuth: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ success: true });
  }
}`.trim();

const routes = `
const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/signout')
  .get(passportJWT, UsersController.signOut);

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

router.route('/oauth/link/google')
  .post(passportJWT, passport.authorize('googleToken', { session: false }), UsersController.linkGoogle)

router.route('/oauth/unlink/google')
  .post(passportJWT, UsersController.unlinkGoogle);

router.route('/oauth/link/facebook')
  .post(passportJWT, passport.authorize('facebookToken', { session: false }), UsersController.linkFacebook)

router.route('/oauth/unlink/facebook')
  .post(passportJWT, UsersController.unlinkFacebook);

router.route('/dashboard')
  .get(passportJWT, UsersController.dashboard);

router.route('/status')
  .get(passportJWT, UsersController.checkAuth);

module.exports = router;`.trim();

const passport = `
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./configuration');
const User = require('./models/user');

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
}

passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.JWT_SECRET,
  passReqToCallback: true
}, async (req, payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    req.user = user;
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret,
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    if (req.user) {
      req.user.methods.push('google')
      req.user.google = {
        id: profile.id,
        email: profile.emails[0].value
      }
      await req.user.save()
      return done(null, req.user);
    } 
    else {
      let existingUser = await User.findOne({ "google.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      existingUser = await User.findOne({ "local.email": profile.emails[0].value })
      if (existingUser) {
        existingUser.methods.push('google')
        existingUser.google = {
          id: profile.id,
          email: profile.emails[0].value
        }
        await existingUser.save()
        return done(null, existingUser);
      }

      const newUser = new User({
        methods: ['google'],
        google: {
          id: profile.id,
          email: profile.emails[0].value
        }
      });

      await newUser.save();
      done(null, newUser);
    }
  } catch(error) {
    done(error, false, error.message);
  }
}));

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config.oauth.facebook.clientID,
  clientSecret: config.oauth.facebook.clientSecret,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    if (req.user) {
      req.user.methods.push('facebook')
      req.user.facebook = {
        id: profile.id,
        email: profile.emails[0].value
      }
      await req.user.save();
      return done(null, req.user);
    } 
    else {
      let existingUser = await User.findOne({ "facebook.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      existingUser = await User.findOne({ "local.email": profile.emails[0].value })
      if (existingUser) {
        existingUser.methods.push('facebook')
        existingUser.facebook = {
          id: profile.id,
          email: profile.emails[0].value
        }
        await existingUser.save()
        return done(null, existingUser);
      }

      const newUser = new User({
        methods: ['facebook'],
        facebook: {
          id: profile.id,
          email: profile.emails[0].value
        }
      });

      await newUser.save();
      done(null, newUser);
    }
  } catch(error) {
    done(error, false, error.message);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ "local.email": email });

    if (!user) {
      return done(null, false);
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return done(null, false);
    }

    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));`.trim();

const appServer = `
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "test") {
  mongoose.connect("mongodb://localhost/googleFacebookAuth", {
    useNewUrlParser: true
  });
} else {
  mongoose.connect("mongodb://localhost/googleFacebookAuth", {
    useNewUrlParser: true
  });
}

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/users", require("./routes/users"));

module.exports = app;
`.trim();

const actions = `
//actions/types.js
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
export const AUTH_LINK_GOOGLE = 'AUTH_LINK_GOOGLE';
export const AUTH_LINK_FACEBOOK = 'AUTH_LINK_FACEBOOK';
export const AUTH_UNLINK_GOOGLE = 'AUTH_UNLINK_GOOGLE';
export const AUTH_UNLINK_FACEBOOK = 'AUTH_UNLINK_FACEBOOK';

export const AUTH_ERROR = 'AUTH_ERROR';
export const DASHBOARD_GET_DATA = 'DASHBOARD_GET_DATA';


//actions/index.js
import axios from 'axios';
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_LINK_GOOGLE,
  AUTH_LINK_FACEBOOK,
  AUTH_UNLINK_GOOGLE,
  AUTH_UNLINK_FACEBOOK,
  AUTH_ERROR,
  DASHBOARD_GET_DATA } from './types';

export const oauthGoogle = data => {
  return async dispatch => {
    await axios.post('http://localhost:5000/users/oauth/google', {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP
    });
  };
}

export const linkGoogle = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/link/google', {
      access_token: data
    });

    dispatch({
      type: AUTH_LINK_GOOGLE,
      payload: res.data
    });
  };
}

export const unlinkGoogle = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/unlink/google');

    dispatch({
      type: AUTH_UNLINK_GOOGLE,
      payload: res.data
    });
  };
}

export const linkFacebook = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/link/facebook', {
      access_token: data
    });

    dispatch({
      type: AUTH_LINK_FACEBOOK,
      payload: res.data
    });
  };
}

export const unlinkFacebook = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/unlink/facebook');

    dispatch({
      type: AUTH_UNLINK_FACEBOOK,
      payload: res.data
    });
  };
}

export const oauthFacebook = data => {
  return async dispatch => {
    await axios.post('http://localhost:5000/users/oauth/facebook', {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP
    });
  };
}

export const signUp = data => {
  return async dispatch => {
    try {
      await axios.post('http://localhost:5000/users/signup', data);

      dispatch({
        type: AUTH_SIGN_UP
      });
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use'
      })
    }
  };
}

export const signIn = data => {
  return async dispatch => {
    try {
      await axios.post('http://localhost:5000/users/signin', data);

      dispatch({
        type: AUTH_SIGN_IN
      });
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email and password combination isn\'t valid'
      })
    }
  };
}

export const checkAuth = () => {
  return async dispatch => {
    try {
      await axios.get('http://localhost:5000/users/status');

      dispatch({
        type: AUTH_SIGN_IN
      });

      console.log('user is auth-ed')
    } catch(err) {
      console.log('error', err)
    }
  };
}

export const getDashboard = () => {
  return async dispatch => {
    try {
      const res = await axios.get('http://localhost:5000/users/dashboard')

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data
      })

    } catch(err) {
      console.error('err', err)
    }
  }
}

export const signOut = () => {
  return async dispatch => {
    await axios.get('http://localhost:5000/users/signout');

    dispatch({
      type: AUTH_SIGN_OUT
    })
  };
}
`.trim();

const reducers = `
//reducers/auth.js
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_ERROR } from '../actions/types';

const DEFAULT_STATE = {
  isAuthenticated: false,
  errorMessage: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case AUTH_SIGN_UP:
      return { ...state, isAuthenticated: true, errorMessage: '' }
    case AUTH_SIGN_IN:
      return { ...state, isAuthenticated: true, errorMessage: '' }
    case AUTH_SIGN_OUT:
      return { ...state, isAuthenticated: false, errorMessage: '' }
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}



//reducers/dashboard.js
import {
  DASHBOARD_GET_DATA,
  AUTH_LINK_GOOGLE,
  AUTH_LINK_FACEBOOK,
  AUTH_UNLINK_GOOGLE,
  AUTH_UNLINK_FACEBOOK
} from '../actions/types';

const DEFAULT_STATE = {
  secret: '',
  methods: []
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case AUTH_LINK_GOOGLE:
      return { ...state, methods: action.payload.methods }
    case AUTH_LINK_FACEBOOK:
      return { ...state, methods: action.payload.methods }
    case AUTH_UNLINK_GOOGLE:
      return { ...state, methods: action.payload.methods }
    case AUTH_UNLINK_FACEBOOK:
      return { ...state, methods: action.payload.methods }
    case DASHBOARD_GET_DATA:
      return { ...state, secret: action.payload.secret, methods: action.payload.methods }
    default:
      return state
  }
}



//reducers/index.js
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import dashboardReducer from './dashboard';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  dash: dashboardReducer
});`.trim();

const authGuard = `
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      if (!this.props.isAuth && !this.props.jwtToken) {
        this.props.history.push('/');
      }
    }

    componentDidMount() { this.checkAuth(); }
    componentDidUpdate() { this.checkAuth(); }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      jwtToken: state.auth.token
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};`.trim();

const customInput = `
import React, { Component } from 'react';

export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          name={this.props.name}
          id={this.props.id}
          placeholder={this.props.placeholder}
          className="form-control"
          type={this.props.type}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}`.trim();

const dashboard = `
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import * as actions from '../actions';

class Dashboard extends Component {
  async componentDidMount() {
    this.props.getDashboard()
  }

  linkFacebook = async (res) => {
    console.log('Link with Facebook', res)
    await this.props.linkFacebook(res.accessToken);
  }

  linkGoogle = async (res) => {
    console.log('Link with Google', res)
    await this.props.linkGoogle(res.accessToken);
  }

  unlinkGoogle = async () => {
    console.log('Unlink Google')
    await this.props.unlinkGoogle();
  }

  unlinkFacebook = async (res) => {
    console.log('Unlink Facebook')
    await this.props.unlinkFacebook();
  }

  render() {
    return (
      <div>
        This is a Dashboard component
        <br />
        Our secret: <h3>{this.props.secret}</h3>

        <h2>Link your social media accounts</h2>
        <FacebookLogin
          appId="171335970085090"
          disabled={true}
          render={renderProps => (
            <button style={{ marginRight: 15 }} className="btn btn-primary" onClick={renderProps.onClick} 
                  disabled={this.props.dashboard.methods.includes('facebook') ? true : false}>Link with Facebook
            </button>
          )}
          fields="name,email,picture"
          callback={this.linkFacebook}
          cssClass="btn btn-outline-primary"
        />
        <GoogleLogin
          clientId="499420307488-hj9l9h3amt5into76m9i0ntkaqcg9q4t.apps.googleusercontent.com"
          disabled={this.props.dashboard.methods.includes('google') ? true : false}
          render={renderProps => (
            <button className="btn btn-danger" onClick={renderProps.onClick} 
                disabled={renderProps.disabled}>Link with Google
            </button>
          )}
          onSuccess={this.linkGoogle}
          onFailure={this.linkGoogle}
        />
        <br />
       
        <h2>Unlink your social media accounts</h2>
        <button
          style={{ marginRight: 15 }}
          className="btn btn-primary"
          onClick={() => this.unlinkFacebook()}
          disabled={this.props.dashboard.methods.includes('facebook') ? false : true}
        >
          Unlink with Facebook
        </button>
        <button
          className="btn btn-danger"
          onClick={() => this.unlinkGoogle()}
          disabled={this.props.dashboard.methods.includes('google') ? false : true}
        >
          Unlink with Google
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  return {
    secret: state.dash.secret,
    dashboard: state.dash,
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(Dashboard);
`.trim();

const header = `
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() { this.props.signOut() }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        <Link className="navbar-brand" to="/">CodeWorkr API Auth</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">
            {!this.props.isAuth ?
              [<li className="nav-item" key="signup">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>,
              <li className="nav-item" key="signin">
                <Link className="nav-link" to="/signin">Sign In</Link>
              </li>] : null}

            {this.props.isAuth ?
              <li className="nav-item">
                <Link className="nav-link" to="/signout" onClick={this.signOut}>Sign Out</Link>
              </li> : null}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, actions)(Header);`.trim();

const signIn = `
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import * as actions from '../actions';
import CustomInput from './CustomInput';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  async onSubmit(formData) {
    await this.props.signIn(formData);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  async responseGoogle(res) {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  async responseFacebook(res) {
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@example.com"
                component={ CustomInput } />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder="yoursuperpassword"
                component={ CustomInput } />
            </fieldset>

            { this.props.errorMessage ?
            <div className="alert alert-danger">
              { this.props.errorMessage }
            </div> : null }

            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Or sign in using third-party services
            </div>
            <FacebookLogin
              appId="number"
              render={renderProps => (
                <button style={{ marginRight: 15 }} className="btn btn-primary" onClick={renderProps.onClick}>Fb</button>
              )}
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-outline-primary"
            />
            <GoogleLogin
              clientId="number"
              render={renderProps => (
              <button className="btn btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Go</button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-danger"
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(SignIn)
`.trim();

const signUp = `
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import * as actions from '../actions';
import CustomInput from './CustomInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  async onSubmit(formData) {
    await this.props.signUp(formData);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  async responseGoogle(res) {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  async responseFacebook(res) {
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@example.com"
                component={ CustomInput } />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder="yoursuperpassword"
                component={ CustomInput } />
            </fieldset>

            { this.props.errorMessage ?
            <div className="alert alert-danger">
              { this.props.errorMessage }
            </div> : null }

            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Or sign up using third-party services
            </div>
            <FacebookLogin
              appId="number"
              render={renderProps => (
                <button style={{ marginRight: 15 }} className="btn btn-primary" onClick={renderProps.onClick}>Fb</button>
              )}
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-outline-primary"
            />
            <GoogleLogin
              clientId="number"
              render={renderProps => (
                <button className="btn btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Go</button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-danger"
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(SignUp)
`.trim();

const ClientApp = `
//components/Home.js
import React from 'react';

export default () => {
  return <p>Welcome to our home page!</p>
};


//components/App.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
        { this.props.children }
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(App);
`.trim();

const MainIndex = `
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import reducers from './reducers';

import authGuard from './components/HOCs/authGuard';

axios.defaults.withCredentials = true;

ReactDOM.render(
  <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/dashboard" component={authGuard(Dashboard)} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'));
`.trim();



class MernSocial extends Component {
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
              <h3>Server</h3>
              <b>configuration/index.js</b>
              <div style={titles}>
                <PrismCode
                  code={configuration}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>helpers/routeHelpers.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={helpers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>models/user.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={models}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllers/users.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={controllers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/users.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={routes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>passport.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={passport}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>app.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={appServer}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Client</h3>
              <b>actions/types.js</b>
              <div style={titles}>
                <PrismCode
                  code={actions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>reducers/</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={reducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/HOC/authGuard.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={authGuard}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/CustomInput.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={customInput}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/Dashboard.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={dashboard}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/Header.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={header}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/SignIn.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={signIn}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/SignUp.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={signUp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/App.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={ClientApp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>index.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={MainIndex}
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

export default (withStyles(styles)(MernSocial));
