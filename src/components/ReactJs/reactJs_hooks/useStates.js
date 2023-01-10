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

const states = `
//components/myContext.js
import React from 'react';

const MyContext = React.createContext();

export default MyContext;


//components/compA.js
import Comp2 from './compB';

const Comp = () => {
  return(
    <div>
      <Comp2 />
    </div>
  )
}

export default Comp;


//components/compB.js
import MyContext from './myContext';

const Comp2 = () => {
    return(
    <MyContext.Consumer>
      {(data)=>(
        <li>{data.name}</li>
      )}
    </MyContext.Consumer>
    )
  }

export default Comp2;


//App.js
import React, { useState } from 'react';
import MyContext from './components/myContext';
import CompA from './components/compA';

const App = () => {
  const [ name ] = useState('Mukesh')
  
    return(
      <div>
        <MyContext.Provider
          value={{name:name}}>
          <CompA />
        </MyContext.Provider>
      </div>
    )
  }

export default App;
`.trim();

const useReducers = `
import { useCallback, useState, useEffect } from "react";


function Child({ returnComment }) {
  useEffect(() => {
  }, [returnComment]);

  return <div>{returnComment("Pedro")}</div>;
}

export default function CallBackTutorial() {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState("Yo, pls sub to the channel!");

  const returnComment = useCallback(
    (name) => {
      return data + name;
    },
    [data]
  );

  return (
    <div className="App">
      <Child returnComment={returnComment} />

      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {" "}
        Toggle
      </button>
      {toggle && <h1> toggle </h1>}
    </div>
  );
}
`.trim();



class UseReducers extends Component {
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
            <h3>1. Context API State</h3>
              <div style={titles}>
                <PrismCode
                  code={states}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              

              <h3>2. useCallback</h3>
              The useCallback and useMemo Hooks are similar. The main difference is that useMemo returns 
              a memoized value and useCallback returns a memoized function. 
              <div style={titles}>
                <PrismCode
                  code={useReducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
           
             
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(UseReducers));
