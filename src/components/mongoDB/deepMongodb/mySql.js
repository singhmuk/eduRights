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

const DATABASE = `
show databases;
show tables;

DROP DATABASE Persons;
DROP TABLE Persons;
DROP TABLE IF EXISTS Persons;

CREATE DATABASE Persons;
use Persons;

CREATE TABLE Users (
    ID int NOT NULL AUTO_INCREMENT,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255),
    Address varchar(255),
    City varchar(255) DEFAULT 'Sandnes',
    OrderDate datetime default CURRENT_TIMESTAMP,
    Age int,
    CHECK (Age>=18),
    UNIQUE (ID),
    PRIMARY KEY (ID)
);

select * from Users;
INSERT INTO Users (FirstName, LastName, Address, City, OrderDate, Age) 
VALUES ('Ritesh', 'Singh', 'Skagen21', 'Stavanger', '2008-11-11', 20);

//insert multiple
INSERT INTO City ('id', 'name', 'Percentage') VALUES (1, 'Archer', 6),
(2, 'Lana', 5),
(3, 'Cheryl', 4),
(4, 'Mallory', 3),
(5, 'Krieger', 2),
(6, 'Barry', 1);


Update Users set FirstName='Rakesh' where ID=1;
DELETE FROM Users where ID=1;

CREATE TABLE newUsers AS SELECT FirstName, Address FROM Users;
`.trim();

const inserts = `
CREATE TABLE TestTable AS
SELECT customername, contactname FROM customers(existing_table_name);
`.trim();

const notNull = `
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    Age int
);
`.trim();

const unique = `
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int,
  UNIQUE (ID)
);

To define a UNIQUE constraint on multiple columns.
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    Age int,
CONSTRAINT UC_Person UNIQUE (ID,LastName));
`.trim();

const primary = `
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int,
  PRIMARY KEY (ID)
);


To allow naming of a PRIMARY KEY constraint, and for defining a PRIMARY KEY constraint on multiple columns.
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    CONSTRAINT PK_Person PRIMARY KEY (ID,LastName)
);
`.trim();

const foreign = `
CREATE TABLE Orders (
  OrderID int NOT NULL,
  OrderNumber int NOT NULL,
  PersonID int,
  PRIMARY KEY (OrderID),
  FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);


To allow naming of a FOREIGN KEY constraint, and for defining a FOREIGN KEY constraint on multiple columns.
CREATE TABLE Orders (
  OrderID int NOT NULL,
  OrderNumber int NOT NULL,
  PersonID int,
  PRIMARY KEY (OrderID),
  CONSTRAINT FK_PersonOrder FOREIGN KEY (PersonID)
  REFERENCES Persons(PersonID)
);
`.trim();

const check = `
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int,
  CHECK (Age>=18)
);


To allow naming of a CHECK constraint, and for defining a CHECK constraint on multiple columns.
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int,
  City varchar(255),
  CONSTRAINT CHK_Person CHECK (Age>=18 AND City='Sandnes')
);
`.trim();

const defaults = `
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int,
  City varchar(255) DEFAULT 'Sandnes'
);


The DEFAULT constraint can also be used to insert system values, by using functions like CURRENT_DATE():
CREATE TABLE Orders (
  ID int NOT NULL,
  OrderNumber int NOT NULL,
  OrderDate date DEFAULT CURRENT_DATE()
);
`.trim();

const autoIncre = `
CREATE TABLE Persons (
  Personid int NOT NULL AUTO_INCREMENT,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int,
  PRIMARY KEY (Personid)
);


When we insert a new record into the "Persons" table, we do NOT have to specify a value for the "Personid" column 
(a unique value will be added automatically):
INSERT INTO Persons (FirstName,LastName) VALUES ('Lars','Monsen');
`.trim();

const views = `
CREATE VIEW [Brazil Customers] AS
SELECT CustomerName, ContactName
FROM Customers
WHERE Country = 'Brazil';

We can query the view above as follows:
SELECT * FROM [Brazil Customers];


The following SQL creates a view that selects every product in the "Products" table with a price higher than the 
average price:
CREATE VIEW [Products Above Average Price] AS
SELECT ProductName, Price FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products);

We can query the view above as follows:
SELECT * FROM [Products Above Average Price];
`.trim();

