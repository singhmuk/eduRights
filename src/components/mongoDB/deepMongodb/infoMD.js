import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import mongoDB from '../../../assets/js/mongodb.png';
import Index from '../../../assets/js/index.gif';
import mongoLikes from '../../../assets/js/like.png';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 350,
  width: 600
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

const code = `
    db.createCollection("student", 
                          { capped : true, 
                            autoIndexID : true, 
                            size : 5242880, 
                            max : 5000
                           }); 
`.trim()


class IntroMD extends Component {
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
              <h3>1. What makes MongoDB the best?</h3>

              <ul>
                <li>Document-oriented (DO)</li>
                <li>High performance (HP)</li>
                <li>High availability (HA)</li>
                <li>Easy scalability</li>
                <li>Rich query language</li>
              </ul>
              <br />

              <h3>2.If you remove an object attribute, is it deleted from the database?</h3>
              <p>Yes, it is deleted. Hence, it is better to eliminate the attribute and then save the object again.</p>
              <br />
              <img src={mongoDB} alt="Omega" className="responsive" style={redesign} />
              <br />
              <br />


              <h3>3. Explain the situation when an index does not fit into RAM.</h3>
              <p>
                Indexes do not have to fit entirely into RAM in all cases. If the value of the indexed field increments with every
                insert, and most queries select recently added documents; then MongoDB only needs to keep the parts of the index that
                hold the most recent or “right-most” values in RAM. This allows for efficient index use for read and write operations
                and minimize the amount of RAM required to support the index.
              </p>
              <img src={Index} alt="Omega" className="responsive" style={redesign} />
              <br />
              <br />
              <br />

              <b>Likes Comments</b>
              <br />
              <img src={mongoLikes} alt="Omega" className="responsive" style={redesign} />
              <br />

              <h3>4. How does MongoDB provide consistency?</h3>
              <ul>
                <li>
                  MongoDB uses the reader–writer locks, allowing simultaneous readers to access any supply like a database or a
                  collection but always offering private access to single writes.
                </li>
                <br />

                <li>
                  MongoDB is consistent by default: reads and writes are issued to the primary member of a replica set. Applications
                  can optionally read from secondary replicas, where data is eventually consistent by default.
                </li>
                <br />

                <li>
                  Eventual consistency means exactly that: the system is eventually consistent–if no updates are made to a given data
                  item for a “long enough” period of time, sometime after hardware and network failures heal, then, eventually, all
                  reads to that item will return the same consistent value.
                </li>
              </ul>
              <br />

              <h3>5. What is the use of Journaling in MongoDB?</h3>
              <p>Journaling is used for safe backups in MongoDB.</p>
              <br />

              <h3>6. What is the use of Profiler?</h3>
              <p>Profiler is used to show the performance characteristics of every operation against the database.</p>
              <br />

              <h3>7. What is Vertical Scaling?</h3>
              <p>Vertical scaling adds more CPU and storage resources to increase capacity.</p>
              <br />

              <h3>8.Define Horizontal Scaling.</h3>
              <p>Horizontal scaling divides the dataset and distributes data over multiple servers, or shards.</p>
              <br />

              <h3>9. What are the components of the Sharded cluster?</h3>
              <p>The sharded cluster has the following components: </p>
              <ul>
                <li>Shards</li>
                <li>Query routers</li>
                <li>Config servers</li>
              </ul>

              <h3>10. What is the use of the pretty() method?</h3>
              <p>The pretty() method is used to show the results in a formatted way.</p>
              <br />

              <h3>11. What is the use of the dot notation in MongoDB?</h3>
              <p>MongoDB uses the dot notation to access the elements of an array and the fields of an embedded document.</p>
              <br />

              <h3>12. What is Splitting in MongoDB?</h3>
              <p>Splitting is a background process that is used to keep chunks from growing too large.</p>
              <br />

              <h3>13. What is the difference between MongoDB(non-relational) and MySQL(relational)?</h3>
              <p>There is a lot of difference between them in:</p>
              <ul>
                <li>Terms of data representation</li>
                <li>Relationships</li>
                <li>Transaction</li>
                <li>Querying data</li>
                <li>Schema design and definition</li>
                <li>Performance</li>
                <li>Speed</li>
                <li>Normalization, and many more.</li>
              </ul>
              <br />

              <h3>14. Explain the structure of ObjectID in MongoDB.</h3>
              <p>
                ObjectIds are small, likely unique, fast to generate, and ordered. ObjectId values consist of 12 bytes, where the
                first four bytes are a timestamp that reflect the ObjectId’s creation.
              </p>
              <br />

              <h3>15. Why MongoDB is not preferred over a 32-bit system?</h3>
              <p>
                When running a 32-bit build of MongoDB, the total storage size for the server, including data and indexes, is 2
                gigabytes. For this reason, do not deploy MongoDB to production on 32-bit machines. If you're running a 64-bit build
                of MongoDB, there's virtually no limit to storage size.
              </p>
              <br />

