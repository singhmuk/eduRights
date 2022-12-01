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

const creates = `
DROP TABLE COMPANY;

CREATE TABLE COMPANY(
  ID INT PRIMARY KEY     NOT NULL,
  NAME           TEXT    NOT NULL,
  AGE            INT     NOT NULL,
  ADDRESS        CHAR(50),
  SALARY         REAL
);
INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)VALUES (1, 'Paul', 32, 'California', 20000.00 );
INSERT INTO COMPANY VALUES (7, 'James', 24, 'Houston', 10000.00 );


//2
CREATE TABLE monthly_savings (
  name text,
  saving_per_quarter integer ARRAY[4],
  scheme text[][]
);

INSERT INTO monthly_savings VALUES ('Manisha', '{20000, 14600, 23500, 13250}', '{{“FD”, “MF”}, {“FD”, “Property”}}'); 

SELECT name FROM monthly_savings WHERE saving_per_quarter[2] > saving_per_quarter[4];

UPDATE monthly_savings SET saving_per_quarter = '{25000,25000,27000,27000}' WHERE name = 'Manisha';
or 
UPDATE monthly_savings SET saving_per_quarter = ARRAY[25000,25000,27000,28000] WHERE name = 'Manisha';


Searching Arrays:
SELECT * FROM monthly_savings WHERE saving_per_quarter[1] = 10000 OR
saving_per_quarter[2] = 27000 OR
saving_per_quarter[3] = 27000 OR
saving_per_quarter[4] = 10000;

or 
SELECT * FROM monthly_savings WHERE 27000 = ANY (saving_per_quarter);
`.trim();

const schemas = `
create table myschema.company(                                                          //Syntax to Create Table in Schema
  ID   INT              NOT NULL,
  NAME VARCHAR (20)     NOT NULL,
  AGE  INT              NOT NULL,
  ADDRESS  CHAR (25),
  SALARY   DECIMAL (18, 2),
  PRIMARY KEY (ID)
);

select * from myschema.company;
DROP SCHEMA myschema;
`.trim();

const operators = `
select 2+3;
select 2*3;
select 10/5;
select 12%5;
select 2^3;
select |/ 25.0;
select ||/ 27.0;
`.trim();

const comparisons = `
SELECT * FROM COMPANY WHERE SALARY > 50000;
SELECT * FROM COMPANY WHERE SALARY >= 65000;

SELECT * FROM COMPANY WHERE SALARY != 20000;
SELECT * FROM COMPANY WHERE SALARY <> 20000;
`.trim();

const logicals = `
SELECT * FROM COMPANY WHERE AGE >= 25 AND SALARY >= 6500;
SELECT * FROM COMPANY WHERE AGE >= 25 OR SALARY >= 6500;
SELECT * FROM COMPANY WHERE SALARY IS NOT NULL;
`.trim();

const bitwise = `
select 60 | 13;
select 60 & 13;
select  (~60);
select  (60 << 2);
select  (60 >> 2);
select 60 # 13;
`.trim();

const likes = `
SELECT * FROM COMPANY LIMIT 4;

SELECT * FROM COMPANY ORDER BY AGE ASC;
SELECT * FROM COMPANY ORDER BY NAME, SALARY ASC;
SELECT * FROM COMPANY ORDER BY NAME DESC;
`.trim();

const groupby = `
WITH RECURSIVE t(n) AS (
  VALUES (0)
  UNION ALL
  SELECT SALARY FROM COMPANY WHERE SALARY < 20000
)
SELECT sum(n) FROM t;
`.trim();

const havingclouse = `
SELECT NAME FROM COMPANY GROUP BY name HAVING count(name) < 2;

SELECT DISTINCT name FROM COMPANY;
`.trim();

