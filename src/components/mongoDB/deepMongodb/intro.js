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

const Create_DB = `
show dbs
use EmployeeDB
db.dropDatabase()
db.createUser({user:"brad", pwd:"123", roles:["readWrite", "dbAdmin"]});

show collections
db.createCollection('store');                                          //create collection
db.orders.renameCollection('store')                                    //rename collection
db.orders.drop()                                                       // drop collection
 `.trim()

const findOne = `
db.store.find().pretty()
db.store.find({name: 'Ritesh'}, {country: 'India', color: 'Green'})
db.store.findOne({country: "UK"});
db.store.find({},{"name":1,_id:0}).limit(2);
db.store.find().count();
db.store.find().limit(4).skip(1);

db.store.find({$and: [{name:'Mukesh'},{country:'India'}] });
db.store.find({$or: [{name:'Mukesh'},{country:'India'}] });

db.store.find({country:{$in:['India']}})
db.store.find({country:{$not:{$in:['India']}}})

db.store.find({score:{$eq:7}})
db.store.find({country:{$not:{$eq:'India'}}})
db.store.find({score:{$lt:4}});
db.store.find({score:{$gt:4}});

`.trim()

const queries = `
db.store.insert({'interger':23});
db.store.insertOne({_id:1,name:'mukesh',country:'indian'});

db.store.insertMany([
     { _id: 20, name: "John Wick", country: "Visual Studio"},
     { _id: 22, name: "Deeksha Raul", country: "Unity 3D" }
   ]);

db.store.update({_id:1},{$set:{name:['mukesh'],country:['1234567890']}});
db.store.update({name:'Mukesh'},{$set:{country:'India'}})
db.store.update({_id: 20}, { $set: { name: ["Vocals", "Violin", "Octapad"] }})
db.users.update({_id:2.0},{$set:{userId:1}})          //alter collections, to add new data in existing row.

//Rename Field
db.posts.update({ title: 'Post Two' },{ $rename: { likes: 'views' }});

db.store.remove({})
db.store.remove({ name: "mukesh" })
db.store.remove({_id:1},{justOne:true});
`.trim()

const Filtering = `
db.store.remove()
db.store.remove({"_id":ObjectId("5d9f3bd0c02cef7d50bb97fb")});
`.trim()

const joining = `> db.users.find()
{ "_id" : 1, "userId" : 1, "name" : "Al" }
{ "_id" : 2), "userId" : 2, "name" : "Betty" }
{ "_id" : 3, "userId" : 3, "name" : "Cameron" }

> db.comments.find()
{ "_id" : 1, "userId" : 1, "comment" : "Hi, I'm Al and I love comments." }
{ "_id" : 2, "userId" : 1, "comment" : "Hi, it's Al again. I really do love comments." }
{ "_id" : 3, "userId" : 2, "comment" : "I'm Betty. This is my first comment onthis site." }
{ "_id" : 4, "userId" : 3, "comment" : "This is Cameron. I enjoyed reading your website." }
`.trim()

const aggregate = `db.users.aggregate([ {$lookup: {
                            from: "comments",
                            localField: "userId",
                            foreignField: "userId",
                            as: "combined"
                          }
                       }
                     ]).pretty()
`.trim()

const  Data_Modelling = `db.customers.insert([
{id: , Emp_ID: "10025AE336" Personal_details:{ First_Name: "Radhika", Last_Name: "Sharma", DOB: "1995-09-26"},
  Contact: { e-mail: "radhika_sharma.123@gmail.com", phone: "9848022338"},
  Address: { city: "Hyderabad", Area: "Madapur", State: "Telangana"}
    ]);
 `.trim()

const normalized = `
Employee: {_id: <ObjectId101>, Emp_ID: "10025AE336"}
  
Personal_details:{ _id: <ObjectId102>, empDocID: " ObjectId101", First_Name: "Radhika", Last_Name: "Sharma",
                  DOB: "1995-09-26"}
   
 Contact: { _id: <ObjectId103>, empDocID: " ObjectId101", e-mail: "radhika_sharma.123@gmail.com", 
                  phone: "9848022338"}
   
 Address: { _id: <ObjectId104>, empDocID: " ObjectId101", city: "Hyderabad", Area: "Madapur", State: "Telangana"}
 `.trim()

