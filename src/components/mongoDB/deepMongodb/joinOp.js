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


const joinModel = `
var dbConn = require('../config/db');

var Order = function (orders) {
  this.items = orders.items;
  this.price = orders.price;
  this.qty = orders.qty;
  this.created_at = orders.created_at;
  this.updated_at = orders.updated_at;
};

//join 2 tables
Order.findAll = (result) => {
  dbConn.query("select orders.id, orders.items from Orders JOIN products on products.id = Orders.id", function (err, res) {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//SELECT DISTINCT
Order.findAll = function (result) {
  dbConn.query("Select DISTINCT items from orders", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//WHERE Clause
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items='One'", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//AND
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items='One' AND price='100'", function (err, res) {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//OR
Order.findAll = (result) => {
  dbConn.query("Select * DISTINCT items from orders WHERE items='One' OR price='100'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//NOT
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE NOT items='One'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//ORDER BY Keyword
Order.findAll = (result) => {
  dbConn.query("Select * from orders ORDER BY items", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//ORDER BY DESC Keyword
Order.findAll = (result) => {
  dbConn.query("Select * from orders ORDER BY items ASC, price DESC", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//IS NULL
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items IS NULL", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//IS NOT NULL
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items IS NOT NULL", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//LIMIT
Order.findAll = (result) => {
  dbConn.query("Select * from orders LIMIT 3", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//MIN() 
Order.findAll = (result) => {
  dbConn.query("Select MIN(price) AS SmallestPrice from orders", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//MAX()
Order.findAll = (result) => {
  dbConn.query("Select MAX(price) AS LargestPrice from orders", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//COUNT()
Order.findAll = (result) => {
  dbConn.query("Select COUNT(items) from orders", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//AVG()
Order.findAll = (result) => {
  dbConn.query("Select AVG(items) from orders", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//SUM()
Order.findAll = (result) => {
  dbConn.query("Select SUM(qty) from orders", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//LIKE
//The following SQL statement selects all customers with a CustomerName starting with "a"
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE 'a%'", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//The following SQL statement selects all customers with a CustomerName ending with "a"
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE '%a'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//The following SQL statement selects all customers with a CustomerName that have "or" in any position
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE '%On%'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//The following SQL statement selects all customers with a CustomerName that have "r" in the second position
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE '_r%'", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//The following SQL statement selects all customers with a CustomerName that starts with "a" and are at least 3 characters in length:
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE 'a__%'", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//The following SQL statement selects all customers with a ContactName that starts with "a" and ends with "o"
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE 'a%o'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//The following SQL statement selects all customers with a CustomerName that does NOT start with "a"
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE 'a%'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};


//Wildcards: A wildcard character is used to substitute one or more characters in a string
//Wildcard characters are used with the LIKE operator. The LIKE operator is used in a WHERE clause to search for a specified pattern in a column
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE '%se%'", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//The following SQL statement selects all customers with a City starting with any character, followed by "ondon"
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE '_ondon'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//The following SQL statement selects all customers with a City starting with "L", followed by any character, followed by "n", followed by any character, followed by "on"
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE 'L_n_on'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//he following SQL statement selects all customers with a City starting with "b", "s", or "p"
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE '[bsp]%'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//selects all customers with a City starting with "a", "b", or "c"
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items LIKE '[a-c]%'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//select all customers with a City NOT starting with "b", "s", or "p"
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items NOT LIKE '[bsp]%'", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//IN operator allows you to specify multiple values in a WHERE clause
//IN operator is a shorthand for multiple OR conditions.
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items IN ('One', 'Two', 'Three')", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//BETWEEN operator selects values within a given range. The values can be numbers, text, or dates.
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE price BETWEEN 10 AND 20", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//NOT BETWEEN
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE price NOT BETWEEN 10 AND 20", (err, res) => {
    if (err)
        result(null, err);
      result(null, res);
  });
};

//BETWEEN with IN
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE price BETWEEN 10 AND 20 AND ID NOT IN (1,2,3)", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//BETWEEN Text
Order.findAll = (result) => {
  dbConn.query("Select * from orders WHERE items BETWEEN 'Seconds' AND 'Three' ORDER BY items", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//INNER JOIN
/*
The INNER JOIN keyword selects all rows from both tables as long as there is a match between the 
columns. If there are records in the "Orders" table that do not have matches in "Customers", 
these orders will not be shown!
*/
Order.findAll = (result) => {
  dbConn.query("select orders.id, products.items from Orders INNER JOIN products on orders.id = products.id", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//LEFT JOIN
//returns all records from the left table (table1), and the matching records from the right table (table2).
Order.findAll = (result) => {
  dbConn.query("select orders.id, products.items from Orders LEFT JOIN products on orders.id = products.id", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};

//RIGHT JOIN
//returns all records from the right table (table2), and the matching records from the left table (table1). 
Order.findAll = (result) => {
  dbConn.query("select orders.id, products.title from orders RIGHT JOIN products on orders.id = products.id", (err, res) => {
    if (err) 
        result(null, err);
      result(null, res);
  });
};`.trim();

const joinConrollers = `
router.findAll = (req, res) => {
  JoinOp.findAll((err, product) => {
    if (err)
      res.send(err);
    res.send(product);
  });
};

router.findById = (req, res) => {
  JoinOp.findById(req.params.id, (err, employee) => {
    if (err)
      res.send(err);
    res.json(employee);
  });
};`.trim();

const joinRoutes = `
const joinOpController = require('../controllers/joinOp');

router.get('/', joinOpController.findAll);
router.get('/:id', joinOpController.findById);`.trim();

const bodyData = `
router.post('/', (req,res)=>{
    console.log(req.body)
    res.send(req.body)
  })

router.get('/', (req,res)=>{
    res.send(req.body)
  })`.trim();

const bcryptjs = `
const express = require("express");
const app = express();
const cors = require("cors");

const session = require("express-session");
const bcrypt = require("bcryptjs");
var dbConn = require('../config/db');

const saltRounds = 10;


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    dbConn.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  dbConn.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});


module.exports = app;`.trim();


class JoinOp extends Component {
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
              <h3>Join</h3>
              <b>models/joinOp</b>
              <div style={titles}>
                <PrismCode
                  code={joinModel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllers/joinOp</b>
              <div style={titles}>
                <PrismCode
                  code={joinConrollers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/joinOp</b>
              <div style={titles}>
                <PrismCode
                  code={joinRoutes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>pass data in body</b><br/>
              We'll also send data in request inside body. Data pass in body is hidden, we can't see in url. In 
signUp form we will send data in body. We used generaly Post() for passing data in body, Post request 
last part is body.
              <div style={titles}>
                <PrismCode
                  code={bodyData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>bcryptjs</b>
              <div style={titles}>
                <PrismCode
                  code={bcryptjs}
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

export default (withStyles(styles)(JoinOp));