const constrants = `
CREATE TABLE COMPANY1(
  ID INT PRIMARY KEY     NOT NULL,
  NAME           TEXT    NOT NULL,
  AGE            INT     NOT NULL UNIQUE,
  ADDRESS        CHAR(50),
  SALARY         REAL    CHECK(SALARY > 0),
  EXCLUDE USING gist
  (NAME WITH =,   AGE WITH <>)
);
`.trim();

const joins = `
SELECT EMP_ID, NAME, DEPT FROM COMPANY CROSS JOIN DEPARTMENT;
SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
SELECT EMP_ID, NAME, DEPT FROM COMPANY RIGHT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
SELECT EMP_ID, NAME, DEPT FROM COMPANY FULL OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
`.trim();

const unions = `
SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID
  UNION
    SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
         
         
//2
SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID
  UNION ALL
    SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
`.trim();

const nullvalues = `
SELECT  ID, NAME, AGE, ADDRESS, SALARY FROM COMPANY WHERE SALARY IS NOT NULL;
`.trim();

const alias = `
SELECT C.ID, C.NAME, C.AGE, D.DEPT FROM COMPANY AS C, DEPARTMENT AS D WHERE  C.ID = D.EMP_ID;
`.trim();

const triggers = `
CREATE INDEX salary_index ON COMPANY (salary);
DROP INDEX salary_index;
`.trim();

const alters = `
ALTER TABLE COMPANY ADD GENDER char(1);
ALTER TABLE COMPANY DROP GENDER;

TRUNCATE TABLE COMPANY;
`.trim();

const functions = `
SELECT COUNT(*) FROM COMPANY ;
SELECT id, name, MAX(salary) FROM COMPANY GROUP BY id, name;
SELECT MIN(salary) FROM company;
SELECT AVG(SALARY) FROM COMPANY;
SELECT SUM(salary) FROM company;
SELECT ARRAY_AGG(SALARY) FROM COMPANY;							                                      //Array Function
`.trim();

const numerics = `
SELECT ABS(-2);
SELECT ACOS(1);
SELECT ASIN(1);
SELECT CEIL(-6.43);
SELECT CEILING(3.46);
SELECT DEGREES(PI());
SELECT EXP(3);
SELECT FLOOR(7.55);
SELECT GREATEST(3,5,1,8,33,99,34,55,67,43);
SELECT LEAST(3,5,1,8,33,99,34,55,67,43);
SELECT LOG(45);
SELECT MOD(29,3);
SELECT PI();
SELECT POWER(3,3);
SELECT RADIANS(90);
SELECT ROUND(5.693893);
SELECT SQRT(49);
`.trim();

const srings = `
SELECT ASCII('2');
SELECT ASCII('dx');
SELECT BIT_LENGTH('text');
SELECT CHAR_LENGTH('text');
SELECT CONCAT('My', 'S', 'QL');
SELECT CONCAT_WS(',','First name','Last Name' );
SELECT LEFT('foobarbar', 5);
SELECT LENGTH('text');
SELECT LOWER('QUADRATICALLY');
SELECT LPAD('hi',4,'??');
SELECT LTRIM('  barbar');
SELECT QUOTE_IDENT('Foo bar');
SELECT QUOTE_LITERAL(E'O\'Reilly');
SELECT QUOTE_LITERAL(42.5);
SELECT QUOTE_NULLABLE(42.5);
SELECT REGEXP_MATCHES('ABCDEF','A%C%%');
SELECT REGEXP_REPLACE('Thomas', '.[mN]a.', 'M');
SELECT REGEXP_SPLIT_TO_ARRAY('hello Hi', E'\\s+');
SELECT REGEXP_SPLIT_TO_TABLE('hello ABCDEF', E'\\s+');
SELECT REPEAT('SQL', 3);
SELECT REPLACE('www.mysql.com', 'w', 'Ww');
SELECT REVERSE('abcd');
SELECT RIGHT('foobarbar', 4);
SELECT RPAD('hi',5,'?');
SELECT RTRIM('barbar   ');
SELECT SUBSTRING('Quadratically',5,6);
SELECT TRIM('  bar   ');
SELECT UPPER('manisha');
`.trim();


