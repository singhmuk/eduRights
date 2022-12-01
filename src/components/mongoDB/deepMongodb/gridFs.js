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

const mongofiles = `mongofiles.exe -d gridfs put song.mp3`.trim()

const chunks = `> db.fs.chunks.find({files_id:ObjectId("5ef6621233e86dcb54461e54")})
> db.fs.chunks.find({},{_id:0,data:0})`.trim()

const customers = `db.customers([{
      name:'Max',
      age:29,
      address:{
      city:'Munich'
    },
    hobbies:[
      {Name:'Cooking'},
      {name:'Sports'}
    ]
   }
 ]);
 `.trim()


class GridFs extends Component {
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
      <b>.MongoDB - GridFS</b>
      <br/>
      GridFS is the MongoDB specification for storing and retrieving large files such as images, audio
files, video files, etc. It is kind of a file system to store files but its data is stored
within MongoDB collections. GridFS has the capability to store files even greater than its
document size limit of 16MB.<br/>
<br/>
GridFS divides a file into chunks and stores each chunk of data in a separate document, each of
maximum size 255k.<br/>
<br/>
GridFS by default uses two collections fs.files and fs.chunks to store the file's metadata and
the chunks. Each chunk is identified by its unique _id ObjectId field. The fs.files serves as a
parent document. The files_id field in the fs.chunks document links the chunk to its parent.
Adding Files to GridFS :<br/>
<br/>
Open your command prompt, navigate to the mongofiles.exe in the bin folder of MongoDB
installation folder and type the following code (after put song.mp3 in same place) −
<br/>
      <div style={titles}>
      <PrismCode
        code={mongofiles}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <i>gridfs is collection name and song.mp3 is file name. To see the file's document in database, you can use find query<br/>
db.fs.files.find()<br/>
We can also see all the chunks present in fs.chunks collection related to the stored file with the
following code, using the document id returned in the previous query</i>
<br/>
      <div style={titles}>
      <PrismCode
        code={chunks}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <b>Data is stored in json like syntax</b>
      <br/>
      BSON(Binary JSON) Data Formate:
      <div style={titles}>
      <PrismCode
        code={customers}
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

export default (withStyles(styles)(GridFs));
