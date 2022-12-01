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

const ShoppingList = `
import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';


const ShoppingList = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await axios.get("/item");
        setItems(response.data);
      } catch(error) {
        console.log('error', error);
      }
    }        
    getArticles();
  }, []);

  return (
    <div>
        <Link to="/ItemModal/new">Add Items</Link> 
      {items.map((item) => {
        return(
          <div key={item._id}>
            <h4><Link to={/AppNavbar/'$'{item._id}}>{item.name}</Link></h4>
            <small>_id: {item._id}</small>
          </div>
        )     
      })}
    </div>
  )
}

export default ShoppingList;`.trim()

const ItemModal = `
import React, { useState } from "react"; 
import { post } from 'axios'; 


const ItemModal = (props) => {
    const initialState = { name: '' }
    const [items, setItems] = useState(initialState) 

  const handleChange = (e) => { 
    setItems({...items, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => { 
    e.preventDefault();     
    if(!items.name ) return 
    async function postArticle() {
      try {
        const res = await post('/item', items); 
        props.history.push(/);  
      } catch(error) {
        console.log('error', error);
      }
    }
    postArticle();
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

export default ItemModal;`.trim()

const AppNavbar = `
import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from 'react-router-dom';

const AppNavbar = (props) => {
  const [item, setItems] = useState({}); 

  useEffect(() => { 
    async function getArticle() {
      try {
        const res = await axios.get(/item/'$'{props.match.params._id}); 
        setItems(res.data);      
      } catch(error) {
        console.log('error', error);
      }
    }
    getArticle();    
  }, [props]); 

  async function handleDelete() { 
    try {
      await axios.delete(/item/'$'{props.match.params._id}); 
      props.history.push("/"); 
    } catch(error) {
      console.error(error);
    }
  }

  return ( 
    <div>
      <h2>{item.name}</h2>
      <small>_id: {item._id}</small>
      <p>{item.content}</p>
      
        <Link to={/EditList/'$'{item._id}/edit}>Edit</Link> 
        <button onClick={handleDelete}>Delete</button> 
        <Link to="/" >Close</Link>
    </div>
  );
};

export default AppNavbar;`.trim()

const EditList = `
import React, { useState, useEffect } from "react";
import { get, patch } from 'axios';


const EditList = (props) => {

  const initialState = { name: '' }
  const [items, setItems] = useState(initialState)

  useEffect(() => {
    async function getArticle() {
      try {
        const res = await get(/item/'$'{props.match.params._id});
        setItems(res.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getArticle();    
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function updateArticle() {
      try {
        await patch(/item/'$'{items._id}, items);
        props.history.push(/);        
      } catch(error) {
        console.log(error);
      }
    }
    updateArticle();
  }

  const handleChange = (e) => {
    setItems({...items, [e.target.name]: e.target.value})
  }

  const handleCancel = () => {
    props.history.push(/);
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

export default EditList;`.trim()

const App = `
import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
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


export default App;
`.trim()

 
class MernReactHooks extends Component {
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
      <b>Mern React Hooks</b>
      <br/>
      components/ShoppingList.js
      <div style={titles}>
      <PrismCode
        code={ShoppingList}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      components/ItemModal.js
      <div style={titles}>
      <PrismCode
        code={ItemModal}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      components/AppNavbar.js
      <div style={titles}>
      <PrismCode
        code={AppNavbar}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      Components/EditList.js
      <div style={titles}>
      <PrismCode
        code={EditList}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      App.js
      <div style={titles}>
      <PrismCode
        code={App}
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

export default (withStyles(styles)(MernReactHooks));