const Example = `{ _id: POST_ID title: TITLE_OF_POST, description: POST_DESCRIPTION, by: POST_BY, url: URL_OF_POST, 
  tags: [TAG1, TAG2, TAG3], likes: TOTALL_LIKES,
  
    comments: [{ user:'COMMENT_BY', message: TEXT, dateCreated: DATE_TIME, like: LIKES },
      { user:'COMMENT_BY', message: TEXT, dateCreated: DATE_TIME, like: LIKES }
    ]}
  `.trim()

const Aggregation = `
db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}]);

//Used to select some specific fields from a collection.
db.user.aggregate([ { $project : { _id : 0, name : 1 } }])
`.trim()

const Pipeline = `> db.user.find()
{ "_id" : 1, "name" : "GENWI", "founded_year" : 2010 }
{ "_id" : 2, "name" : "Needium", "founded_year" : 2010 }
{ "_id" : 3, "name" : "Ziippi", "founded_year" : 2011 }
{ "_id" : 4, "name" : "Pixelmatic", "founded_year" : 2011 }
{ "_id" : 5, "name" : "Clowdy", "founded_year" : 2013 }


Pipeline
db.user.aggregate([
  { $match : { founded_year : 2011 } },
  { $sort : {name:-1} },
  { $project : { _id : 0, name : 1 } }
 ])
 
 
 Or Pipeline
 db.user.aggregate([
  { $match: { founded_year: { $gte: 2010 } } },
  { $group: {
  _id: "$founded_year",
  companies: { $push: "$name" }
  }},
  { $sort: { "_id": 1 } }
 ])`.trim()

const match = `
db.users.aggregate({$match:{userId:1}})
db.users.aggregate({$match:{userId: {$gte:3}}})
`.trim()

const group = `db.user.aggregate({ $group :{_id:ObjectId("5ef64c903da2b374c85626a1"), count:{$sum:1}} })`.trim()

const sort = `db.user.aggregate({ $sort : {name:-1} })
`.trim()

const unwind = `db.user.aggregate({ $project: {author : 1, title : 1, tags : 1}},
                        { $unwind : "$tags" });
 
 o/p:
{ "_id" : 1, "title" : "this is my title", "author" : "bob", "tags" : "fun" }
{ "_id" : 2, "title" : "this is my title", "author" : "bob", "tags" : "good" }
{ "_id" : 3, "title" : "this is my title", "author" : "bob", "tags" : "fun" }`.trim()

const chaining = `
db.customers.find().limit(2).sort({ title: 1 }).pretty()

Foreach
db.customers.find().forEach(doc=>{
  print('name',doc.First_Name)
  });
 `.trim()

const update = `db.customers.save(
  {"_id" : ObjectId(5ee08dc1e206f48220a3b08c), "first_name":"Tutorials Point N
 ew Topic","by":"mongodb"}
 );
 `.trim()

const update_2 = `db.customers.update({first_name:"mukesh"},
{$set:{first_name:"Mongodb"}},{multi:true})
`.trim()

const findOneAndUpdate = `db.customers.updateOne(
  {first_name: 'ram'},
  { $set: { Age: '30',e_mail: 'radhika_newemail@gmail.com'}}
 );
 `.trim()

const updateOne = `db.customers.updateOne(
  {first_name: 'mukesh'},
  { $set: { Age: '30',e_mail: 'radhika_newemail@gmail.com'}}
 );`.trim()

const updateMany = `db.customers.updateMany({Age:{ $gt: "25" }},
{ $set: { Age: '00'}}
);
`.trim()

const Replace = `db.customers.update({first_name:"John"},{$set:{gender:"femail"}});
`.trim()

const increments = `db.customers.update({first_name:"John"},{$set:{age:45}});
db.customers.update({first_name:"John"},{$inc:{age:5}});
`.trim()

class Intro extends Component {
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
                  <h3>1. Create DB</h3>
                  <div style={titles}>
                  <PrismCode
                    code={Create_DB}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                  </div>
                  <br/>
                  <i>_id is 12 bytes hexadecimal number unique for every document in a collection. 12 bytes are divided
                  as follows −</i>
                  <br/>
                  <h3>2. Insert</h3>
                  <div style={titles}>
                  <PrismCode
                    code={queries}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                  </div>
                  <br/>

