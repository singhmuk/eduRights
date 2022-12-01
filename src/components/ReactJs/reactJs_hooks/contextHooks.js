import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../prismCode';


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

const ComponentC = `
import React from 'react'
import ComponentE from './ComponentE'

function ComponentC() {
    return <ComponentE />
}

export default ComponentC;
`.trim()

const Main = `
import React from 'react'
import ComponentC from './ComponentC'

export const UserContext = React.createContext()
export const ChannelContext = React.createContext()

function Main() {
  return (
    <div className="App">
      <UserContext.Provider value={'Vishwas'}>
        <ChannelContext.Provider value={'Codevolution'}>
            <ComponentC />
        </ChannelContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default Main;
`.trim()

const ComponentF = `
import React from 'react'
import { UserContext, ChannelContext } from './main'

function ComponentF() {
  return (
    <div>
      <UserContext.Consumer>
        {user => {
          return (
            <ChannelContext.Consumer>
              {channel => {
                return <div>User context value {user}, channel context value {channel}</div>
              }}
            </ChannelContext.Consumer>
          )
        }}
      </UserContext.Consumer>
    </div>
  )
}

export default ComponentF
`.trim()

const ComponentE = `
import React, { useContext } from 'react'
import ComponentF from './ComponentF'
import { UserContext, ChannelContext } from './main'

function ComponentE() {

  const user = useContext(UserContext)
  const channel = useContext(ChannelContext)
  return <div> User is {user} and channel is {channel}</div>
}

export default ComponentE;
`.trim()


class ContextHooks extends Component {
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
              <b>Context Hooks</b>
              <br />
              <br />
                     ComponentC.js
                     <div style={titles}>
                <PrismCode
                  code={ComponentC}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
                     Main.js
                     <div style={titles}>
                <PrismCode
                  code={Main}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
                     ComponentF.js
                     <div style={titles}>
                <PrismCode
                  code={ComponentF}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
                     ComponentE.js
                     <div style={titles}>
                <PrismCode
                  code={ComponentE}
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

export default (withStyles(styles)(ContextHooks));
