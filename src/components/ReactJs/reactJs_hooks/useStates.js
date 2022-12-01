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


const multiState = `
const Score = () => {
  const [teamScores, setTeamScores] = useState({
    currentScore: 0,
    totalScore: 308,
    totalOvers: 1,
    netRunRate: 6.5,
    netRunRate2: 6.0,
  });

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [balls, setBalls] = useState(6);
  const [overs, setOvers] = useState(['0', '1', '2', '3', '4', '5', '6', 'wk', 'wd', 'nb'])

  const toggle = () => {
    setIsActive(!isActive);
  }
  
  // const handleCount = () => {
  //   if (balls >= 1) {
  //     setBalls([balls - 1, teamScores.isPlay=true])
  //   }
  // }

  useEffect(() => {
    let interval = null;
    if (isActive && seconds <= 3) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        if(balls>0){
          setBalls(balls - 1);
          setOvers([...overs, {
          id: overs.length,
          values: overs[Math.floor(Math.random() * overs.length)]+""
          }])
        }
      }, 1000);
    } 
    else if (seconds === 4) {
      setSeconds(0);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds, overs]);
  
  
  const lastScore = overs[Math.floor(Math.random() * overs.length)];

  return (
    <div>
      <div>
        <h3>Total Score: {teamScores.totalScore}</h3>
        <p>Total Overs: {teamScores.totalOvers}</p>
        <p>Current Run Rate: {teamScores.netRunRate2}</p>
        <b>Remaining Balls: {balls}</b>
      </div>

        <button
          className={''$'{ isActive ?"active": "inactive"}'} onClick={toggle}>
          {isActive ? "Pause" : "Start"}
        </button>
    </div>
  )
}
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

const UseImperativeHandles = `
import React, { forwardRef, useImperativeHandle, useState, useRef } from "react";


const Button = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);

  useImperativeHandle(ref, () => ({
    alterToggle() {
      setToggle(!toggle);
    },
  }));
  return (
    <>
      <button>Button From Child</button>
      {toggle && <span>Toggle</span>}
    </>
  );
});

function ImperativeHandle() {
  const buttonRef = useRef(null);
  return (
    <div>
      <button
        onClick={() => {
          buttonRef.current.alterToggle();
        }}
      >
        Button From Parent
      </button>
      <Button ref={buttonRef} />
    </div>
  );
}

export default ImperativeHandle;
`.trim();

const UseLayoutEffects = `
import { useLayoutEffect, useEffect, useRef } from "react";

function LayoutEffectTutorial() {
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    console.log(inputRef.current.value);
  }, []);

  useEffect(() => {
    inputRef.current.value = "HELLO";
  }, []);

  return (
    <div className="App">
      <input ref={inputRef} value="PEDRO" style={{ width: 400, height: 60 }} />
    </div>
  );
}`.trim();

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
              <h3>1. MultiState</h3>
              <div style={titles}>
                <PrismCode
                  code={multiState}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. useCallback</h3>
              <div style={titles}>
                <PrismCode
                  code={useReducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>3. UseImperativeHandle</b>
              <div style={titles}>
                <PrismCode
                  code={UseImperativeHandles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>4. UseLayoutEffect</b>
              <div style={titles}>
                <PrismCode
                  code={UseLayoutEffects}
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

export default (withStyles(styles)(UseReducers));
