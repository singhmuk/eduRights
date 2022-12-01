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


const firebase = `
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDxXaDxok6eY-chbAaBRh8pMShN6CFR0vs",
  authDomain: "socialideas-ad6cc.firebaseapp.com",
  projectId: "socialideas-ad6cc",
  storageBucket: "socialideas-ad6cc.appspot.com",
  messagingSenderId: "367867465684",
  appId: "1:367867465684:web:69c7fe82033fa0961c5041",
  measurementId: "G-KTRZ0R5ZD9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase;`.trim();

const authMethods = `
import firebase from './firebase';

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
`.trim();

const services = `
import firebase from "../config/firebase";

const socialMediaAuth = (provider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    })
}
`.trim();

const app = `
import React from 'react'
import { facebookProvider, githubProvider, googleProvider } from './config/authMethods';
import socialMediaAuth from './services/auth'

function App() {
  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res);
  };

  return (
    <div>
      <button onClick={() => handleOnClick(facebookProvider)}>facebook</button>
      <button onClick={() => handleOnClick(googleProvider)}>google</button>
      <button onClick={() => handleOnClick(githubProvider)}>github</button>
    </div>
  )
}`.trim();

// const serverApp = ``.trim();



class SocialSignUp extends Component {
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
              <h3>React Social SignUp with Firebase</h3>
              <b>config/firebase.js</b>
              <div style={titles}>
                <PrismCode
                  code={firebase}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>config/authMethods.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={authMethods}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>services/auth.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={services}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>App.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={app}
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

export default (withStyles(styles)(SocialSignUp));