const updatingViews = `
CREATE OR REPLACE VIEW [Brazil Customers] AS
SELECT CustomerName, ContactName, City
FROM Customers WHERE Country = 'Brazil';
`.trim();

const cases = `
SELECT *, CASE WHEN Age<30 THEN 'Age is less than 30' WHEN Age > 30
      THEN 'Age is greater than 30'
      WHEN Age=10 THEN 'Age is equal to 10'
      ELSE 'somewrong'
      END AS result FROM Users;
`.trim();

const ifClouse = `
Select id, name, Percentage, if(Percentage >= 33, "Pass", "Fail") as Result from Student;

//CASE
Select id, name, Percentage, 
CASE 
    When Percentage >=80 and Percentage <= 100 Then "Merit"
    When Percentage >=60 and Percentage < 80 Then "1st Devision"
    When Percentage >=45 and Percentage < 60 Then "2nd Devision"
    When Percentage >=33 and Percentage < 45 Then "3rd Devision"
    When Percentage < 33 Then "Fail"
    Else "Not Correct %"
End as  Grade from Student;


//Multiple Updates
Update Student Set Percentage = (CASE id 
    When 3 then 39 
    When 4 then 70 
End)
`.trim();


class Mysql extends Component {
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
              <b>Database</b>
              <div style={titles}>
                <PrismCode
                  code={DATABASE}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <ul>
                <li><b>Set limit during select: </b>SELECT * FROM Users LIMIT 2;</li>
                <li><b>Sort table data in descending order: </b>SELECT * FROM Users ORDER BY id DESC;</li>
                <li><b>: </b>SELECT * FROM Users ORDER BY id ASC;</li>
                <li><b>Display last row data: </b>SELECT * FROM Users ORDER BY id DESC LIMIT 1;</li>
                <li><b>Add column data: </b>SELECT Sum(Age) FROM Admin;</li>
                <li><b>How to count column data: </b>SELECT COUNT(Age) FROM Admin;</li>
                <li><b>Count duplication data sorting: </b>SELECT COUNT(DISTINCT FirstName) FROM Users;</li>
                <li><b>IN: </b>SELECT * FROM Admin WHERE Age IN (20,30);</li>
                <li><b>LIKE: </b>SELECT * FROM Users WHERE FirstName LIKE 'm%';</li>
                <li><b>: </b>SELECT LastName, MIN(Age) from Admin;</li>
                <li><b>: </b>SELECT LastName, MAX(Age) from Admin;</li>
                <li><b>Combined each other: </b>SELECT CONCAT('FirstName','City','OrderDate') AS
                  permanent_address FROM Users;</li>
              </ul>
              <br />

              <h3>Create Table Using Another Table</h3>
              <ul>
                <li>The TRUNCATE TABLE delete the data inside a table, but not the table itself.</li>
                <ul><li>TRUNCATE TABLE table_name;</li></ul>
                <br />
                <li>Delete a row.</li>
                <ul><li>delete from test where age=10;</li></ul>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={inserts}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>ALTER TABLE Statement</h3>
              The ALTER TABLE statement is used to add, delete, or modify columns in an existing table.
              Also used to add and drop various constraints on an existing table.
              <br />
              <ul>
                <li>To add a column in a table.</li>
                <ul><li>ALTER TABLE Customers ADD Email varchar(255);</li></ul>
                <br />
                <li>To delete a column in a table.</li>
                <ul><li>ALTER TABLE Customers DROP COLUMN Email;</li></ul>
                <br />
                <li>To change the data type of a column in a table.</li>
                <ul><li>Alter table person modify column current year;</li></ul>
              </ul>
              <br />

