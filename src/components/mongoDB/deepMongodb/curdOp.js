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

const code = `
// Add operation
db.users.insertOne({
    name: "sue",
    age: 26,
    status: "pending"
  })
  
  
  // Read operation
  Read operations retrieve documents from a collection.
  db.collection.find()
  
  db.users.find(
    {age : { $gt: 18 }},
    {name: 1, address:1}
  ).limit(5)
  
  
  // Update Operations
  Update operations modify existing documents in a collection.
  db.collection.updateOne() 
  db.collection.updateMany() 
  db.collection.replaceOne() 
  
  db.users.updateMany(
    {age : { $lt: 18 }},
    {$set:  {status: "reject"}}
  )
  
  //Delete Operations
  Delete operations remove documents from a collection. 
  db.collection.deleteOne() 
  db.collection.deleteMany()
  
  db.users.deleteMany(
      {status: "reject"}
  )`.trim();
  
  
  const insert = `
  db.inventory.insertMany([
    { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
    { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
    { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
 ])`.trim();
 
 
 const finding = `
 // Find all students
db.students.find( {} )

// Find the first 3 students
db.stuents.find( {} ).limit(3)

// Find all students and sort by name in ascending order
db.students.find( {} ).sort( {name: 1} )

// Find all students and sort by name in ascending order
db.students.find( {} ).sort( {gpa: -1, name: 1} )

// Find all biology majors
db.students.find( {major: "Biology"} )

// Find all student's with a phone number 333-3333
db.students.find( {contact: {phone: "333-3333", email: "student@school.edu"} } )

// Find all biology majors named Jack
db.students.find( {name: "Jack", major: "Biology"} )

// Final all students who are chemistry majors or named Jack
db.students.find( { $or: [ {name: "Jack"}, {major: "Chemistry"} ] } )

// Final all students with a gpa above 3.5
db.students.find( {gpa: {$gt: 3.5} } )

// Find all students with a gpa less than or equal to 3.2
db.students.find( {gpa: {$lte: 3.2} } ).sort({gpa: -1})         // $eq, $ne, $lt, $lte, $gt, $gte

// Find all students with names in the array
db.students.find( {name: {$in: ["Kate", "Claire"]} } )   // $in, $nin

// Find all students who have awards
db.students.find( {awards: {$exists: true} } )           // false

// Find all db entries where the name is a string
db.students.find({name: {$type: 2} })

// Find all students who's first grade is a 90
db.students.find( {"grades.0": 90 } )

// Find all students who have a grade greater than 80
db.students.find( {grades: {$elemMatch: { $gte: 80} } } )

// Find all students who have 4 grades recorded
db.students.find( {grades: {$size: 4 } } )`.trim();


const updating = `
// same filters as inserting
db.stuents.updateOne(<filter>, <update>, <options>)

// Do this twice so we can change it back with updateMany
db.students.updateOne(
     {major: "Biology"},
     {  $set: {major: "Bio"}}
  )

db.students.updateMany(
     {major: "Bio"},
     { $set: {major: "Biology"} }
  )

// replaceMany()
db.students.replaceOne(
     {major: "Bio"},
     {name: "new name", major: "new major", gpa: 4.0}
  )

// Delete all documents
db.students.deleteMany({})

db.students.deleteOne({major: "Biology"})

db.students.deleteMany({gpa: {$gte: 3.5}})`.trim();


class CurdOp extends Component {
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
                 <b>Curd Operations</b>
                 <br/>
                 <br/>
                 Create or insert operations add new documents to a collection. If the collection does not currently exist, insert operations will create the collection.<br/>
                 MongoDB provides the following methods to insert documents into a collection:<br/><br/>
                 <i><li>db.collection.insertOne() </li>
                     <li>db.collection.insertMany()</li></i>
                     <br/>
                     In MongoDB, insert operations target a single collection. All write operations in MongoDB are atomic on the level of a single document
                   <div style={titles}>
                      <PrismCode
                        code={code}
                        language="js"
                        plugins={["line-numbers"]}
                      />
                    </div>
                    <br/>
                    <h3>Insert Multiple Documents</h3>
                    db.collection.insertMany()
                    <div style={titles}>
                      <PrismCode
                        code={insert}
                        language="js"
                        plugins={["line-numbers"]}
                      />
                    </div>
                    <br/>
                    <h3>Finding Documents</h3>
                    <div style={titles}>
                      <PrismCode
                        code={finding}
                        language="js"
                        plugins={["line-numbers"]}
                      />
                    </div>
                    <br/>
                    <h3>Updating & Deleting Documents</h3>
                    <div style={titles}>
                      <PrismCode
                        code={updating}
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

export default (withStyles(styles)(CurdOp));
