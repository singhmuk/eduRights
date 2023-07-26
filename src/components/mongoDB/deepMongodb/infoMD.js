import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../../ReactJs/styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../../ReactJs/prismCode";

import mongoDB from "../../../assets/js/mongodb.png";
import Index from "../../../assets/js/index.gif";
import mongoLikes from "../../../assets/js/like.png";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

const redesign = {
  height: 350,
  width: 600,
};

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const code = `
    db.createCollection("student", 
                          { capped : true, 
                            autoIndexID : true, 
                            size : 5242880, 
                            max : 5000
                           }); 
`.trim();

const createInd = `
//Create index
db.users.ensureIndex({"email":1, "roll":-1})

//Drop index
db.users.dropIndex({"email":1})

//getIndexes
db.users.getIndexes()                           //returns the description of all the indexes int the collection.
`.trim();

// const code = ``.trim();

// const code = ``.trim();

// const code = ``.trim();

// const code = ``.trim();

// const code = ``.trim();

// const code = ``.trim();

// const code = ``.trim();

class IntroMD extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>
              <Sidebar />
            </h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>1. What makes MongoDB the best?</h3>
              <ul>
                <li>
                  <b>Schema-less: </b>MongoDB is a schema-less database, which
                  means you can store data without defining a fixed structure
                  for it. This makes it easy to add or modify fields as needed,
                  without having to modify the entire schema.
                </li>
                <br />
                <li>
                  <b>Scalability: </b>MongoDB is a horizontally scalable
                  database, which means you can easily scale it out across
                  multiple servers as your application grows. This makes it a
                  good choice for applications that need to handle large volumes
                  of data and traffic.
                </li>
                <br />
                <li>
                  <b>Performance: </b>MongoDB is designed to be fast and
                  efficient, with a high-performance storage engine that can
                  handle large amounts of data. It also supports indexing, which
                  makes queries faster and more efficient.
                </li>
                <br />
                <li>
                  <b>Flexibility: </b>MongoDB is a flexible database that can be
                  used for a wide range of applications, from simple blogs and
                  e-commerce sites to complex social networks and big data
                  applications.
                </li>
              </ul>
              <br />
              <h3>
                2. If you remove an object attribute, is it deleted from the
                database?
              </h3>
              <p>
                Yes, it is deleted. Hence, it is better to eliminate the
                attribute and then save the object again.
              </p>
              <br />
              <img
                src={mongoDB}
                alt="Omega"
                className="responsive"
                style={redesign}
              />
              <br />
              <br />
              <h3>
                3. Explain the situation when an index does not fit into RAM.
              </h3>
              <p>
                In MongoDB, indexes are used to improve query performance by
                allowing the database to locate and retrieve specific data more
                quickly. When the size of an index exceeds the amount of
                available RAM on a server, MongoDB may not be able to keep the
                entire index in memory. This can result in slower query
                performance, as MongoDB must read the index from disk rather
                than from memory.
              </p>
              In situations where the index is too large to fit in memory, there
              are several strategies that can be used to improve performance:
              <ul>
                <li>
                  <b>Add more RAM to the server: </b>This is the simplest
                  solution and can often improve performance significantly.
                </li>
                <br />
                <li>
                  <b>Use a more efficient index: </b>If possible, consider using
                  a smaller or more efficient index that can fit in memory.
                </li>
                <br />
                <li>
                  <b>Sharding: </b>MongoDB supports sharding, which allows data
                  to be distributed across multiple servers. By sharding the
                  data, the index size can be reduced on each individual server,
                  allowing more of the index to fit in memory.
                </li>
                <br />
                <li>
                  <b>Use SSDs: </b>If the index cannot fit in memory, using SSDs
                  can help improve performance by reducing the time it takes to
                  read data from disk.
                </li>
                <br />
                <li>
                  <b>Tune MongoDB configuration parameters: </b>MongoDB provides
                  a number of configuration parameters that can be tuned to
                  optimize performance. For example, increasing the read-ahead
                  cache size can help reduce the number of disk reads required
                  to retrieve data.
                </li>
              </ul>
              <img
                src={Index}
                alt="Omega"
                className="responsive"
                style={redesign}
              />
              <br />
              <br />
              <br />
              <b>Likes Comments</b>
              <br />
              <img
                src={mongoLikes}
                alt="Omega"
                className="responsive"
                style={redesign}
              />
              <br />
              <h3>4. How does MongoDB provide consistency?</h3>
              <ul>
                <li>
                  MongoDB provides consistency through its default write
                  concern, which ensures that a write operation has been
                  successfully written to the majority of replica set members
                  before acknowledging the write operation. This ensures that
                  subsequent read operations will see the updated data, even if
                  the primary node fails and a new primary is elected.
                </li>
                <br />
                <li>
                  In addition, MongoDB supports multi-document transactions,
                  which ensures that a group of operations are executed as a
                  single atomic unit. This guarantees consistency across
                  multiple documents in a collection and can be used to
                  implement complex business logic.
                </li>
                <br />
                <li>
                  MongoDB also provides a number of features such as read and
                  write concerns, causal consistency, and retryable writes,
                  which enable developers to fine-tune consistency requirements
                  based on their specific use cases.
                </li>
              </ul>
              <br />
              <h3>5. What is the use of Journaling in MongoDB?</h3>
              <p>Journaling is used for safe backups in MongoDB.</p>
              <br />
              <h3>6. What is the use of Profiler?</h3>
              <p>
                Profiler is used to show the performance characteristics of
                every operation against the database.
              </p>
              <br />
              <h3>7. What is Vertical Scaling?</h3>
              <p>
                Vertical scaling adds more CPU and storage resources to increase
                capacity.
              </p>
              <br />
              <h3>8. Define Horizontal Scaling.</h3>
              <p>
                Horizontal scaling divides the dataset and distributes data over
                multiple servers, or shards.
              </p>
              <br />
              <h3>9. What are the components of the Sharded cluster?</h3>
              <p>The sharded cluster has the following components: </p>
              <ul>
                <li>Shards</li>
                <li>Query routers</li>
                <li>Config servers</li>
              </ul>
              <br />
              <h3>11. What is the use of the dot notation in MongoDB?</h3>
              <p>
                MongoDB uses the dot notation to access the elements of an array
                and the fields of an embedded document.
              </p>
              <br />
              <h3>12. What is Splitting in MongoDB?</h3>
              <p>
                Splitting is a background process that is used to keep chunks
                from growing too large.
              </p>
              <br />
              <h3>
                13. What is the difference between MongoDB(non-relational) and
                MySQL(relational)?
              </h3>
              <p>There is a lot of difference between them in:</p>
              <ul>
                <li>Terms of data representation</li>
                <li>Relationships</li>
                <li>Transaction</li>
                <li>Querying data</li>
                <li>Schema design and definition</li>
                <li>Performance</li>
                <li>Speed</li>
                <li>Normalization.</li>
              </ul>
              <br />
              <h3>14. Explain the structure of ObjectID in MongoDB.</h3>
              <p>
                ObjectIds are small, likely unique, fast to generate, and
                ordered. ObjectId values consist of 12 bytes, where the first
                four bytes are a timestamp that reflect the ObjectId’s creation.
              </p>
              <br />
              <h3>15. Why MongoDB is not preferred over a 32-bit system?</h3>
              <p>
                MongoDB is not preferred over a 32-bit system because MongoDB
                uses memory-mapped files for performance reasons, and 32-bit
                systems have a limited address space, which can lead to problems
                when working with large data sets. In a 32-bit system, MongoDB
                can only use up to 4GB of RAM, which is a very small amount for
                modern databases. This can cause the database to slow down or
                even crash when working with large amounts of data. Therefore,
                it is recommended to use a 64-bit system for running MongoDB in
                order to take advantage of larger address spaces and avoid these
                limitations.
              </p>
              <br />
              <h3>
                16. Does MongoDB support ACID transaction management and locking
                functionalities?
              </h3>
              <p>
                Historically MongoDB does not support default multi-document
                ACID transactions (multiple-document updates that can be rolled
                back and are ACID-compliant). However, MongoDB provides atomic
                operation on a single document.
              </p>
              <br />
              <h3>
                17. Should I normalize my data before storing it in MongoDB?
              </h3>
              <ul>
                <li>
                  It depends from your goals. Normalization will provide an
                  update efficient data representation. Denormalization will
                  make data reading efficient.
                </li>
                <br />

                <li>
                  In general, use normalized data models: when embedding would
                  result in duplication of data but would not provide sufficient
                  read performance advantages to outweigh the implications of
                  the duplication. to represent more complex many-to-many
                  relationships. to model large hierarchical data sets. Also
                  normalizing your data like you would with a relational
                  database is usually not a good idea in MongoDB.
                </li>
                <br />

                <li>
                  Normalization in relational databases is only feasible under
                  the premise that JOINs between tables are relatively cheap.
                  The $lookup aggregation operator provides some limited JOIN
                  functionality, but it doesn't work with sharded collections.
                  So joins often need to be emulated by the application through
                  multiple subsequent database queries, which is very slow
                </li>
              </ul>
              <br />
              <h3>18. What happens if an index does not fit into RAM?</h3>
              <p>
                If the indexes do not fit into RAM, MongoDB reads data from disk
                which is relatively very much slower than reading from RAM.
              </p>
              <br />
              <h3>19. What are Primary and Secondary Replica sets?</h3>
              <p>
                Primary and master nodes are the nodes that can accept writes.
                MongoDB's replication is 'single-master:' only one node can
                accept write operations at a time. Secondary and slave nodes are
                read-only nodes that replicate from the primary.
              </p>
              <br />
              <h3>20. How does MongoDB provide concurrency?</h3>
              <p>
                MongoDB uses reader-writer locks that allow concurrent readers
                shared access to a resource, such as a database or collection,
                but give exclusive access to a single write operation.
              </p>
              <br />
              <h3>21. MongoDB data types</h3>
              <p>MongoDB supports many datatypes.Some of them are:</p>
              <ul>
                <li>
                  <b>String- </b>String in MongoDB must be UTF - 8 valid.
                </li>
                <li>
                  <b>Integer- </b>Integer can be 32 bit or 64 bit depending upon
                  our server.
                </li>
                <li>
                  <b>Boolean Double- </b>Used to store floating point values.
                </li>
                <li>
                  <b>Min/Max keys- </b>Compare a value against the lowest and
                  highest BSON elements.
                </li>
                <li>
                  <b>Arrays- </b>Used to store arrays or list or multiple values
                  into one key.
                </li>
                <li>
                  <b>Timestamp- </b>Can be handy for recording when a document
                  has been modified or added.
                </li>
                <li>
                  <b>Object- </b>Used for embedded documents.
                </li>
                <li>
                  <b>Null- </b>Used to store a Null value.
                </li>
                <li>
                  <b>Symbol- </b>This datatype is used identically to a string;
                  however, it 's generally reserved for languages that use a
                  specific symbol type.
                </li>
                <br />

                <li>
                  <b>Date- </b>This datatype is used to store the current date
                  or time in UNIX time format.You can specify your own date time
                  by creating object of Date and passing day, month, year into
                  it.
                </li>
                <br />

                <li>
                  <b>Object ID- </b>This datatype is used to store the
                  document's ID.{" "}
                </li>
                <li>
                  <b>Binary data- </b>This datatype is used to store binary
                  data.{" "}
                </li>
                <li>
                  <b>Code- </b>This datatype is used to store JavaScript code
                  into the document.{" "}
                </li>
                <li>
                  <b>Regular expression- </b>This datatype is used to store
                  regular expression.
                </li>
              </ul>
              <br />
              <h3>22. Advantages of MongoDB over RDBMS:</h3>
              <ul>
                <li>
                  Schema less − MongoDB is a document database in which one
                  collection holds different documents. Number of fields,
                  content and size of the document can differ from one document
                  to another.
                </li>
                <li>Structure of a single object is clear. </li>
                <li>No complex joins.</li>
                <li>MongoDB is easy to scale.</li>
                <li>
                  Conversion/mapping of application objects to database objects
                  not needed.
                </li>
              </ul>
              <br />
              <h3>24. Difference between DELETE, DROP and TRUNCATE:</h3>
              <p>TRUNCATE</p>
              <ul>
                <li>
                  TRUNCATE SQL query removes all rows from a table, without
                  logging the individual row deletions.
                </li>
                <li>TRUNCATE is faster than the DELETE query.</li>
                <li>
                  TRUNCATE is executed using a table lock and the whole table is
                  locked to remove all records.
                </li>
                <li>
                  Truncate uses less transaction space than the Delete
                  statement.
                </li>
                <li>Truncate cannot be used with indexed views.</li>
              </ul>
              <br />
              <p>DELETE:</p>
              <ul>
                <li>
                  DELETE is executed using a row lock, each row in the table is
                  locked for deletion. The DELETE command is used to remove rows
                  from a table based on WHERE condition. The delete can be used
                  with indexed views. Delete uses more transaction space than
                  the Truncate statement.
                </li>
              </ul>
              <br />
              <p>DROP:</p>
              <ul>
                <li>
                  The DROP command removes a table from the database. All the
                  tables' rows, indexes, and privileges will also be removed.
                </li>
                <li>No DML triggers will be fired.</li>
                <li>The operation cannot be rolled back.</li>
                <li>
                  DROP and TRUNCATE are DDL commands, whereas DELETE is a DML
                  command.
                </li>
                <li>
                  DELETE operations can be rolled back (undone), while DROP and
                  TRUNCATE operations cannot be rolled
                </li>
              </ul>
              <br />
              <h3>25. Replication</h3>
              <p>
                Replication in MongoDB is the process of creating multiple
                copies of MongoDB data in order to provide redundancy and fault
                tolerance. The main purpose of replication is to ensure that
                data is always available, even in the event of hardware failure,
                network outages, or other issues that could affect the
                availability of a MongoDB instance.
              </p>
              MongoDB uses a primary-secondary replication model, also known as
              master-slave replication. In this model, there is one primary node
              that handles all write operations and multiple secondary nodes
              that replicate data from the primary node. The primary node is
              responsible for accepting all write operations and applying them
              to its own database. The secondary nodes copy the data from the
              primary node and apply the same operations to their own databases.
              <br />
              <br />
              <b>Replication in MongoDB provides several benefits:</b>
              <br />
              <p>
                <ul>
                  <li>
                    <b>High availability: </b>With multiple copies of the data,
                    the system is always available, even in the event of
                    hardware or network failures.
                  </li>
                  <br />
                  <li>
                    <b>Fault tolerance: </b>If the primary node fails, one of
                    the secondary nodes can be promoted to take over as the new
                    primary.
                  </li>
                  <br />
                  <li>
                    <b>Scalability: </b>Replication allows for horizontal
                    scaling by adding more secondary nodes to the system.
                  </li>
                  <br />
                  <li>
                    <b>Data durability: </b>Because data is stored in multiple
                    locations, replication provides an extra layer of protection
                    against data loss.
                  </li>
                </ul>
              </p>
              <br />
              <br />
              <b>How Replication Works in MongoDB : </b>
              <br />
              <ul>
                <li>
                  MongoDB achieves replication by the use of replica set. A
                  replica set is a group of mongod instances that host the same
                  data set. In a replica, one node is primary node that receives
                  all write operations. All other instances, such as
                  secondaries, apply operations from the primary so that they
                  have the same data set. Replica set can have only one primary
                  node. Replica set is a group of two or more nodes (generally
                  minimum 3 nodes are required).
                </li>
                <br />
                <li>
                  In a replica set, one node is primary node and remaining nodes
                  are secondary. At the time of automatic failover or
                  maintenance, election establishes for primary and a new
                  primary node is elected. After the recovery of failed node, it
                  again join the replica set and works as a secondary node.
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
                  Sharding: Sharding is the process of storing data records
                  across multiple machines and it is MongoDB's approach to
                  meeting the demands of data growth. As the size of the data
                  increases, a single machine may not be sufficient to store the
                  data nor provide an acceptable read and write throughput.
                </p>
                <p>
                  Sharding solves the problem with horizontal scaling. With
                  sharding, you add more machines to support data growth and the
                  demands of read and write operations.
                </p>
                <b>Why Sharding?</b>
                <ul>
                  <li>In replication, all writes go to master node</li>
                  <li>Latency sensitive queries still go to master</li>
                  <li>Single replica set has limitation of 12 nodes</li>
                  <li>
                    Memory can't be large enough when active dataset is big
                  </li>
                  <li>Local disk is not big enough</li>
                  <li>Vertical scaling is too expensive</li>
                </ul>
                <br />
              </ul>
              <h3>26. Projection</h3>
              <p>
                Projection means selecting only the necessary data rather than
                selecting whole of the data of a document.
              </p>
              <p>
                If a document has 5 fields and you need to show only 3, then
                select only 3 fields from them. when you execute find() method,
                then it displays all fields of a document. To limit this, you
                need to set a list of fields with value 1 or 0. 1 is used to
                show the field while 0 is used to hide the fields.
              </p>
              <h3>27. Creating a Capped Collection</h3>
              <ul>
                <li>
                  Capped collections are fixed-size circular collections that
                  follow the insertion order to support high performance for
                  create, read, and delete operations.
                </li>
                <li>
                  By circular, it means that when the fixed size allocated to
                  the collection is exhausted, it will start deleting the oldest
                  document in the collection without providing any explicit
                  commands. Capped collections restrict updates to the documents
                  if the update results in increased document size. Since capped
                  collections store documents in the order of the disk storage,
                  it ensures that the document size does not increase the size
                  allocated on the disk. Capped collections are best for storing
                  log information, cache data, or any other high volume data.{" "}
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={code}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>
                This will create a collection named student, with maximum size
                of 5 megabytes and maximum of 5000 documents.
              </i>
              <br />
              <h3>28. What is mongodb indexing</h3>
              MongoDB uses indexing in order to make the query processing more
              efficient. If there is no indexing, then the MongoDB must scan
              every document in the collection and retrieve only those documents
              that match the query. Indexes are special data structures that
              stores some information related to the documents such that it
              becomes easy for MongoDB to find the right data file. The indexes
              are order by the value of the field specified in the index.
              <div style={titles}>
                <PrismCode
                  code={createInd}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>29. Humongous</h3>
              <ul>
                <li>
                  <b>Humongous: </b>Extremely large. So MongoDb is name.
                </li>
                <li>
                  <b>Spider Monkey: </b>MongoDb internally used Moilla's Spider
                  Monkey JavaScript engine.
                </li>
              </ul>
              <br />
              <ul>
                <li>
                  MongoDb Physical database contains several logical databases.
                </li>
                <li>
                  Each database contains several collections. Collection is
                  something like table in relational database.
                </li>
                <li>
                  Each collection contains several documents. Document is
                  something like record/row in relational database.
                </li>
              </ul>
              <h3>30. Key characteristics of MongoDb database</h3>
              <ul>
                <li>
                  All information related to a document will be stored in a
                  single place. To retrieve data, It's not required to perform
                  join operations and hance retrieval is very fast.
                </li>
                <li>
                  Documents are independent of each other and no schema. Hence
                  we can store unstructure data like videos, audio files etc.
                </li>
                <li>
                  We can store very huge amount of data and hence scalability is
                  more.
                </li>
                <li>
                  Performance and Flexibility are biggest assets of MongoDb.
                </li>
              </ul>
              <br />
              <h3>31. MongoDb Shell vs MongoDb Server</h3>
              <ul>
                <li>
                  Once we installed MongoDb, We will get MongoDb Shell and
                  MongoDb Server.
                </li>
                <li>
                  MongoDb Server is responsible to store our data in database.
                </li>
                <li>
                  MongoDb Shell is responsible to manage Server. By using this
                  Shell we can perform all required CURD operations.
                </li>
              </ul>
              <br />
              <ul>
                <li>MongoDb Server can be either local or remote.</li>
                <li>
                  <b>mongod: </b>To Launch MongoDb Server
                </li>
                <li>
                  <b>mongo: </b>To Launch MongoDb Shell
                </li>
              </ul>
              <br />
              <h3>32. Default Databases</h3>
              <ul>
                <li>
                  <b>admin: </b>
                  <ul>
                    <li>
                      admin db is used to store user authentication and
                      authorization information like username, password, roles
                      etc.
                    </li>
                    <li>
                      This database is used by administrators while creating,
                      deleting and updating users and while assigning roles.
                    </li>
                  </ul>
                </li>
                <br />

                <li>
                  <b>config: </b>
                  <ul>
                    <li>
                      To store configuration information of MongoDb server.
                    </li>
                  </ul>
                </li>
                <br />

                <li>
                  <b>local: </b>
                  <ul>
                    <li>
                      Can be used by admin while performing Replication process.
                    </li>
                  </ul>
                </li>
              </ul>
              <br />
              <h3>33. Data Formats</h3>
              <ul>
                <li>JSON: --- BSON and that BSON will be stored.</li>
                <li>BSON Formats required less memory.</li>
                <li>BSON support extra data types.</li>
                <li>
                  <b>EJSON (Extended JSON): </b>At the time of retrieval BSON
                  data will be converted to EJSON.
                </li>
              </ul>
              <br />
              <h3>34. </h3>
              <ul>
                <li>Database will be created dynamically.</li>
                <li>
                  If anything prefixed with $ symbol, then it is predefined
                  word.
                </li>
                <li>
                  <b>load("D:\users.js"): </b>To load documents.
                </li>
                <li>
                  <b>Inserting documents from JSON file. : </b>
                  <ul>
                    <li>
                      <b>mongoimport: </b>Tool to import documents from JSON
                      file into MongoDb.
                    </li>
                    <li>mongoimport is not available by default.</li>
                  </ul>
                </li>
                <br />
                <li>
                  <b>db.getName(): </b>To check current database name.
                </li>
              </ul>
              <br />
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(IntroMD);
