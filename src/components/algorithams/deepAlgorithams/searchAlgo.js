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


const linearsea = `
function linearSearch(value, list) {
  let found = false;
  let position = -1;
  let index = 0;

  while(!found && index < list.length) {
      if(list[index] == value) {
          found = true;
          position = index;
      } else {
          index += 1;
      }
  }
  return console.log(position);
}

linearSearch(3,[3,4,5,1,2,3,4,5])`.trim()

const binarySear = `
function binarySearch(value, list) {
  let first = 0;                                                                            //left endpoint.
  let last = list.length - 1;                                                               //right endpoint.
  let position = -1;
  let found = false;
  let middle;

  while (found === false && first <= last) {
      middle = Math.floor((first + last)/2);
      if (list[middle] == value) {
          found = true;
          position = middle;
      } else if (list[middle] > value) {                                                    //if in lower half.
          last = middle - 1;
      } else {                                                                              //in in upper half.
          first = middle + 1;
      }
  }
  return console.log(position);
}

binarySearch(5,[4,5,1,2,3,4,5])`.trim()


class Search extends Component {
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
              <h3>Linear Search</h3>
              <i>Linear Search is fine when we have a small number of elements. But when we are
                searching large lists that have thousands/ millions of elements, we need to use binary search.</i>
              <div style={titles}>
                <PrismCode
                  code={linearsea}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>Binary Search</h3>
              <div style={titles}>
                <PrismCode
                  code={binarySear}
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

export default (withStyles(styles)(Search));
