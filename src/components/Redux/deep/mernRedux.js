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

const actions = `
//actions/types.js
export const NEW_ENTRY = 'NEW_ENTRY';
export const LIST = 'LIST';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const LIST_BY_ID = 'LIST_BY_ID';


//actions/index.js
import axios from 'axios';
import { NEW_ENTRY, LIST, UPDATE_ENTRY, DELETE_ENTRY, LIST_BY_ID } from './types';


export function newDirectoryEntry( fields ){
   const request = axios.post('/create', fields );
   return {
      type: NEW_ENTRY,
      payload: request
   }
}

export function directoryList(){
   const request = axios.get('/read');
   return {
      type: LIST,
      payload: request
   }
}

/* Retrieve a single record by  id */
export function directoryListById( id ){
   const request = axios.get('/readbyid/', { params: { id: id } });
   return {
      type: LIST_BY_ID,
      payload: request
   }
}

export function updateDirectoryEntry( fields ){
   const request = axios.put('/update', fields );
   return {
      type: UPDATE_ENTRY,
      payload: request
   }
}

export function deleteDirectoryEntry( entryid ){
   const request = axios.delete('/delete', { params : { entryid: entryid } } );
   return {
      type: DELETE_ENTRY,
      payload: request
   }
}
`.trim();

const reducers = `
//reducers/index.js
import { NEW_ENTRY, LIST, UPDATE_ENTRY, DELETE_ENTRY, LIST_BY_ID } from '../actions/types';


export default function( state = [], action ) {
    switch(action.type){
      case NEW_ENTRY:
        return { ...state, directory: action.payload };
      case LIST:
        return { ...state, directory: action.payload };
      case LIST_BY_ID:
        return { ...state, directory: action.payload };
      case UPDATE_ENTRY:
        return { ...state, directory: action.payload };
      case DELETE_ENTRY:
        return { ...state, directory: action.payload };
      default:
        return state;
    }
}
`.trim();

