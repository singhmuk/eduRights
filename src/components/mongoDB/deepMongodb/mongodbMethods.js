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


const dataintegrity = `
//Domain integrity
    ID   NAME   SEMESTER    AGE 
    1   Ram         8       10
    2   Krishana    8       20
    3   Mukesh      1       5
    4   Rakesh      3       A (Not allowed. Because AGE is an integer attribute)


//Entity integrity
    ID   NAME   SEMESTER    AGE 
    1   Mukesh      1       5
        Rakesh      3       10


//User-Defined integrity
      ID      NAME   SEMESTER    AGE 
    abc001   Mukesh      1       5
    abc002   Rakesh      3       8 
    abcd002  Ritesh      3      10 
    (abcd002 not following the user-defined constraint so it not acceptable)
`.trim();

const Aliases = `
SELECT CustomerID AS ID, CustomerName AS Customer FROM Customers;
`.trim();


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
                  <h3>1. Characteristic of DBMS</h3>
                  <ul>
                    <li>Digital repository on a server to store and manage the information.</li>
                    <li>DBMS contains automatic backup and recovery procedures.</li>
                    <li>It contains ACID(Atomocity, Consistenct, Isolation and Durability) properties which maintain data in 
                      healthy state in case of failure.</li>
                    <li>Reduce complex relationship b/w data.</li>
                    <li>It used to support manipulatation and processing of data.</li>
                    <li>It used to provide security of data.</li>
                    <li>It can view database from different viewpoints according to the requirements of the user.</li>
                  </ul>
                  <br/>

                  <b>Advantages of DBMS: </b><br/>
                  <ul>
                    <li>Controls database redundancy.</li>
                    <li>Easily Maintenance.</li>
                    <li>Reduce time.</li>
                    <li>BAckup.</li>
                    <li>Multiple user interface.</li>
                  </ul>
                  <br/>

                  <b>Disadvantages of DBMS:</b><br/>
                  <ul>
                    <li>Cost of h/w and s/w.</li>
                    <li>Size</li>
                    <li>complexity</li>
                    <li>Higher impact of failure.</li>
                  </ul>
                  <br/>

                  <h3>2. DBMS Vs. RDBMS</h3>
                  <table>
                    <tr>
                      <th>DBMS</th>
                      <th>RDBMS</th>
                    </tr>
                    <tr>
                      <td>Inside DBMS number of types</td>
                      <td>RDBMS is a type of database which come inside DBMS</td>
                    </tr>
                    <tr>
                      <td>DBMS applications store data as file.</td>
                      <td>RDBMS applications state data in a tabular form.</td>
                    </tr>
                    <tr>
                      <td>Normalization is not present</td>
                      <td>Normalization is present</td>
                    </tr>
                    <tr>
                      <td>DBMS does not apply any security with regards to data manipulatation.</td>
                      <td>RDBMS defines the integrity constraints for the purpose of ACID.</td>
                    </tr>
                    <tr>
                      <td>DBMS uses file system to store data, so there will be no relation b/w the tables.</td>
                      <td>Data values are stored in the form of tables, So there is a relationship b/w the tables.</td>
                    </tr>
                    <tr>
                      <td>DBMS does not support distributed database.</td>
                      <td>Supports distributed database.</td>
                    </tr>
                    <tr>
                      <td><b>Ex. </b>Xml </td>
                      <td><b>Ex. </b>mySql, Oracle</td>
                    </tr>
                  </table>
                  <br/>

                  <h3>3. Data integrity</h3>
                  Is having correct and accurate data in our database. 
                  <br/>
                  <br/>
                  <b>Types of Data integrity: </b>
                  <br/>
                  <ul>
                    <li><b>Domain integrity: </b>Domain it enforces valid entries for a given column by restricting type, format or range of values.</li>
                    <li><b>Entity integrity: </b>Specifies there should be no duplicate rows in a tables.</li>
                    <li><b>Referential integrity: </b>Specifies that rows can't be deleted, which are used by other records.</li>
                    <li><b>User-Defined integrity: </b>It enforces some specific business rules that are defined by users.</li>
                  </ul>

                  <div style={titles}>
                    <PrismCode
                      code={dataintegrity}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                  <br/>

                  <h3>4. Database Language</h3>
                  <b>Type of DB Language: </b>
                  <ul>
                    <li><b>DDL: </b>Data Definition Language</li>
                    <li><b>DCL: </b>Data Control Language</li>
                    <li><b>DML: </b>Data MAnipulation Language</li>
                    <li><b>TCL: </b>Transaction Control Language</li>
                  </ul>
                  <br/>
                  <b>DDL :</b>
                  <ul>
                    <li>Used to create schema, table, indexes, constraints etc. in the database.</li>
                    <li>Can create the skeleton of the database.</li>
                    <li>USed to store the information of metadata like number of tables and schemas, their names, indexes, columns 
                      in each table, constraints, etc.</li>
                    <br/>
                    <ul>
                      <li><b>Create: </b>USed to create objects in the db.</li>
                      <li><b>Alter: </b>USed to alter the structure of db.</li>
                      <li><b>Drop: </b>Used to delete objects from database.</li>
                      <li><b>Truncate: </b>Used to remove all records from a table.</li>
                      <li><b>Remane: </b>Used to rename an object.</li>
                      <li><b>Comment: </b> Used to comment on the data dictionary.</li>
                    </ul>
                  </ul>
                  <br/>

                  <b>DML :</b>USed for accessing and manipulating data in a db. It handles user requests.
                  <ul>
                    <li><b>Select: </b>Used to retrieve data from a db.</li>
                    <li><b>Insert: </b>Used to insert data into table.</li>
                    <li><b>Update: </b>Used to update existing data within a table.</li>
                    <li><b>Delete: </b>Used to delete all records from a table.</li>
                    <li><b>Merge: </b>It perform UPSERT operation i.e. insert or update operations.</li>
                    <li><b>Call: </b>Used to call a structured query language or a java subprogram.</li>
                    <li><b>Explain Plan: </b>It has the parameter of explaining data.</li>
                    <li><b>Lock Table: </b>It controls concurrency.</li>
                  </ul>
                  <br/>

                  <b>DCL :</b>Used to retrieve the stored or save data. The DCL execution is Transactional. It also has rollback parameters.
                  <ul>
                    <li><b>Grant: </b>Used to give user access privileges to a db.</li>
                    <li><b>Revoke: </b>Used to take back permissions from the user.</li>
                  </ul>
                  <br/>

                  <b>TCL :</b>Used to run the changes mage by the DML statement. TCL can be grouped into a logical Transaction.
                  <ul>
                    <li><b>Commit: </b>Used to save the Transaction on the db.</li>
                    <li><b>Rollback: </b>Used to restore the db to original since the last Commit.</li>
                  </ul>
                  <br/>

                  <h3>Deadlock in DBMS</h3>
                  A deadlock is a condition where two/more Transaction are waiting indefinitely for one another to give up locks.
                  <br/>
                  <br/>
                  <b>Deadlock Avoidance: </b>
                  <ul>
                    <li>When a deadlock is stuck, then it's better to avoid the db rather than aborting or restarting the db. This 
                      is a waste of time and resource.</li>
                    <li>Deadlock avoidance mechanism is used to detect any deadlock situation in advance. But, fpr large db deadlock 
                      prevention method can be used.</li>
                  </ul>
                  <br/>

                  <h3>Normalization</h3>
                  <b>1Nf, 2NF, 3NF, BCNF</b>
                  <br/>
                  <ul>
                    <li>Normalization is the process of organizing the data in the database.</li>
                    <li>Normalization is used to minimize the redundancy from a relation or set of relations. It is also used to 
                      eliminate undesirable characteristics like Insertion, Update, and Deletion Anomalies.</li>
                    <li>Normalization divides the larger table into smaller and links them using relationships.</li>
                  </ul>
                  <br/>

                  <h3>Why do we need Normalization?</h3>
                  The main reason for normalizing the relations is removing these anomalies. Failure to eliminate anomalies leads 
                  to data redundancy and can cause data integrity and other problems as the database grows.
                  <ul>
                    <li><b>1NF: </b>A relation is in 1NF if it contains an atomic value.</li>
                    <li><b>2NF: </b>A relation will be in 2NF if it is in 1NF and all non-key attributes are fully functional 
                    dependent on the primary key.</li>
                    <li><b>3NF: </b>A relation will be in 3NF if it is in 2NF and no transition dependency exists.</li>
                    <li><b>BCNF: </b>A stronger definition of 3NF is known as Boyce Codd's normal form.</li>
                    <li><b>4NF: </b>A relation will be in 4NF if it is in Boyce Codd's normal form and has no multi-valued dependency.</li>
                    <li><b>5NF: </b>A relation is in 5NF. If it is in 4NF and does not contain any join dependency, joining should be lossless.</li>
                  </ul>
                  <br/>
                  <br/>

                  <b>Advantages of Normalization:</b>
                  <ul>
                    <li>Normalization helps to minimize data redundancy.</li>
                    <li>Greater overall database organization.</li>
                    <li>Data consistency within the database.</li>
                    <li>Much more flexible database design.</li>
                  </ul>

                  <br/>
                  <br/>

                  <b>Disadvantages of Normalization:</b>
                  <ul>
                    <li>Cannot start building the database before knowing what the user needs.</li>
                    <li>The performance degrades when normalizing the relations to higher normal forms, i.e., 4NF, 5NF.</li>
                    <li>It is very time-consuming and difficult to normalize relations of a higher degree.</li>
                    <li>Careless decomposition may lead to a bad database design, leading to serious problems.</li>
                  </ul>

                  <h3>SQL Aliases</h3>
                    <ul>
                      <li>SQL aliases are used to give a table, or a column in a table, a temporary name.</li>
                      <li>Aliases are often used to make column names more readable.</li>
                      <li>An alias is created with the AS keyword.</li>
                    </ul>
                    <div style={titles}>
                    <PrismCode
                      code={Aliases}
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