                  <h3>3. Find Specific Fields</h3>
                  It is also possible to filter your results by giving or adding some specific criteria in which you are interested to.
                  <div style={titles}>
                  <PrismCode
                    code={findOne}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                  </div>
                  <br/>
                  <br/>
                  <h3>4. MongoDB's update</h3>
                  <b>MongoDB's update() and save() methods are used to update document into a collection. The
                        update() method update the values in the existing document while the save() method replaces the
                        existing document with the document passed in save() method.</b>
                  <div style={titles}>
                  <PrismCode
                    code={update}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                  </div>
                  <br/>
                  <i> By default, MongoDB will update only a single document. To update multiple documents, you
            need to set a parameter multi: true</i>
                  <div style={titles}>
                  <PrismCode
                    code={update_2}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                  </div>
                  <br/>
                  he findOneAndUpdate() method updates the values in the existing document.
                  <div style={titles}>
                  <PrismCode
                    code={findOneAndUpdate}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                  </div>
                  <br/>
                  <i>MongoDB updateOne() method: This methods updates a single document which matches the given filter.</i>
                  <br/>
                  <br/>
                        <div style={titles}>
                        <PrismCode
                          code={updateOne}
                          language="js"
                          plugins={["line-numbers"]}
                        />
                        </div>
                        <br/>
                        <i>The customers() method updates all the documents that matches the given filter</i>
                        <br/>
                        <div style={titles}>
                        <PrismCode
                          code={updateMany}
                          language="js"
                          plugins={["line-numbers"]}
                        />
                        </div>
                        <i>Replace documents</i>
                        <br/>
                    <br/>
                    <div style={titles}>
                    <PrismCode
                      code={Replace}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                    </div>
                    <br/>
                    <b>match</b>
                    <br/>
                    − This is a filtering operation and thus this can reduce the amount of documents that are
              given as input to the next stage.

                    <div style={titles}>
                    <PrismCode
                      code={match}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                    </div>
                    <br/>
                    <br/>
                    <b>group</b>
                    <br/>
                    This does the actual aggregation as discussed above.
                    <div style={titles}>
                    <PrismCode
                      code={group}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                    </div>
                    <br/>
                    <br/>
                    <b>sort</b>
                    <div style={titles}>
                    <PrismCode
                      code={sort}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                    </div>
                    <br/>
                    <i>skip</i>
                    <br/>
                    <i>limit</i>
                    <br/>
                    <br/>
                    <b>Unwind</b>
                    <div style={titles}>
                    <PrismCode
                      code={unwind}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                    </div>
                    <br/>
                    <br/>
                    <b>Chaining</b>
                    <div style={titles}>
                    <PrismCode
                      code={chaining}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                    </div>
                    <br/>
                    <br/>
                    <b>increments numeric value is first</b>
                    <div style={titles}>
                    <PrismCode
                      code={increments}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                    </div>
                    <br/>
                    <br/>
                    <b>Updates</b>
                    <br/>
                    <b>MongoDB's remove() method </b>
                    MongoDB's remove() method is used to remove a document from the collection. remove()
                    method accepts two parameters. One is deletion criteria and second is justOne flag.
                    <br/>
                    If you don't specify deletion criteria, then MongoDB will delete whole documents from the
                    collection.
                    <br/>
                    <br/>
                    If there are multiple records and you want to delete only the first record, then set justOne
                    parameter in remove() method.
                          <div style={titles}>
                          <PrismCode
                            code={Filtering}
                            language="js"
                            plugins={["line-numbers"]}
                          />
                          </div>
                          <br/>
      
                        <h3>5. joining the data from 2 table queries</h3>
                        We perform a left outer join by using the $lookup stage.
                        The $lookup stage lets specify which collection we want to join with the current collection, and
                        which fields that should match.
                        <br/>
                        <br/>
                        <i>Consider we have a "users" collection and a "comments" collection:</i>
                        <div style={titles}>
                        <PrismCode
                          code={joining}
                          language="js"
                          plugins={["line-numbers"]}
                        />
                        </div>
                        <br/>
                        As can see in our dataset there is a common field userId on both collections which allows us to
                  match up each user with their comments.
                  <br/>
                  <br/>
                  <i>Use the aggregate() method with the $lookup stage.</i>
                  <br/>
                  <div style={titles}>
                  <PrismCode
                    code={aggregate}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                  </div>
                  <br/>
                  <i>MongoDB can store lots and lots data. And work in a very performent way. Retrive data very fast.
                  Used in web and mobile applications.<br/> <b>Collection = Table</b><br/>
                  Data stored in collection as Documents(BSON). This Documents are Seamaless means we can store
                  different data in same collection.<br/>
                  It's store embeded Documents(Document inside Document).<br/>
                  Good to use when there is no ton of inter connected relations Database, Collections, Document
                  data/db folder inside MongoDB
                  To insert data into MongoDB collection.</i>
                  <br/>