              <h3>MySQL Constraints</h3>
              <p>SQL constraints are used to specify rules for data in a table.</p>
              <ul>
                <li>Constraints can be specified when the table is created with the CREATE TABLE statement, or after the table is created with
                  the ALTER TABLE statement.</li>
                <li>Constraints are used to limit the type of data that can go into a table. This ensures the accuracy and reliability of the data in
                  the table. If there is any violation between the constraint and the data action, the action is aborted.</li>
                <li>Constraints can be column level or table level. Column level constraints apply to a column, and table level constraints apply to
                  the whole table.</li>
              </ul>
              <br />
              <br />
              The following constraints are commonly used in SQL:
              <ul>
                <li><b>NOT NULL: </b>Ensures that a column cannot have a NULL value</li>
                <li><b>UNIQUE: </b>Ensures that all values in a column are different</li>
                <li><b>PRIMARY KEY: </b>A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table</li>
                <li><b>FOREIGN KEY: </b>Prevents actions that would destroy links between tables</li>
                <li><b>CHECK: </b>Ensures that the values in a column satisfies a specific condition</li>
                <li><b>DEFAULT: </b>Sets a default value for a column if no value is specified</li>
                <li><b>CREATE INDEX: </b>Used to create and retrieve data from the database very quickly.</li>
                <br />
                <li><b>NOT NULL: </b>By default, a column can hold NULL values.</li>
                <ul><li>ALTER TABLE person add column country varchar(32) not null;</li></ul>
              </ul>
              <br />
              <b>NOT NULL on CREATE TABLE</b>
              <div style={titles}>
                <PrismCode
                  code={notNull}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>UNIQUE </h3>
              <ul>
                <li>Both the UNIQUE and PRIMARY KEY constraints provide a guarantee for uniqueness for a column or set of columns.</li>
                <li>A PRIMARY KEY constraint automatically has a UNIQUE constraint.</li>
                <li>Can have many UNIQUE constraints per table, but only one PRIMARY KEY constraint per table.</li>
              </ul>
              <br />
              <ul>
                <li>To create a UNIQUE constraint on the "ID" column when the table is already created.</li>
                <ul><li>ALTER TABLE Persons ADD UNIQUE (ID);</li></ul>
                <br />
                <li>To name a UNIQUE constraint, and to define a UNIQUE constraint on multiple columns.</li>
                <ul><li>ALTER TABLE Persons ADD CONSTRAINT UC_Person UNIQUE (ID,LastName);</li></ul>
                <br />
                <li>DROP a UNIQUE Constraint</li>
                <ul><li>ALTER TABLE Persons DROP INDEX UC_Person;</li></ul>
              </ul>
              <br />
              <b>The following SQL creates a UNIQUE constraint on the "ID" column when the "Persons" table is created:</b>
              <div style={titles}>
                <PrismCode
                  code={unique}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>PRIMARY KEY Constraint</h3>
              <ul>
                <li>The PRIMARY KEY constraint uniquely identifies each record in a table.</li>
                <li>Primary keys must contain UNIQUE values, and cannot contain NULL values.</li>
                <li>A table can have only ONE primary key, this primary key can consist of single/ multiple columns (fields).</li>
              </ul>
              <br />
              <ul>
                <li>To create a PRIMARY KEY constraint on the "ID" column when the table is already created.</li>
                <ul><li>ALTER TABLE Persons ADD PRIMARY KEY (ID);</li></ul>
                <br />
                <li>To allow naming of a PRIMARY KEY constraint, and for defining a PRIMARY KEY constraint on multiple columns.</li>
                <ul><li>ALTER TABLE Persons ADD CONSTRAINT PK_Person PRIMARY KEY (ID,LastName);</li></ul>
                <br />
                <li>To drop a PRIMARY KEY constraint.</li>
                <ul><li>ALTER TABLE Persons DROP PRIMARY KEY;</li></ul>
                <br />
                <li><b>Note: </b>If use ALTER TABLE to add a primary key, the primary key column(s) must have been declared to not contain
                  NULL values (when the table was first created).</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={primary}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>In the example above there is only ONE PRIMARY KEY (PK_Person). However, the VALUE of the primary key is made up of
                TWO COLUMNS (ID + LastName).</i>
              <br />

