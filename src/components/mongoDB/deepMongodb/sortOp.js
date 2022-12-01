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

const sortModel = `
var Order = function (obj) {
  this.ID = obj.ID;
  this.FirstName = obj.FirstName;
  this.Address = obj.Address;
  this.City = obj.City;
  this.OrderDate = obj.OrderDate;
  this.Age = obj.Age;
};


Order.findAll = (result) => {
  dbConn.query("select * from searchItems ORDER BY ID DESC, FirstName ASC", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};`.trim();

const sortControllers = `
const Union = require('../models/union');

router.findAll = (req, res) => {
  Union.findAll((err, results) =>{
      if (err)
          res.send(err);
      res.send(results);
  });
};`.trim();

const sortRouter = `
const unionController = require('../controllers/union');

router.get('/', unionController.findAll);`.trim();


class SortOp extends Component {
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
                  <h3>Sort</h3>
                  <b>models/sort.js</b>
                   <div style={titles}>
                      <PrismCode
                        code={sortModel}
                        language="js"
                        plugins={["line-numbers"]}
                      />
                    </div>
                    <br/>
                    <br/>

                    <b>controllers/sort.js</b>
                    <div style={titles}>
                      <PrismCode
                        code={sortControllers}
                        language="js"
                        plugins={["line-numbers"]}
                      />
                    </div>
                    <br/>
                    <br/>

                    <b>routers/sort.js</b>
                    <div style={titles}>
                      <PrismCode
                        code={sortRouter}
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

export default (withStyles(styles)(SortOp));