                <h3>6. Data Modelling</h3>
                Data in MongoDB has a flexible schema.documents in the same collection. They do not need to have
                the same set of fields or structure, Common fields in a collection’s documents may hold different
                types of data.<br/>
                <b>Data Model Design:</b> MongoDB provides two types of data models.
                <ul>
                  <li>Embedded data model</li>
                  <li>Normalized data model</li>
                </ul> 
                <br/>
                In Embedded Data Model, you can have (embed) all the related data in a single document, it is also
                known as de-normalized data model.<br/>
                <b>Ex. </b>Assume we are getting the details of employees in three different documents namely,
                Personal_details, Contact and, Address, you can embed all the three documents in a single one as
                shown below −
                <div style={titles}>
                <PrismCode
                  code={Data_Modelling}
                  language="js"
                  plugins={["line-numbers"]}
                />
                </div>
                <br/>
      
                <h3>7. Normalized: </h3>
                In Normalized Data Model, we can refer the sub documents in the original document.
                <br/>
                <b>Ex. </b>we can re-write the above document in the normalized model as.
                <div style={titles}>
                <PrismCode
                  code={normalized}
                  language="js"
                  plugins={["line-numbers"]}
                />
                </div>
                <br/>
                <br/>
                <b>Suppose a client needs a database design for his blog/website and see the differences between
                  RDBMS and MongoDB schema design. Website has the following requirements<br/>
                  Every post has the unique title, description and url.<br/>
                  Every post can have one or more tags.<br/>
                  Every post has the name of its publisher and total number of likes.<br/>
                  Every post has comments given by users along with their name, message, data-time and likes.<br/>
                  On each post, there can be zero or more comments.</b><br/>
                  In RDBMS schema, design for above requirements will have minimum three tables.
                  While in MongoDB schema, design will have one collection post and the following structure
                <div style={titles}>
                <PrismCode
                  code={Example}
                  language="js"
                  plugins={["line-numbers"]}
                />
                </div>
                <br/>
               
                <h3>8. Aggregation</h3>
                When want to analyze data stored in MongoDB, we can use MongoDB's aggregation framework to do so.<br/>
                Using the framework, we can create an aggregation pipeline that consists of one or more stages. Each stage transforms the documents and passes the output to next stage.
              <br/>
              The aggregation framework has a variety of stages: <b>$match, $group, $sort, $limit, $count, $geoNear, $graphLookup, $project, 
                $unwind. </b>
              <br/>
              <br/>

              In SQL count(*) and with group by is an equivalent of mongodb aggregation.<br/>
              if you want to display a list stating how many tutorials are written by each user, then you will
              use the following aggregate() method -
              <div style={titles}>
              <PrismCode
                code={Aggregation}
                language="js"
                plugins={["line-numbers"]}
              />
              </div>
              <br/>
         
              <h3>9. Pipeline Concept</h3>
              Aggregation Framework : Is a set of analytics tools within mongodb that
              allows to run various reports/ analysis on one/ more mongodb collections.
              <br/>
              <br/>
              <b>Aggregation Pipeline: </b><br/>
              <ul>
                <li>Take Input from a single collection.</li>
                <li>Pass the documents of the collection through one/ more stages.</li>
                <li>Each stage perform different operations in the Pipeline.</li>
                <li>Each stage take as Input whatever the stage before produced as Output. 
              The Input and Output for all stages are documents (stream of documents).</li>
                <li>At the end of Pipeline we get access to the output of the transformed and aggregated Output.</li>
              </ul>
                  <div style={titles}>
                    <PrismCode
                      code={Pipeline}
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

export default (withStyles(styles)(Intro));