class PostgresSQL extends Component {
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
              <b>create Table</b>
              <div style={titles}>
                <PrismCode
                  code={creates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>PostgeSQL</h3>
              It's a powerfull, open-source object-relational database management system (ORDBMS).
              Used to store data securly.
              <br />
              <b>Features:</b>
              <ul>
                <li>It runs on all major os like - Linux, Unix, Windows.</li>
                <li>It support a lot of features of sql like - complex sql queries, foreign key, triggers, views, transations and concurrency etc.</li>
                <li>In postgresql table can be set to inherit their characteristics from parent table.</li>
                <li>Can install several extensions to add additional functionality to postgresql.</li>
                <li>PostgreSQL supports a wide set of Data Types. Besides, users can create their own custom data type using CREATE TYPE SQL command.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={creates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Schema</h3>
              <ul>
                <li>A schema is a named collection of tables. A schema can also contain views, indexes, sequences, data types, operators, and functions.</li>
                <li><b>create schema myschema</b></li>
                <li><b>DROP SCHEMA myschema CASCADE: </b>To drop a schema including all contained objects.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={schemas}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>Advantages of using a Schema:</b>
              <br />
              <ul>
                <li>1. It allows many users to use one database without interfering with each other.</li>
                <li>2. It organizes database objects into logical groups to make them more manageable.</li>
                <li>3. Third-party applications can be put into separate schemas so they do not collide with the names of other objects.</li>
              </ul>
              <br />

              <h3>What is an Operator in PostgreSQL?</h3>
              <ul>
                <li>An operator is a reserved word or a character used primarily in a PostgreSQL statement's WHERE clause to perform operation(s), such as comparisons and arithmetic operations.</li>
                <li>Operators are used to specify conditions in a PostgreSQL statement and to serve as conjunctions for multiple conditions in a statement.</li>
                <ul>
                  <li><b>Arithmetic operators</b></li>
                  <li><b>Comparison operators</b></li>
                  <li><b>Logical operators</b></li>
                  <li><b>Bitwise operators</b></li>
                </ul>
              </ul>
              <br />

              <h3>Arithmetic Operators:</h3>
              <div style={titles}>
                <PrismCode
                  code={operators}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Comparison Operators:</h3>
              <div style={titles}>
                <PrismCode
                  code={comparisons}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Logical Operators: </h3>
              <div style={titles}>
                <PrismCode
                  code={logicals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Bit String Operators:</h3>
              <div style={titles}>
                <PrismCode
                  code={bitwise}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Date Expressions</h3>
              <ul>
                <li>Return the current system date and time values.</li>
                <li><b>SELECT CURRENT_TIMESTAMP;</b></li>
              </ul>
              <br />

              <h3>LIKE Operator</h3>
              Used to match text values against a pattern using wildcards. There are two wildcards used in conjunction with the LIKE operator.
              <ul>
                <li>%</li>
                <li>_</li>
              </ul>
              <br />
              <ul>
                <li><b>AGE starts with 2: </b>SELECT * FROM COMPANY WHERE AGE::text LIKE '2%';</li>
                <li><b>200 in any position: </b>SELECT * FROM COMPANY WHERE Salary::text LIKE '%200%';</li>
                <li><b>ADDRESS have a hyphen (-) inside the text: </b>SELECT * FROM COMPANY WHERE ADDRESS  LIKE '%-%';</li>
                <li><b>00 in the second and third positions: </b>SELECT * FROM COMPANY WHERE Salary::text LIKE '%_00%';</li>
                <li><b>Start with 2 and are at least 3 characters in length: </b>SELECT * FROM COMPANY WHERE Salary::text LIKE '%2_%_%';</li>
                <li><b>End with 2: </b>SELECT * FROM COMPANY WHERE AGE::text LIKE '%2';</li>
                <li><b>5 in the second position and end with a 0: </b>SELECT * FROM COMPANY WHERE Salary::text LIKE '_5%0';</li>
                <li><b>Five-digit number that start with 6 and end with 0: </b>SELECT * FROM COMPANY WHERE Salary::text LIKE '6___0';</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={likes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Group By</h3>
              Used in collaboration with the SELECT statement to group together those rows in a table that have identical data. This is done to eliminate redundancy in the output and/or compute aggregates that apply to these groups.
              <ul>
                <li><b>SELECT NAME, SUM(SALARY) FROM COMPANY GROUP BY NAME;</b></li>
                <li><b>SELECT NAME, SUM(SALARY) FROM COMPANY GROUP BY NAME ORDER BY NAME;</b></li>
                <li><b>SELECT NAME, SUM(SALARY) FROM COMPANY GROUP BY NAME ORDER BY NAME DESC;</b></li>
              </ul>
              <br />

              <h3>WITH Clause</h3>
              <ul>
                <li>WITH query provides a way to write auxiliary statements for use in a larger query. It helps in breaking down complicated and large queries into simpler forms, which are easily readable. These statements often referred to as Common Table Expressions or CTEs, can be thought of as defining temporary tables that exist just for one query.</li>
                <li><b>With CTE AS (Select ID, NAME, AGE, ADDRESS, SALARY FROM COMPANY ) Select * From CTE;</b></li>
              </ul>
              <br />
              <b>Write a query using the RECURSIVE keyword along with the WITH clause, to find the sum of the salaries less than 20000.</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={groupby}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>HAVING Clause:</h3>
              <ul>
                <li>clause allows us to pick out particular rows where the function's result meets some condition.</li>
                <li>The WHERE clause places conditions on the selected columns, whereas the HAVING clause places conditions on groups created by the GROUP BY clause.</li>
                <ul>
                  <li><b>Ex. </b>Display record for which the name count is less than 2.</li>
                </ul>
              </ul>
              <b>DISTINCT Keyword: Used in conjunction with SELECT statement to eliminate all the duplicate records and fetching only unique records.</b>
              <div style={titles}>
                <PrismCode
                  code={havingclouse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>CONSTRAINTS</h3>
              <ul>
                <li>Constraints are the rules enforced on data columns on table. These are used to prevent invalid data from being entered into the database. This ensures the accuracy and reliability of the data in the database.</li>
                <li>Constraints could be column level or table level.</li>
                <li><b>Ex. </b>NOT NULL, UNIQUE, PRIMARY Key , FOREIGN Key, CHECK Constraint (ensures that all values in a column satisfy certain conditions), EXCLUSION Constraint (ensures that if any two rows are compared on the specified column(s) or expression(s) using the specified operator(s), not all of these comparisons will return TRUE).</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={constrants}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>JOINS</h3>
              Used to combine records from two or more tables in a database.
              <ul>
                <li><b>CROSS JOIN: </b>A CROSS JOIN matches every row of the first table with every row of the second table.</li>
                <li><b>INNER JOIN: </b>creates a new result table by combining column values of two tables (table1 and table2) based upon the join-predicate. The query compares each row of table1 with each row of table2 to find all pairs of rows, which satisfy the join-predicate. When the join-predicate is satisfied, column values for each matched pair of rows of table1 and table2 are combined into a result row.</li>
                <br />
                <li><b>LEFT OUTER JOIN: </b>In case of LEFT OUTER JOIN, an inner join is performed first. Then, for each row in table T1 that does not satisfy the join condition with any row in table T2, a joined row is added with null values in columns of T2. Thus, the joined table always has at least one row for each row in T1.</li>
                <br />
                <li><b>RIGHT OUTER JOIN: </b>This is the converse of a left join</li>
                <li><b>FULL OUTER JOIN: </b>First, an inner join is performed. Then, for each row in table T1 that does not satisfy the join condition with any row in table T2, a joined row is added with null values in columns of T2. In addition, for each row of T2 that does not satisfy the join condition with any row in T1, a joined row with null values in the columns of T1 is added.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={joins}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>UNIONS Clause</h3>
              <ul>
                <li><b>UNIONS: </b>Used to combine the results of two or more SELECT statements without returning any duplicate rows.</li>
                <li><b>UNION ALL: </b>Operator is used to combine the results of two SELECT statements including duplicate rows.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={unions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>NULL Values</h3>
              A NULL value in a table is a value in a field that appears to be blank.
              <div style={titles}>
                <PrismCode
                  code={nullvalues}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>ALIAS Syntax</h3>
              You can rename a table or a column temporarily by giving another name, which is known as ALIAS.
              <div style={titles}>
                <PrismCode
                  code={alias}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>TRIGGERS</h3>
              <ul>
                <li>Triggers are database callback functions, which are automatically performed/invoked when a specified database event occurs.</li>
                <li><b>PostgreSQL trigger can be specified to fire</b></li>
                <ul>
                  <li>1.Before the operation is attempted on a row (before constraints are checked and the INSERT, UPDATE or DELETE is attempted).</li>
                  <li>2.After the operation has completed (after constraints are checked and the INSERT, UPDATE, or DELETE has completed).</li>
                  <li>3.Instead of the operation (in the case of inserts, updates or deletes on a view).</li>
                </ul>
                <br />
                <li>A trigger that is marked FOR EACH ROW is called once for every row that the operation modifies. In contrast, a trigger that is marked FOR EACH STATEMENT only executes once for any given operation, regardless of how many rows it modifies.</li>
                <li>Both, the WHEN clause and the trigger actions, may access elements of the row being inserted, deleted or updated using references of the form NEW.column-name and OLD.column-name, where column-name is the name of a column from the table that the trigger is associated with.</li>
                <li>If a WHEN clause is supplied, the PostgreSQL statements specified are only executed for rows for which the WHEN clause is true. If no WHEN clause is supplied, the PostgreSQL statements are executed for all rows.</li>
                <li>If multiple triggers of the same kind are defined for the same event, they will be fired in alphabetical order by name.</li>
                <li>The BEFORE, AFTER or INSTEAD OF keyword determines when the trigger actions will be executed relative to the insertion, modification or removal of the associated row.</li>
                <li>Triggers are automatically dropped when the table that they are associated with is dropped.</li>
                <li>The table to be modified must exist in the same database as the table or view to which the trigger is attached and one must use just tablename, not database.tablename.</li>
                <li>A CONSTRAINT option when specified creates a constraint trigger. This is the same as a regular trigger except that the timing of the trigger firing can be adjusted using SET CONSTRAINTS. Constraint triggers are expected to raise an exception when the constraints they implement are violated.</li>
              </ul>
              <br />

              <h3>INDEXES</h3>
              Indexes are special lookup tables that the database search engine can use to speed up data retrieval.
              <div style={titles}>
                <PrismCode
                  code={triggers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              When Should Indexes be Avoided?
              <ul>
                <li>Indexes should not be used on small tables.</li>
                <li>Tables that have frequent, large batch update or insert operations.</li>
                <li>Indexes should not be used on columns that contain a high number of NULL values.</li>
                <li>Columns that are frequently manipulated should not be indexed.</li>
              </ul>
              <br />

              <h3>ALTER TABLE</h3>
              <ul>
                <li>Used to add, delete or modify columns in an existing table.</li>
                <li><b>TRUNCATE TABLE: </b>Used to delete complete data from an existing table.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={alters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Functions</h3>
              <div style={titles}>
                <PrismCode
                  code={functions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Numeric Function</h3>
              <ul>
                <li><b>ABS(): </b>Returns the absolute value of numeric expression.</li>
                <li><b>ACOS(): </b>Returns the arccosine of numeric expression. Returns NULL if the value is not in the range -1 to 1.</li>
                <li><b>ASIN(): </b>Returns the arcsine of numeric expression. Returns NULL if value is not in the range -1 to 1.</li>
                <li><b>CEIL(): </b>Returns the smallest integer value that is not less than passed numeric expression.</li>
                <li><b>CEILING(): </b>Returns the smallest integer value that is not less than passed numeric expression.</li>
                <li><b>DEGREES(): </b>Returns numeric expression converted from radians to degrees.</li>
                <li><b>EXP(): </b>Returns the base of the natural logarithm (e) raised to the power of passed numeric expression.</li>
                <li><b>FLOOR(): </b>Returns the largest integer value that is not greater than passed numeric expression.</li>
                <li><b>GREATEST(): </b>Returns the largest value of the input expressions.</li>
                <li><b>LEAST(): </b>Returns the minimum-valued input when given two or more.</li>
                <li><b>LOG(): </b>Returns the natural logarithm of the passed numeric expression.</li>
                <li><b>MOD(): </b>Returns the remainder of one expression by diving by another expression.</li>
                <li><b>PI(): </b>Returns the value of pi.</li>
                <li><b>POW(): </b>Returns the value of one expression raised to the power of another expression.</li>
                <li><b>POWER(): </b>Returns the value of one expression raised to the power of another expression.</li>
                <li><b>RADIANS(): </b>Returns the value of passed expression converted from degrees to radians.</li>
                <li><b>ROUND(): </b>Returns numeric expression rounded to an integer. Can be used to round an expression to a number of decimal points.</li>
                <li><b>SQRT(): </b>Returns the non-negative square root of numeric expression.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={numerics}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>String Function</h3>
              <ul>
                <li><b>ASCII(): </b>Returns numeric value of left-most character.</li>
                <li><b>BIT_LENGTH(): </b>Returns length of argument in bits.</li>
                <li><b>CHAR_LENGTH(): </b>Returns number of characters in argument.</li>
                <li><b>CHARACTER_LENGTH(): </b>A synonym for CHAR_LENGTH().</li>
                <li><b>CONCAT_WS(): </b>Returns concatenate with separator.</li>
                <li><b>CONCAT(): </b>Returns concatenated string.</li>
                <li><b>LCASE(): </b>Synonym for LOWER().</li>
                <li><b>LEFT(): </b>Returns the leftmost number of characters as specified.</li>
                <li><b>LENGTH(): </b>Returns the length of a string in bytes.</li>
                <li><b>LOWER(): </b>Returns the argument in lowercase.</li>
                <li><b>LPAD(): </b>Returns the string argument, left-padded with the specified string.</li>
                <li><b>LTRIM(): </b>Removes leading spaces.</li>
                <li><b>MID(): </b>Returns a substring starting from the specified position.</li>
                <li><b>POSITION(): </b>A synonym for LOCATE().</li>
                <li><b>QUOTE(): </b>Escapes the argument for use in an SQL statement.</li>
                <li><b>REGEXP(): </b>Pattern matching using regular expressions.</li>
                <li><b>REPEAT(): </b>Repeats a string the specified number of times.</li>
                <li><b>REPLACE(): </b>Replaces occurrences of a specified string.</li>
                <li><b>REVERSE(): </b>Reverse the characters in a string.</li>
                <li><b>RIGHT(): </b>Returns the specified rightmost number of characters.</li>
                <li><b>RPAD(): </b>Appends string the specified number of times.</li>
                <li><b>RTRIM(): </b>Removes trailing spaces.</li>
                <li><b>SUBSTRING(), SUBSTR(): </b>Returns the substring as specified.</li>
                <li><b>TRIM(): </b>Removes leading and trailing spaces.</li>
                <li><b>UCASE(): </b>Synonym for UPPER().</li>
                <li><b>UPPER(): </b>Converts to uppercase.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={srings}
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

export default (withStyles(styles)(PostgresSQL));
