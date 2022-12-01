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


const envs = `
host = "localhost",
user = "root",
password = "root",
database = "persons"
PORT = 5000`.trim();

const config = `
const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'persons'
});

dbConn.connect((err)=>{
    if(err) throw err;
    console.log('Database connected')
});

module.exports = dbConn;`.trim();

const models = `
var dbConn = require('../config/db');

var Order = function (obj) {
    this.user=obj.user;
    this.paymentMethod=obj.paymentMethod;
    this.paymentResult=obj.paymentResult;
    this.taxPrice=obj.taxPrice;
    this.shippingPrice=obj.shippingPrice;
    this.totalPrice=obj.totalPrice;
    this.isPaid=obj.isPaid;
    this.isDelivered=obj.isDelivered;
    this.deliveredAt=obj.deliveredAt;
};

Order.create = (newOrd, result) => {
    dbConn.query("INSERT INTO ecommerce set ?", newOrd, (err, res) => {
        if (err) 
            result(err, null);
        result(null, res.insertId);
    });
};

Order.allOrder = (result) => {
    dbConn.query("Select * from ecommerce", (err, res) => {
        if (err) 
            result(null, err);
        result(null, res);
    });
};

Order.orderById = (id,result) => {
    dbConn.query("select * from ecommerce where id = ?", id, (err,res)=>{
        if(err)
            result(null, err);
        result(null, res);
    })
}

Order.delete = (id, result) => {
    dbConn.query("delete from ecommerce where id = ?", [id], (err, res)=>{
        if(err)
            result(null,err);
        result(null, res);
    })
}

Order.updateOne = (id, ord, result) => {
    dbConn.query("update ecommerce set user=?, paymentMethod=?, paymentResult=?, taxPrice=?, shippingPrice=?, 
    totalPrice=?, isPaid=?, isDelivered=?, deliveredAt=?, created_at=?, updated_at=? where id = ?",
      
      [ord.user, ord.paymentMethod, ord.paymentResult,ord.taxPrice, ord.shippingPrice, ord.totalPrice, 
      ord.isPaid, ord.isDelivered, ord.deliveredAt, ord.created_at, ord.updated_at, id], (err, res)=>{
        if(err)
            result(null,err);
        result(null,res);
    })
}

module.exports = Order;`.trim();

const controllers = `
const Order = require('../models/items');


router.allOrder = (req, res) => {
    Order.allOrder((err, results) =>{
        if (err)
            res.send(err);
        res.send(results);
    });
};

router.create = (req, res) => {
    const nrw_order = new Order(req.body);
    Order.create(nrw_order, (err, results) => {
        if (err)
            res.send(err);
        res.json({ error: false, message: "Order added successfully!", data: results });
    });
};

router.orderById = (req, res) => {
    Order.orderById(req.params.id, (err, results) => {
        if (err)
            res.send(err);
        res.json(results);
    });
};

router.deletes = (req,res) => {
    Order.delete(req.params.id, (err, result) => {
        if(err)
            res.send(err);
        res.json({success:true, msg:"Order is deleted"})
    })
}

router.updateOrder = (req,res) => {
    const orderUpdate = new Order(req.body);
    Order.updateOne(req.params.id, orderUpdate, (err,order)=>{
        if(err)
            res.send(err);
        res.json({success:true, msg:"Order updated successfully"});
    })
}`.trim();

const routes = `
nst orderController = require('../controllers/items');

router.get('/', orderController.allOrder);
router.post('/', orderController.create);
router.get('/:id', orderController.orderById);
router.delete('/:id', orderController.deletes)
router.put('/:id',orderController.updateOrder);

module.exports = router;
`.trim();

const server = `
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const session = require("express-session");

const unionRoutes = require('./routes/items');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    }));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use('/items', unionRoutes);

const port = process.env.PORT;
app.listen(port,()=> console.log('Server is running on port '$'{port}''));`.trim();

const chanaModel = `
var Order = function (obj) {
  this.name=obj.name;
  this.carMake=obj.carMake;
  this.model=obj.model;
};

Order.create = (newOrd, result) => {
dbConn.query("INSERT INTO selectData set ?", newOrd, (err, res) => {
    if (err) 
        result(err, null);
    result(null, res.insertId);
});
};

Order.allOrder = (result) => {
dbConn.query("Select * from selectData", (err, res) => {
    if (err) 
        result(null, err);
    result(null, res);
});
};`.trim();

const chanaControllers = `
const Car = require('../models/union');

router.allOrder = (req, res) => {
  Car.allOrder((err, results) =>{
      if (err)
          res.send(err);
      res.send(results);
  });
};

router.create = (req, res) => {
  const new_order = new Car(req.body);
  Car.create(new_order, (err, results) => {
      if (err)
          res.send(err);
      res.json({ error: false, message: "Car added successfully!", data: results });
  });
};`.trim();

const chanaRoutes = `
const orderController = require('../controllers/union');

router.get('/', orderController.allOrder);
router.post('/', orderController.create);`.trim();

const chanaServer = `
const unionRoutes = require('./routes/union');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

app.use('/union', unionRoutes);

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log('Server is running on port'));`.trim();



class MysqlCurd extends Component {
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
              <h3>MySqlCurd</h3>
              <b>.env</b>
              <div style={titles}>
                <PrismCode
                  code={envs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>config/db.js</b>
              <div style={titles}>
                <PrismCode
                  code={config}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>models/items.js</b>
              <div style={titles}>
                <PrismCode
                  code={models}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllers/items.js</b>
              <div style={titles}>
                <PrismCode
                  code={controllers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/items.js</b>
              <div style={titles}>
                <PrismCode
                  code={routes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={server}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <br/>

              <h3>chainable-dropdown</h3>
              <b>models/union.js</b>
              <div style={titles}>
                <PrismCode
                  code={chanaModel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllers/union.js</b>
              <div style={titles}>
                <PrismCode
                  code={chanaControllers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/union.js</b>
              <div style={titles}>
                <PrismCode
                  code={chanaRoutes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={chanaServer}
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

export default (withStyles(styles)(MysqlCurd));
