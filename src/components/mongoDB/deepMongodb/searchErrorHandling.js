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


const SearchSchema = `
const SearchSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = Item = mongoose.model('item', SearchSchema);`.trim();

const routesSearch = `
const Item = require('../models/search');

router.get('/search', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.get("/search/:name", (req, res) => {
  var regex = new RegExp(req.params.name, 'i');
  Item.find({ name: regex }).then((result) => {
    res.status(200).json(result)
  })
})`.trim();

const inventory = `
const cursor = db.collection('inventory').find({});
SELECT * FROM inventory

const cursor = db.collection('inventory').find({ status: 'D' });
SELECT * FROM inventory WHERE status = "D"

where status equals either "A" or "D":
const cursor = db.collection('inventory').find({
  status: { $in: ['A', 'D'] }
});

SELECT * FROM inventory WHERE status in ("A", "D")
`.trim();

const specify = `
const cursor = db.collection('inventory').find({
  $or: [{ status: 'A' }, { qty: { $lt: 30 } }]
});

SELECT * FROM inventory WHERE status = "A" OR qty < 30


//And
const cursor = db.collection('inventory').find({
  status: 'A',
  qty: { $lt: 30 }
});

SELECT * FROM inventory WHERE status = "A" AND qty < 30


//Specify AND as well as OR Conditions
const cursor = db.collection('inventory').find({
  status: 'D',
  $or: [{ qty: { $lt: 30 } }, { title: 'Niketh' }]
});
  
SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")
`.trim();

const embedded = `
const cursor = db.collection('inventory').find({
  size: { h: 14, w: 21, uom: 'cm' }
});


const cursor = db.collection('inventory').find({
  'size.h': { $lt: 15 }
});
`.trim();

const indexing = `
db.products.createIndex(
  { item: 1, quantity: -1 } ,
  { name: "query for inventory" }
)
`.trim();


class SearchErrorHandling extends Component {
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
              <h3>Search error Handling</h3>
              <b>model/search.js</b>
              <div style={titles}>
                <PrismCode
                  code={SearchSchema}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/search.js</b>
              <div style={titles}>
                <PrismCode
                  code={routesSearch}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Relate mySql with mongoDB</b>
              <div style={titles}>
                <PrismCode
                  code={inventory}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Specify OR Conditions</b><br/>
              Using the $or operator, you can specify a compound query that joins each clause with a logical OR conjunction so 
              that the query selects the documents in the collection that match at least one condition.
              <div style={titles}>
                <PrismCode
                  code={specify}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Match an Embedded/Nested Document</b>
              <div style={titles}>
                <PrismCode
                  code={embedded}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>indexing</b>
              <div style={titles}>
                <PrismCode
                  code={indexing}
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

export default (withStyles(styles)(SearchErrorHandling));