              <h3>MySQL FOREIGN KEY Constraint</h3>
              <ul>
                <li>The FOREIGN KEY constraint is used to prevent actions that would destroy links between tables.</li>
                <li>A FOREIGN KEY is a field (or collection of fields) in one table, that refers to the PRIMARY KEY in another table.</li>
                <li>The table with the foreign key is called the child table, and the table with the primary key is called the referenced or parent table.</li>
                <li>Notice that the "PersonID" column in the "Orders" table points to the "PersonID" column in the "Persons" table.</li>
                <li>The "PersonID" column in the "Persons" table is the PRIMARY KEY in the "Persons" table.</li>
                <li>The "PersonID" column in the "Orders" table is a FOREIGN KEY in the "Orders" table.</li>
                <li>The FOREIGN KEY constraint prevents invalid data from being inserted into the foreign key column, because it has to be one of the values contained in the parent table.</li>
              </ul>
              <br />

              <ul>
                <li>To create a FOREIGN KEY constraint on the "PersonID" column when the "Orders" table is already created.
                  <br />
                  ALTER TABLE Orders</li>
                <ul><li>ADD FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);</li></ul>
                <br />
                <li>To allow naming of a FOREIGN KEY constraint, and for defining a FOREIGN KEY constraint on multiple columns.</li>
                <ul><li>ALTER TABLE Orders ADD CONSTRAINT FK_PersonOrder
                  FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);</li></ul>
                <br />
                <li>To drop a FOREIGN KEY constraint.</li>
                <ul><li>ALTER TABLE Orders DROP FOREIGN KEY FK_PersonOrder;</li></ul>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={foreign}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>MySQL CHECK Constraint</b>
              <ul>
                <li>The CHECK constraint is used to limit the value range that can be placed in a column.</li>
                <li>If you define a CHECK constraint on a column it will allow only certain values for this column.</li>
                <li>If you define a CHECK constraint on a table it can limit the values in certain columns based on values in other columns in the row.</li>
              </ul>
              <br />
              <ul>
                <li>To create a CHECK constraint on the "Age" column when the table is already created.</li>
                <ul><li>ALTER TABLE Persons ADD CHECK (Age gt= 18);</li></ul>
                <br />
                <li>To allow naming of a CHECK constraint, and for defining a CHECK constraint on multiple columns.</li>
                <ul><li>ALTER TABLE Persons ADD CONSTRAINT CHK_PersonAge CHECK (Age ge=18 AND City='Sandnes');</li></ul>
                <br />
                <li>To drop a CHECK constraint</li>
                <ul><li>ALTER TABLE Persons DROP CHECK CHK_PersonAge;</li></ul>
              </ul>
              <br />
              The following SQL creates a CHECK constraint on the "Age" column when the "Persons" table is created. The CHECK constraint ensures that the age of a person must be 18, or older:
              <br />
              <div style={titles}>
                <PrismCode
                  code={check}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>MySQL DEFAULT Constraint</h3>
              <ul>
                <li>The DEFAULT constraint is used to set a default value for a column.</li>
                <li>The default value will be added to all new records, if no other value is specified.</li>
              </ul>
              <br />
              <ul>
                <li>To create a DEFAULT constraint on the "City" column when the table is already created.</li>
                <ul><li>ALTER TABLE Persons ALTER City SET DEFAULT 'Sandnes';</li></ul>
                <br />
                <li>To drop a DEFAULT constraint.</li>
                <ul><li>ALTER TABLE Persons ALTER City DROP DEFAULT;</li></ul>
              </ul>
              <br />
              The following SQL sets a DEFAULT value for the "City" column when the "Persons" table is created:
              <br />
              <div style={titles}>
                <PrismCode
                  code={defaults}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>MySQL CREATE INDEX Statement</h3>
              <ul>
                <li>The CREATE INDEX statement is used to create indexes in tables.</li>
                <li>Indexes are used to retrieve data from the database more quickly than otherwise. The users cannot see the indexes, they are just used to speed up searches/ queries.</li>
                <li>Creates an index on a table. Duplicate values are allowed:</li>
                <ul>
                  <li>The SQL statement below creates an index named "idx_lastname" on the "LastName" column in the "Persons" table:</li>
                  <li>CREATE INDEX idx_lastname ON Persons (LastName);</li>
                </ul>
                <br />
                <li>Create an index on a combination of columns, you can list the column names within the parentheses, separated by commas:</li>
                <ul><li>CREATE INDEX idx_pname ON Persons (LastName, FirstName);</li></ul>
                <br />
                <li>The DROP INDEX statement is used to delete an index in a table.</li>
                <ul><li>ALTER TABLE table_name DROP INDEX index_name;</li></ul>
              </ul>
              <br />

              <h3>MySQL AUTO INCREMENT Field</h3>
              <ul>
                <li>Auto-increment allows a unique number to be generated automatically when a new record is inserted into a table.</li>
                <li>Often this is the primary key field that we would like to be created automatically every time a new record is inserted.</li>
                <li>MySQL uses the AUTO_INCREMENT keyword to perform an auto-increment feature.</li>
                <li>By default, the starting value for AUTO_INCREMENT is 1, and it will increment by 1 for each new record.</li>
                <br />
                <li>AUTO_INCREMENT sequence start with another value.</li>
                <ul><li>ALTER TABLE Persons AUTO_INCREMENT=100;</li></ul>
              </ul>
              <br />
              The following SQL statement defines the "Personid" column to be an auto-increment primary key field in the "Persons" table:
              <br />
              <div style={titles}>
                <PrismCode
                  code={autoIncre}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>MySQL Working With Dates</h3>
              As long as your data contains only the date portion, your queries will work as expected. However, if a time portion is involved, it gets more complicated.
              <br />
              <br />
              MySQL Date Data Types<br />
              MySQL comes with the following data types for storing a date or a date/ time value in the database:
              <br />
              <ul>
                <li><b>DATE: </b>format YYYY-MM-DD</li>
                <li><b>DATETIME: </b>YYYY-MM-DD HH:MI:SS</li>
                <li><b>TIMESTAMP: </b>YYYY-MM-DD HH:MI:SS</li>
                <li><b>YEAR: </b>YYYY or YY</li>
              </ul>
              <br />
              Note: The date data type are set for a column when you create a new table in your database!<br />
              Now we want to select the records with an OrderDate of "2008-11-11" from the table.<br />
              <b>SELECT * FROM Orders WHERE OrderDate='2008-11-11'</b>
              <br />

              <h3>MySQL CREATE VIEW Statement</h3>
              <ul>
                <li>A view is a virtual table based on the result-set of an SQL statement.</li>
                <li>A view contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database.</li>
                <li>Can add SQL statements and functions to a view and present the data as if the data were coming from one single table.</li>
                <li>A view is created with the CREATE VIEW statement.</li>
              </ul>
              <br />
              <br />
              <b>Following SQL creates a view that shows all customers from Brazil:</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={views}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>We can query the view above: <b>SELECT * FROM [Products Above Average Price];</b></i>
              <br />

              <h3>MySQL Updating a View</h3>
              <ul>
                <li>A view can be updated with the <b>CREATE OR REPLACE</b> VIEW statement.</li>
                <li>A view is deleted with the DROP VIEW statement.</li>
                <ul><li>DROP VIEW view_name;</li></ul>
              </ul>

              <br />
              The following SQL adds the "City" column to the "Brazil Customers" view:
              <br />
              <div style={titles}>
                <PrismCode
                  code={updatingViews}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Joins</h3>
              <ul>
                <li><b>INNER JOIN: </b>Return rows from both tables that satisfy the given condition.</li>
                <ul><li>SELECT Users.FirstName, Admin.LastName FROM Users ,Admin Where Users.id = Admin.id;</li></ul>
                <br />
                <li><b>Cross JOIN: </b>Gives us combinations of each row of first table with all records in second table.</li>
                <ul><li>SELECT * FROM `Admin` CROSS JOIN `Users`;</li></ul>
                <br />
                <li><b>Outer JOINs: </b>Return all records matching from both tables.</li>
                <ul>
                  <li><b>Left Join: </b>Select Users.FirstName from Users left JOIN Admin on Admin.id = Users.id;</li>
                  <li><b>Right Join: </b>Select Users.OrderDate, Users.FirstName from Users right JOIN Admin on Admin.id = Users.id;</li>
                </ul>
                <br />
                <li><b>ON clauses: </b>To match the records between table.</li>
                <ul><li>SELECT A.price , B.first_name FROM `orders` AS A LEFT JOIN `employees` AS B USING ( first_name )</li></ul>
                <br />
                <li><b>SELECT DISTINCT: </b>Return only distinct (different) values.</li>
                <ul><li>SELECT DISTINCT price from orders;</li></ul>
                <br />
                <li><b>Select distinct records on a join: </b></li>
                <ul><li>SELECT DISTINCT Users.FirstName, Users.City FROM Users JOIN Admin ON Users.id = Admin.id WHERE
                  Admin.LastName = 'singh' ORDER BY Admin.Age DESC;</li></ul>
                <br />
                <li><b>SELECT with DISTINCT on multiple columns: </b></li>
                <ul><li>SELECT distinct last_name, status FROM employees WHERE last_name='singh';</li>
                  <li>Sorted Data Using ‘Order By’ </li>
                  <ul><li>SELECT price, items FROM orders WHERE id = 2 ORDER BY qty;</li></ul>
                </ul>

                <br />
                <li>SELECT COUNT(id), Age FROM Admin WHERE id gt= 1 GROUP BY Age;</li>
                <br />
                <li><b>Query for Creating a View: </b></li>
                <ul><li>CREATE VIEW customers_data AS SELECT price, age FROM customers WHERE price =(or less than) 40;</li></ul>
                <br />
                <li>DROP VIEW customers_data;</li>
                <br />
                <li><b>Query to Display Primary Keys: </b></li>
                <ul><li>SHOW KEYS FROM customers WHERE Key_name = 'PRIMARY'</li></ul>
                <br />
                <li><b>Searching for SQL Tables with Wildcards: </b></li>
                <ul><li>SELECT * From Customers WHERE city LIKE 'us%';</li></ul>
                <br />
                <li><b>Between: </b></li>
                <ul><li>SELECT Name FROM customers WHERE price BETWEEN 234 AND 2434;</li></ul>
                <br />
                <li><b>Union: </b></li>
                <ul><li>SELECT phone FROM Customers UNION SELECT items FROM Orders</li></ul>
                <br />
                <li><b>Making Column Labels More Friendly: </b></li>
                <ul><li>SELECT city AS city_description FROM customers;</li></ul>
                <br />
                <li><b>Always and Everywhere!: </b></li>
                <ul><li>SELECT city FROM customers WHERE id = ALL (SELECT price FROM customers WHERE phone (greater than) 123456790);</li></ul>
                <br />
                <li><b>Query returns the age for each employee, along with total age of the employees by age: </b></li>
                <ul><li>SELECT age, salary, city, SUM(age) OVER (PARTITION BY age) FROM customers;</li></ul>
              </ul>
              <br />

              <h3>If Clouse</h3>
              <b>Student</b>
              <table>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Percentage</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Ram Kumar</td>
                  <td>57</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Salman Khan</td>
                  <td>28</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Meera Khan</td>
                  <td>81</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Sarita Kumari</td>
                  <td>45</td>
                </tr>
              </table>
              <br />

              <div style={titles}>
                <PrismCode
                  code={ifClouse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Output</b>
              <table>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Percentage</th>
                  <th>Result</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Ram Kumar</td>
                  <td>57</td>
                  <td>Pass</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Salman Khan</td>
                  <td>28</td>
                  <td>Fail</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Meera Khan</td>
                  <td>81</td>
                  <td>Pass</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Sarita Kumari</td>
                  <td>45</td>
                  <td>Pass</td>
                </tr>
              </table>
              <br />
              <br />

              <b>CASE</b>
              <div style={titles}>
                <PrismCode
                  code={cases}
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

export default (withStyles(styles)(Mysql));
