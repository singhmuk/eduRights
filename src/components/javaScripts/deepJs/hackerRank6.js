import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = {backgroundColor:'#F0F8FF', padding:'1px', fontSize:'16px'}

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

const processData = `
//index.html
<html>
<head>
  <script src="index.js"></script>
</head>
<body>
  <body>
    <button id="btn" type="button">0</button>
    <script src="js/button.js" type="text/javascript"></script>
</body>
</body>


//index.js
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('btn');
  
  button.addEventListener('click', (e) => {
        const count = Number(e.currentTarget.innerText) + 1;
      
        e.currentTarget.innerText = count;
   });
});
`.trim();

const calculator = `
//index.html
<div id="res"></div>
    <div id="btns">
      <button id="btn0">0</button> <button id="btn1">1</button>
      <button id="btnClr">C</button> <button id="btnEql">=</button>
      <button id="btnSum">+</button> <button id="btnSub">-</button>
      <button id="btnMul">*</button> <button id="btnDiv">/</button>
    </div> 
    
    
    
//index.js
window.onload = () => {
  let inputs = [];
  let operator = '';

  const displayRes = () => {
    const res = document.getElementById('res');

    let val1 = inputs[0];
    let val2 = inputs[1] === undefined ? '' : inputs[1];

    res.innerText = '$'{val1}'$'{operator}'$'{val2};
  };

  const setOperator = op => {
    if (inputs[1] === undefined) {
      operator = op;
    }

    displayRes();
  };

  const setValues = num => {
    if (inputs.length === 0) {
      inputs[0] = num;
    } else if (inputs.length === 1 && operator.length === 0) {
      inputs[0] += num;
    } else if (inputs.length === 1 && operator.length > 0) {
      inputs[1] = num;
    } else if (inputs.length === 2 && operator.length > 0) {
      inputs[1] += num;
    }

    displayRes();
  };

  const btn0 = document.getElementById('btn0');
  btn0.addEventListener('click', () => {
    setValues('0');
  });

  const btn1 = document.getElementById('btn1');
  btn1.addEventListener('click', () => {
    setValues('1');
  });

  const btnSum = document.getElementById('btnSum');
  btnSum.addEventListener('click', () => {
    setOperator('+');
  });

  const btnSub = document.getElementById('btnSub');
  btnSub.addEventListener('click', () => {
    setOperator('-');
  });

  const btnMul = document.getElementById('btnMul');
  btnMul.addEventListener('click', () => {
    setOperator('*');
  });

  const btnDiv = document.getElementById('btnDiv');
  btnDiv.addEventListener('click', () => {
    setOperator('/');
  });

  const btnClr = document.getElementById('btnClr');
  btnClr.addEventListener('click', () => {
    inputs = [''];
    operator = '';
    displayRes();
  });

  const btnEql = document.getElementById('btnEql');
  btnEql.addEventListener('click', () => {
    if (inputs.length === 2 && operator.length > 0) {
      let a = parseInt(inputs[0], 2);
      let b = parseInt(inputs[1], 2);

      switch (operator) {
        case '+':
          inputs = [(a + b).toString(2)];
          break;
        case '-':
          inputs = [(a - b).toString(2)];
          break;
        case '*':
          inputs = [parseInt(a * b, 0).toString(2)];
          break;
        case '/':
          inputs = [parseInt(a / b, 0).toString(2)];
          break;
      }

      operator = '';

      displayRes();
    }
  });
};
`.trim();


class HackerRank6 extends Component {
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
              <p>Create a Button and Buttons Container</p>
              <p>
              Create an html button with an id of btn
btn must have the styling of: width 96px, height 48px, font-size 24px
The default innerHTML of button is set to 0
Create the interaction where when the button is clicked its internal value displayed is 
incremented.
              </p>
              <div style={titles}>
                <PrismCode
                  code={processData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <p>Binary Calculator</p>
              Implement a simple calculator that performs the following operations on binary numbers: 
addition, subtraction, multiplication, and division. Note that division operation must be 
integer division only; for example, 1001 / 100 = 10, 1110 / 101 = 10, and 101 / 1 = 101.
              <br/>
              <div style={titles}>
                <PrismCode
                  code={calculator}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <br/>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(HackerRank6));