const comp = `
//components/form.js
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';
import { updateDirectoryEntry, newDirectoryEntry } from '../actions/index';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Business name is required!'),
    description: Yup.string().required('Business description is required!'),
    phone: Yup.string().required('Phone is required!'),
    email_address: Yup.string().email('Invalid email address!').required('Email address is required!'),
    physical_address: Yup.string().required('Physical address is required!'),
});

class form extends Component {
   constructor(props){
      super(props);
      this.state = { id: typeof this.props.row._id !== 'undefined' ? this.props.row._id : '', 
      name: typeof this.props.row.name !== 'undefined' ? this.props.row.name : '', 
      description: typeof this.props.row.description !== 'undefined' ? this.props.row.description : '', 
      phone: typeof this.props.row.phone !== 'undefined' ? this.props.row.phone : '', 
      email_address: typeof this.props.row.email_address !== 'undefined' ? this.props.row.email_address : '', 
      physical_address: typeof this.props.row.physical_address !== 'undefined' ? this.props.row.physical_address : '', 
      redirect: false 
      }
   }
   async createUpdateRecord(values){
      let results;
      if( this.props.mode === 'edit' ) {
        results = await this.props.updateDirectoryEntry(values);
        if( results.payload.data.response === 'success' ) {
            this.setState({ redirect: true });
        } else {
            console.log(results.payload.data.response);
        }
      } else {
        results = await this.props.newDirectoryEntry(values);
        if( results.payload.data.response === 'success' ) {
            this.setState({ redirect: true });
        } else {
            console.log(results.payload.data.response);
        }
      }
   }
   render(){
      if( this.state.redirect ) {
          return (
            <Redirect to="/" />
          );
      }
      return(
         <div>
           <Formik
             initialValues={{
               name: this.state.name,
               description: this.state.description,
               phone: this.state.phone,
               email_address: this.state.email_address,
               physical_address: this.state.physical_address,
               id: this.state.id
             }}
             validationSchema={validationSchema}
             onSubmit={ values => {
                this.createUpdateRecord(values);
             }}
             render={({ errors, touched }) => (
               <Form>
                 <div>
                   <div>
                   <h2>{ this.props.mode === 'edit' ? 'Edit Entry' : 'New Entry' }</h2>
                   </div>
                 </div> 
                 <div>
                   <div className={''$'{errors.name && touched.name && 'has-error'}'}>
                     <p>Business Name</p>
                     <Field name="name" type="text" />
                   </div>
                   <div className={''$'{errors.description && touched.description && 'has-error'}'}>
                     <p>Business Description</p>
                     <Field name="description" type="text" />
                      { errors.description && touched.description && <span>{errors.description}</span> }
                   </div>
                 </div>
                 <div className="row">
                   <div className={''$'{errors.phone && touched.phone && 'has-error'}'}>
                     <p>Phone</p>
                     <Field name="phone" type="text" />
                      { errors.phone && touched.phone && <span>{errors.phone}</span> }
                   </div>
                   <div className={''$'{errors.email_address && touched.email_address && 'has-error'}'}>
                     <p>Email Address</p>
                     <Field name="email_address" type="text" />
                      { errors.email_address && touched.email_address && <span>{errors.email_address}</span> }
                   </div>
                 </div>
                 <div className="row">
                   <div className={''$'{errors.physical_address && touched.physical_address && 'has-error'}'}>
                     <p>Physical Address</p>
                     <Field name="physical_address" type="text" />
                      { errors.physical_address && touched.physical_address && <span>{errors.physical_address}</span> }
                   </div>
                 </div> 
                 <div>
                   <div>
                      <button>Submit</button>
                   </div>
                 </div>
               </Form>
             )} />
         </div>
      );
   }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ updateDirectoryEntry, newDirectoryEntry }, dispatch);
};

export default connect(null, mapStateToDispatch)(form);



//components/list.js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteDirectoryEntry, directoryList } from '../actions/index';
import { Link } from "react-router-dom";

class List extends Component {
   constructor(props){
     super(props);
     this.state = { list: [] };
     this.confirmDelete = this.confirmDelete.bind(this);
   }
   async getAList() {
     let results = await this.props.directoryList();
     this.setState({ list : results.payload.data });
   }
   componentDidMount(){
     this.getAList();
   }
   async confirmDelete(e){
     if ( window.confirm('Are you sure you wish to delete this item?') ) {
          let results = await this.props.deleteDirectoryEntry(e.target.id);
          if( results.payload.data.response === 'success' ) {
              this.getAList();
          }
     }
   }
   displayAList(){
     if( Object.keys(this.state.list).length > 0 ) {
         const row = this.state.list.map( ( item, i ) => {
            let rowNumber = i + 1;
            return <tr key={i}><th scope="row">{rowNumber}</th><td>{item.name}</td><td>{item.description}</td>
            <td>{item.phone}</td>
            <td>{item.email_address}</td><td>{item.physical_address}</td>
            <td><Link className="btn btn-warning" to={"/edit/"+item._id}>Edit</Link>&nbsp;
            <Link id={item._id} onClick={this.confirmDelete} to="/">Delete</Link></td></tr>
         });
         return (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                { row }
              </tbody>
            </table>
         );
     } else {
         return <p><em>There are no listings at the moment.</em></p>;
     }
   }
   render(){
      return(
        <div>
          <h2>Listings</h2>
          { this.displayAList() }
        </div> 
      );
   }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ directoryList, deleteDirectoryEntry }, dispatch);
};

export default connect(null, mapStateToDispatch)(List);


//components/edit.js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { directoryListById } from '../actions/index';
import Form from './form';

class Edit extends Component {
   constructor(props){
      super(props);
      this.id = this.props.match.params.id;
      this.state = { row: [] }
   }
   async getRecord() {
      let result = await this.props.directoryListById(this.id);
      this.setState({ row : Object.assign( this.state.row, result.payload.data ) });
   }
   componentDidMount(){
      this.getRecord();
   }
   callForm(){
      if ( Object.keys(this.state.row).length > 0 ) {
           return <Form mode="edit" row={this.state.row} />;
      }
   }
   render(){
      return(
        <div>
          { this.callForm() }
        </div> 
      );
   }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ directoryListById }, dispatch);
};

export default connect(null, mapStateToDispatch)(Edit);


//components/entry.js
import Form from './form';

const Entry = () => {
    return(
      <div>
        <Form mode="new" row="[]" />
      </div>
    );
}


//App.js
import { Link, Route } from "react-router-dom";
import Entry from "./components/entry";
import List from "./components/list";
import Edit from "./components/edit";

class App extends Component {
  render() {
    return (
      <div className="row">
         <Link to="/">Listings</Link>
          <Link to="/entry">Entry</Link>
          <Route exact path="/" component={List} />
          <Route path="/entry" component={Entry} />
          <Route path="/edit/:id" component={Edit} />
      </div>
    );
  }
}


//index.js
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import promise from "redux-promise";

import reducers from "./reducers";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const history = createBrowserHistory();


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>, document.querySelector(".container") );`.trim();

const servers = `
//models/directory.js
const DirectorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  email_address: { type: String, required: true },
  physical_address: { type: String, required: true },
  createdAt: { type: Date, required: true }
});


module.exports = mongoose.model('Directory', DirectorySchema);


//routes/index.js
const Directory = require('../models/directory');

module.exports = function() {
  router.get('/read', async (req, res) => {
      let directory_list = await Directory.find({});
      res.send(directory_list);
  });

  router.post("/create", async ( req, res ) => {
      let directory = new Directory({
         name: req.body.name,
         description: req.body.description,
         phone: req.body.phone,
         email_address: req.body.email_address,
         physical_address: req.body.physical_address,
         createdAt: new Date(Date.now())
      });

        let newDirectory = await directory.save();
        res.send({ response: 'success'});
  });

  router.get('/readbyid/', async ( req, res ) => {
       let record = await Directory.findOne({ _id: req.query.id });
       res.send(record);
  });
     
  router.put('/update', async ( req, res ) => {
        let directory = await Directory.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.send({ response: 'success' });
  });

  router.delete('/delete', async (req, res) => {
        let directory = await Directory.findOneAndRemove({ _id: req.query.entryid });
        return res.send({ response: 'success' });
  });

  return router;

};


//server.js
const path = require('path');

const routes = require('./routes/index')();

app.use(express.json());
app.use('/', routes);

const port = process.env.PORT || 3001;
app.listen(port, () => { console.log('Server listening on port ') });

`.trim();



class MernRedux extends Component {
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
              <h3>Actions</h3>
              <div style={titles}>
                <PrismCode
                  code={actions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Reducers</h3>
              <div style={titles}>
                <PrismCode
                  code={reducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Components</h3>
              <div style={titles}>
                <PrismCode
                  code={comp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Server</h3>
              <div style={titles}>
                <PrismCode
                  code={servers}
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

export default (withStyles(styles)(MernRedux));
