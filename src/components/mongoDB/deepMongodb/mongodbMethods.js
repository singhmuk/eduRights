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


const indexing = `
db.indexing.find();

{
  "_id" : ObjectId("5ef6f997c5897e0cab0063c1"),
  "title" : "Mistborn",
  "year" : 2006,
  "author" : {
  "firstname" : "Brandon",
  "lastname" : "Sanderson"
  }
 }`.trim()

const ensureIndex = `db.indexing.ensureIndex({year:1})

In ensureIndex() method you can pass multiple fields, to create index on multiple fields
db.indexing.ensureIndex({first_name:1, last_name:-1});`.trim()

const getIndexes = `db.indexing.getIndexes()`.trim()

const dropIndex = `db.indexing.dropIndex({year:1})`.trim()


class MongodbMethods extends Component {
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
      <b>Indexing</b>
      <br/>
      Indexes support the efficient resolution of queries. Without indexes, MongoDB must scan every
document of a collection to select those documents that match the query statement. This scan is
highly inefficient and require MongoDB to process a large volume of data.<br/>
 Indexes improve MongoDB query excution<br/>
 Without index whole collextion must be scanned (COLLSCAN)<br/>
 Index stores sorted field values<br/>
 If appropriate index exists, MongoDB performs only index scan (IXSCAN)<br/>
Indexes are special data structures, that store a small portion of the data set in an easy-to-traverse
form. The index stores the value of a specific field or set of fields, ordered by the value of the field as
specified in the index.
      <div style={titles}>
      <PrismCode
        code={indexing}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <b>Create Index in collection:</b>
      <br/>
      To create an index you need to use ensureIndex() method.
We can select any field to create index from collection.
      <div style={titles}>
      <PrismCode
        code={ensureIndex}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <i>The getIndexes() method method returns the description of all the indexes in the collection.</i>
      <div style={titles}>
      <PrismCode
        code={getIndexes}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <i>The dropIndex() method:</i>
      <br/>
      <br/>
      <div style={titles}>
      <PrismCode
        code={dropIndex}
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

export default (withStyles(styles)(MongodbMethods));
