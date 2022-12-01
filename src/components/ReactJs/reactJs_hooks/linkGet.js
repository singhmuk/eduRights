import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../prismCode';


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


const linkData = `
//models/item.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Item = mongoose.model('item', ItemSchema);



//routes/item.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

router.patch('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  }, { new: true }).then(data => { res.send(data) })
})

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
`.trim();

const compos = `
//App.js
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import AppNavbar from './components/AppNavbar';
import ItemModal from './components/ItemModal';
import EditList from './components/Edit';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={ShoppingList} />
          <Route exact path="/ItemModal/new" component={ItemModal} />
          <Route exact path="/AppNavbar/:_id" component={AppNavbar} />
          <Route exact path="/EditList/:_id/edit" component={EditList} />
        </Switch>
      </div>
    </Router>
  );
}



//componenrs/ShoppingList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ShoppingList = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get("/item")
      .then(res => {
        setItems(res.data);
      })
  }, []);

  return (
    <div>
      <Link to="/ItemModal/new">Add Items</Link>
      {items.map((item) => {
        return (
          <div key={item._id}>
            <h4><Link to={'/ AppNavbar / '$'{ item._id }'}>{item.name}</Link></h4>
            <small>_id: {item._id}</small>
          </div>
        )
      })}
    </div>
  )
}


//componenrs/ItemModal.js
import React, { useState } from "react";
import { post } from 'axios';


const ItemModal = (props) => {
  const initialState = { name: '' }
  const [items, setItems] = useState(initialState)

  const handleChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/item', items);
    props.history.push('/ ');
  }

  const handleCancel = () => {
    props.history.push("/");
  }

  return (
    <div>
      <h1>Add Items</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={items.name} onChange={handleChange} />

        <input type="submit" value="Submit" />
        <button type="button" onClick={handleCancel} >Cancel</button>
      </form>
    </div>
  );
}



//componenrs/AppNavbar.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const AppNavbar = (props) => {
  const [item, setItems] = useState({});

  useEffect(() => {
    axios('/ item / '$'{ props.match.params._id }')
      .then(res => res.data)
      .then(receivedData => setItems(receivedData));
  }, [props]);

  const handleDelete = () => {
    axios.delete('/ item / '$'{ props.match.params._id } ');
    props.history.push("/");
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <small>_id: {item._id}</small>
      <p>{item.content}</p>

      <Link to={'/ EditList / '$'{ item._id } /edit'}>Edit</Link >
      <button onClick={handleDelete}>Delete</button>
      <Link to="/" >Close</Link>
    </div >
  );
};



//componenrs/Edit.js
import axios from 'axios';
import { patch } from 'axios';


const EditList = (props) => {
  const initialState = { name: '' }
  const [items, setItems] = useState(initialState)

  useEffect(() => {
    axios('/ item / '$'{ props.match.params._id }')
      .then(res => res.data)
      .then(receivedData => setItems(receivedData));
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    patch('/ item / '$'{ items._id } ', items);
    props.history.push('/ ');
  }

  const handleChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    props.history.push('/ ');
  }

  return (
    <div>
      <h1>Edit {items.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={items.name} onChange={handleChange} />

        <button type="submit">Update</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}
`.trim();

const onlyGet = `
//App.js
import ShoppingList from './components/ShoppingList';
import AppNavbar from './components/AppNavbar';


function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={ShoppingList} />
          <Route exact path="/AppNavbar/:_id" component={AppNavbar} />
        </Switch>
      </div>
    </Router>
  );
}



//components/ShoppingList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ShoppingList = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get("/item")
      .then(res => {
        setItems(res.data);
      })
  }, []);

  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item._id}>
            <h4><Link to={'/ AppNavbar / '$'{ item._id }'}>{item.name}</Link></h4>
            <small>_id: {item._id}</small>
          </div>
        )
      })}
    </div>
  )
}



//components/AppNavbar.js
import axios from 'axios';

const AppNavbar = (props) => {
  const [item, setItems] = useState({});

  useEffect(() => {
    axios('/ item / '$'{ props.match.params._id }')
      .then(res => res.data)
      .then(receivedData => setItems(receivedData));
  }, [props]);

  return (
    <div>
      <h2>{item.name}</h2>
      <small>_id: {item._id}</small>
      <p>{item.content}</p>
    </div>
  );
};
`.trim();



class LinkGet extends Component {
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
              <h3>1. Pass data as props in link(API)</h3>
              <div style={titles}>
                <PrismCode
                  code={linkData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>UI</h3>
              <div style={titles}>
                <PrismCode
                  code={compos}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <h3>2. Pass data only</h3>
              <div style={titles}>
                <PrismCode
                  code={onlyGet}
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

export default (withStyles(styles)(LinkGet));