              <h3>16. Does MongoDB support ACID transaction management and locking functionalities?</h3>
              <p>
                Historically MongoDB does not support default multi-document ACID transactions (multiple-document updates that can be
                rolled back and are ACID-compliant). However, MongoDB provides atomic operation on a single document.
              </p>
              <br />

              <h3>17. Should I normalize my data before storing it in MongoDB?</h3>
              <ul>
                <li>
                  It depends from your goals. Normalization will provide an update efficient data representation. Denormalization will
                  make data reading efficient.
                </li>
                <br />

                <li>
                  In general, use embedded data models (denormalization) when: you have “contains”
                  relationships between entities. you have one-to-many relationships between entities. In these relationships the
                  “many” or child documents always appear with or are viewed in the context of the “one” or parent documents.
                </li>
                <br />

                <li>
                  In general, use normalized data models: when embedding would result in duplication of data but would not provide
                  sufficient read performance advantages to outweigh the implications of the duplication. to represent more complex
                  many-to-many relationships. to model large hierarchical data sets. Also normalizing your data like you would with a
                  relational database is usually not a good idea in MongoDB.
                </li>
                <br />

                <li>
                  Normalization in relational databases is only feasible under the premise that JOINs between tables are relatively
                  cheap. The $lookup aggregation operator provides some limited JOIN functionality, but it doesn't work with sharded
                  collections. So joins often need to be emulated by the
                  application through multiple subsequent database queries, which is very slow
                </li>
              </ul>
              <br />

              <h3>18. What happens if an index does not fit into RAM?</h3>
              <p>
                If the indexes do not fit into RAM, MongoDB reads data from disk which is relatively very much slower than reading
                from RAM.
              </p>
              <br />

              <h3>19. What are Primary and Secondary Replica sets?</h3>
              <p>
                Primary and master nodes are the nodes that can accept writes. MongoDB's replication is 'single-master:' only one
                node can accept write operations at a time. Secondary and slave nodes are read-only nodes that replicate from the
                primary.
              </p>
              <br />

              <h3>20. How does MongoDB provide concurrency?</h3>
              <p>
                MongoDB uses reader-writer locks that allow concurrent readers shared access to a resource, such as a database or
                collection, but give exclusive access to a single write operation.
              </p>
              <br />

              <h3>21.mongoDB_data_types</h3>
              <p>MongoDB supports many datatypes.Some of them are:</p>
              <ul>
                <li>String- String in MongoDB must be UTF - 8 valid.</li>
                <br />

                <li>Integer- Integer can be 32 bit or 64 bit depending upon your server.</li>
                <br />

                <li>Boolean Double- This type is used to store floating point values.</li>
                <br />

                <li>Min/Max keys- This type is used to compare a value against the lowest and highest BSON elements.</li>
                <br />

                <li>Arrays- This type is used to store arrays or list or multiple values into one key.</li>
                <br />

                <li>Timestamp- This can be handy for recording when a document has been modified or added.</li>
                <br />

                <li>Object- This datatype is used for embedded documents.</li>
                <br />

                <li>Null- This type is used to store a Null value.</li>
                <br />

                <li>
                  Symbol- This datatype is used identically to a string; however, it 's generally reserved for languages that use a
                  specific symbol type.
                </li>
                <br />

                <li>
                  Date- This datatype is used to store the current date or time in UNIX time format.You can specify your own date time
                  by creating object of Date and passing day, month, year into it.
                </li>
                <br />

                <li>Object ID- This datatype is used to store the document's ID. </li>
                <br />

                <li>Binary data- This datatype is used to store binary data. </li>
                <br />

                <li>Code- This datatype is used to store JavaScript code into the document. </li>
                <br />

                <li>Regular expression- This datatype is used to store regular expression.</li>
              </ul>
              <br />

              <h3>22.Advantages of MongoDB over RDBMS:</h3>
              <ul>
                <li>
                  Schema less − MongoDB is a document database in which one collection holds different documents. Number of fields,
                  content and size of the document can differ from one document to another.
                </li>
                <br />

                <li>Structure of a single object is clear. </li>
                <br />

                <li>No complex joins.</li>
                <br />

                <li>Ease of scale-out − MongoDB is easy to scale.</li>
                <br />

                <li>Conversion/mapping of application objects to database objects not needed.</li>
              </ul>
              <br />

              <h3>23.Why Use MongoDB?</h3>
              <ul>
                <li>Document Oriented Storage − Data is stored in the form of JSON style documents.</li>
                <br />

                <li>Index on any attribute Replication and high availability Auto-Sharding Rich queries Fast in-place updates.</li>
                <br />

                <li>Big Data Content Management and Delivery Mobile and Social Infrastructure User Data Management Data Hub.</li>
              </ul>
              <br />

              <h3>24.Difference between DELETE, DROP and TRUNCATE:</h3>
              <p>TRUNCATE</p>
              <ul>
                <li>TRUNCATE SQL query removes all rows from a table, without logging the individual row deletions.</li>
                <br />

                <li>TRUNCATE is faster than the DELETE query.</li>
                <br />

