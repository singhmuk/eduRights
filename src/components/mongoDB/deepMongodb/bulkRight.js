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

db.students.bulkWrite(
  [
     { insertOne :{
           "document" :{ name: "Andrew", major: "Architecture", gpa: 3.2 }
        }},
     { insertOne :{
           "document" :{ name: "Terry", major: "Math", gpa: 3.8 }
        }},
     { updateOne :{
           filter : { name : "Terry" },
           update : { $set : { gpa : 4.0 } }
        }},
     { deleteOne :{ filter : { name : "Kate"} }
        },
     { replaceOne :{
           filter : { name : "Claire" },
           replacement : { name: "Genny", major: "Counsling", gpa: 2.4 }
        }}
],
{ordered: false}
);
`.trim();


const indexing = `
db.stores.insertMany(
  [
    { _id: 1, name: "Java Hut", description: "Coffee and cakes" },
    { _id: 2, name: "Burger Buns", description: "Gourmet hamburgers" },
    { _id: 3, name: "Coffee Shop", description: "Just coffee" },
    { _id: 4, name: "Clothes Clothes Clothes", description: "Discount clothing" },
    { _id: 5, name: "Java Shopping", description: "Indonesian goods" }
  ]
)

db.stores.createIndex( { name: "text", description: "text" } )

db.stores.find({ $text: {$search: "Coffee" } })

db.stores.find({ $text: {$search: "Java Hut Coffee" } })

db.stores.find(
  { $text: { $search: "java hut coffee" } },
  { score: { $meta: "textScore" } }
).sort( { score: { $meta: "textScore" } } )`.trim();


const aggregation = `
db.purchase_orders.insertMany(
  [
       {product: "toothbrush", total: 4.75, customer: "Mike"},
       {product: "guitar", total: 199.99, customer: "Tom"},
       {product: "milk", total: 11.33, customer: "Mike"},
       {product: "pizza", total: 8.50, customer: "Karen"},
       {product: "toothbrush", total: 4.75, customer: "Karen"},
       {product: "pizza", total: 4.75, customer: "Dave"}
       {product: "toothbrush", total: 4.75, customer: "Mike"},
  ]
)

// find out how many toothbrushes were sold
db.purchase_orders.count({product: "toothbrush"})

// Find list of all products sold
db.purchase_orders.distinct("product")

// Find the total amount of money spent by each customer
db.purchase_orders.aggregate([
       {$match: {} },
       {$group: {_id: "$customer", total: { $sum: "$total"} } }
  ])

// Find how much has been spent on each product and sort it by price
db.purchase_orders.aggregate([
       {$match: {} },
       {$group: {_id: "$product", total: { $sum: "$total"} } },
       {$sort: {total: -1}}
  ])

// Find how much money each customer has spent on toothbrushes and pizza
db.purchase_orders.aggregate([
       {$match: {product: {$in: ["toothbrush", "pizza"]} } },
       {$group: {_id: "$product", total: { $sum: "$total"} } },
  ])`.trim();
  
  
  const search = `
  //Creating Text Index
  db.posts.insert({
    "post_text": "enjoy the mongodb articles on tutorialspoint",
    "tags": ["mongodb", "tutorialspoint"]
 }
 {
   "post_text" : "writing tutorials on mongodb",
   "tags" : [ "mongodb", "tutorial" ]
 })
 
 
 //We will create a text index on post_text field so that we can search inside our posts' text −
 db.posts.createIndex({post_text:"text"})
{
	"createdCollectionAutomatically" : true,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}


//Using Text Index
Now that we have created the text index on post_text field, we will search for all the posts having the word 
tutorialspoint in their text.
db.posts.find({$text:{$search:"tutorialspoint"}}).pretty()
{
	"_id" : ObjectId("5dd7ce28f1dd4583e7103fe0"),
	"post_text" : "enjoy the mongodb articles on tutorialspoint",
	"tags" : [
		"mongodb",
		"tutorialspoint"
	]
}
  `.trim();
  
  
  const deleting = `
  db.posts.getIndexes()[
	{"v" : 2,	"key" : {"_id" : 1}, "name" : "_id_",	"ns" : "mydb.posts"},
	{"v" : 2,	"key" : { "fts" : "text", "ftsx" : 1},	"name" : "post_text_text","ns" : "mydb.posts",
		"weights" : {"post_text" : 1},
		"default_language" : "english",
		"language_override" : "language",
		"textIndexVersion" : 3
  }
]


//After getting the name of your index from above query, run the following command. Here, post_text_text is the name 
of the index.
db.posts.dropIndex("post_text_text")
`.trim();


class BulkWright extends Component {
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
                 <b>Bulk Write Operations</b>
                 <br/>
                 <br/>
                 The <b>db.collection.bulkWrite()</b> method provides the ability to perform bulk insert, update, and remove operations. MongoDB also supports bulk insert through the <b>db.collection.insertMany().</b>
                 <br/><br/>
                 Since ordered is true by default, only the first operation completes successfully. The rest are not executed. Running the bulkWrite() with ordered : false would allow the remaining operations to complete despite the error.
                   <div style={titles}>
                      <PrismCode
                        code={code}
                        language="js"
                        plugins={["line-numbers"]}
                      />
                    </div>
                    <br/>
                    <h3>Aggregation</h3>
                    <div style={titles}>
                      <PrismCode
                        code={aggregation}
                        language="js"
                        plugins={["line-numbers"]}
                      />
                    </div>
                    <br/>
                    <h3>Text Indexing</h3>
                    MongoDB provides text indexes to support text search queries on string content. text indexes can include any field whose value is a string or an array of string elements.
                    <div style={titles}>
                      <PrismCode
                        code={indexing}
                        language="js"
                        plugins={["line-numbers"]}
                      />
                    </div>
                    <br/>
                    <h3>Text Search</h3>
                    The Text Search uses stemming techniques to look for specified words in the string fields by dropping stemming stop words like a, an, the, etc.
                    <br/>
                    <div style={titles}>
                      <PrismCode
                        code={search}
                        language="js"
                        plugins={["line-numbers"]}
                      />
                    </div>
                    <br/>
                    <h3>Deleting Text Index</h3>
                    To delete an existing text index, first find the name of index using the following query −
                    <div style={titles}>
                      <PrismCode
                        code={deleting}
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

export default (withStyles(styles)(BulkWright));
