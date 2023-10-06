import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Stcksval from '../../../assets/stcks.png';

const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 200,
  width: 500
}

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


const largestPerimeter = `
function fun() {
  const arr = [2,1,2,5,6,7,8,9,3]
  let result=0;

  arr.sort((a,b)=>a-b)
  for (let i=0; i<arr.length-2; i++) {
      result = arr[i] + arr[i+1] + arr[i+2];
  }
  return console.log(result)
}

fun()
`.trim();

const generate = `
function star(){
  const numRows=5;
  let result=[]
  for (let i = 0; i < numRows; i++) {
    const currentRow = [];
    let num = 1;                              // The first element in each row is always 1

    for (let j = 0; j <= i; j++) {
      currentRow.push(num);
      num = num * (i - j) / (j + 1);          // Calculate the next number based on the previous number
    }

    result.push(currentRow);
  }

  console.log(result);
}
star();
`.trim();

const computeArea = `
function fun() {
  const arr = [-3, 0, 3, 4, 0, -1, 9, 2];
  let maxArea = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const length = Math.abs(arr[i]);
      const width = Math.abs(arr[j]);
      const area = length * width;
      
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return console.log(maxArea);
}

fun()
`.trim();


class DSLogic8 extends Component {
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
            <h3>3. Largest Perimeter Triangle.</h3>
            We need to find a set of three side lengths that satisfy the triangle inequality theorem and have the largest possible perimeter.
            <br/>
            7,8,9
              <div style={titles}>
                <PrismCode
                  code={largestPerimeter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>4. Pascal's Triangle</h3>
              Pascal's Triangle is a pattern of numbers that starts with a "1" at the top. Each row begins and ends with a "1", 
              and the numbers inside each row are obtained by adding the two numbers directly above them. Here's how it works:
              <br/>
              <br/>
              1<br/>
              1 1<br/>
              1 2 1<br/>
              1 3 3 1<br/>
              1 4 6 4 1
              <div style={titles}>
                <PrismCode
                  code={generate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Rectangle Area.</h3>
              Area = length × width.
              <br/>
              Each rectangle is defined by its bottom left corner and top right corner.
              <div style={titles}>
                <PrismCode
                  code={computeArea}
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

export default (withStyles(styles)(DSLogic8));