                <li>TRUNCATE is executed using a table lock and the whole table is locked to remove all records.</li>
                <br />

                <li>
                  TRUNCATE removes all rows from a table. Minimal logging in the transaction log, so it is faster
                  performance-wise.
                </li>
                <br />

                <li>Truncate uses less transaction space than the Delete statement.</li>
                <br />

                <li>Truncate cannot be used with indexed views.</li>
              </ul>
              <br />

              <p>DELETE:</p>
              <ul>
                <li>
                  DELETE is executed using a row lock, each row in the table is locked for deletion. The DELETE
                  command is used to remove rows from a table based on WHERE condition. The delete can be used with indexed views.
                  Delete uses more transaction space than the Truncate statement.
                </li>
              </ul>
              <br />

              <p>DROP:</p>
              <ul>
                <li>The DROP command removes a table from the database. All the tables' rows, indexes, and privileges will also be
                  removed.
                </li>
                <br />

                <li>No DML triggers will be fired.</li>
                <br />

                <li>The operation cannot be rolled back.</li>
                <br />

                <li>DROP and TRUNCATE are DDL commands, whereas DELETE is a DML command.</li>
                <br />

                <li>DELETE operations can be rolled back (undone), while DROP and TRUNCATE operations cannot be rolled</li>
                <br />
              </ul>
              <br />

              <h3>25.Replication</h3>
              <p>
                Replication is the process of synchronizing data across multiple servers. Replication provides redundancy and
                increases data availability with multiple copies of data on different database servers. Replication protects a
                database from the loss of a single server. Replication also allows you to recover from hardware failure and service
                interruptions.
              </p>
              <b>Why Replication?</b>
              <br />
              <p>
                To keep your data safe High (24*7) availability of data Disaster recovery No downtime for maintenance (like backups,
                index rebuilds, compaction) Read scaling Replica set is transparent to the application.
              </p>
              <br />
              <br />
              <b>How Replication Works in MongoDB : </b><br />
              <ul>
                <li>
                  MongoDB achieves replication by the use of replica set. A replica set is a group of mongod instances that host the
                  same data set. In a replica, one node is primary node that receives all write operations. All other instances, such
                  as secondaries, apply operations from the primary so that they have the same data set. Replica set can have only one
                  primary node. Replica set is a group of two or more nodes (generally minimum 3 nodes are required).
                </li>
                <br />
                <li>
                  In a replica set, one node is primary node and remaining nodes are secondary. At the time of automatic failover or
                  maintenance, election establishes for primary and a new primary node is elected. After the recovery of failed node,
                  it again join the replica set and works as a secondary node.
                </li>
                <br />
                <b>Replica Set Features : </b>
                <br />
                <ul>
                  <li>A cluster of N nodes </li>
                  <li>Any one node can be primary</li>
                  <li>All write operations go to primary</li>
                  <li>Automatic failover </li>
                  <li>Automatic recovery</li>
                </ul>
                <br />
                <b>Consensus election of primary Set Up a Replica Set :</b>
                <p>
                  Sharding: Sharding is the process of storing data records across multiple machines and it is MongoDB's approach to
                  meeting the demands of data growth. As the size of the data increases, a single machine may not be sufficient to
                  store the data nor provide an acceptable read and write throughput.
                </p>
                <p>
                  Sharding solves the problem with horizontal scaling. With sharding, you add more machines to support data growth and
                  the demands of read and write operations.
                </p>
                <b>Why Sharding?</b>
                <ul>
                  <li>In replication, all writes go to master node</li>
                  <li>Latency sensitive queries still go to master</li>
                  <li>Single replica set has limitation of 12 nodes</li>
                  <li>Memory can't be large enough when active dataset is big</li>
                  <li>Local disk is not big enough</li>
                  <li>Vertical scaling is too expensive</li>
                </ul>
                <br />
              </ul>

              <h3>26.Projection</h3>
              <p>Projection means selecting only the necessary data rather than selecting whole of the data of a document.</p>
              <br />
              <p>
                If a document has 5 fields and you need to show only 3, then select only 3 fields from them. when you execute find()
                method, then it displays all fields of a document. To limit this, you need to set a list of fields with value 1 or 0.
                1 is used to show the field while 0 is used to hide the fields.
              </p>
              <br />

              <h3>27. Creating a Capped Collection</h3>
              <ul>
                <li>Capped collections are fixed-size circular collections that follow the insertion order to support high performance
                  for create, read, and delete operations.</li>
                <li>By circular, it means that when the fixed size allocated to the collection
                  is exhausted, it will start deleting the oldest document in the collection without providing any explicit commands.
                  Capped collections restrict updates to the documents if the update results in increased document size. Since capped
                  collections store documents in the order of the disk storage, it ensures that the document size does not increase
                  the size allocated on the disk. Capped collections are best for storing log information, cache data, or any other
                  high volume data. </li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={code}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>This will create a collection named student, with maximum size of 5 megabytes and maximum of 5000 documents.</i>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(IntroMD));
