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

const useSelector = `
//components/getPosts.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postData';

const Posts  = (props) => {
  useEffect(() => {
    props.fetchPosts();
  })
  
  const getItems = () => {
    return props.data.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
  }

    return (
      <div>{getItems()}</div>
    );
  }

const mapStateToProps = state => ({
  data: state.object.items
});

export default connect(mapStateToProps, { fetchPosts })(Posts);`.trim();

const reducers = `
//actions/types.js
export const GET_DATA = 'GET_DATA';


//actions/postActions.js
import { GET_DATA } from './types';

export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: GET_DATA,
        payload: posts
      })
    );
};


//reducers/mapList.js
import { GET_DATA } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        items: action.payload
      };
    
    default:
      return state;
  }
}
`.trim();

const components = `
//AddContact.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../actions/contactAction";
import shortid from "shortid";
import { useHistory } from "react-router-dom";

const AddContact = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const createContact = (e) => {
    e.preventDefault();
    const new_contact = {
      id: shortid.generate(),
      name: name,
      phone: phone,
      email: email,
    };
    dispatch(addContact(new_contact));
    history.push("/");
  };

  return (
    <form onSubmit={(e) => createContact(e)}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit"> Create Contact </button>
    </form>
  );
};



//Contact.js
import { Link } from "react-router-dom";
import { deleteContact } from "../actions/contactAction";
import { useDispatch } from "react-redux";
const Contact = ({ contact, selectAll }) => {

  const dispatch = useDispatch();
  const { name, phone, email, id } = contact;
  return (
    <tr>
      <input type="checkbox" checked={selectAll} />
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>
        <Link to={'/contacts/edit/'$'{id}'}>E</Link>
        <span onClick={() => dispatch(deleteContact(id))}>X</span>
      </td>
    </tr>
  );
};



//Contacts.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllContact,
  selectAllContact,
  deleteAllContact,
} from "../actions/contactAction";
import Contact from "./Contact";

const Contacts = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const contacts = useSelector((state) => state.contact.contacts);
  const selectedContact = useSelector(
    (state) => state.contact.selectedContacts
  );

  console.log(contacts);

  useEffect(() => {
    if (selectAll) {
      dispatch(selectAllContact(contacts.map((contact) => contact.id)));
    } else {
      dispatch(clearAllContact());
    }
  }, [selectAll]);
  return (
    <div>
      {selectedContact.length > 0 ? (
        <button
          onClick={() => deleteAllContact()}
        >
          delete all
        </button>
      ) : null}
      <table>
        <tr>
          <th>
            <input type="checkbox" id="selectAll" value={selectAll}
              onClick={() => setSelectAll(!selectAll)} />
          </th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        <tbody>
          {contacts.map((contact) => (
            <Contact
              contact={contact}
              key={contact.id}
              selectAll={setSelectAll}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};



//EditContact.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContact, updateContact } from "../actions/contactAction";
import { useHistory, useParams } from "react-router-dom";


const EditContact = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact.contact);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (contact != null) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
    }
    dispatch(getContact(id));
  }, [contact]);

  const onUpdateContact = (e) => {
    e.preventDefault();

    const update_contact = Object.assign(contact, {
      name: name,
      phone: phone,
      email: email,
    });
    dispatch(updateContact(update_contact));
    history.push("/");
  };
  return (
    <div>
      <h3>Add Contacts</h3>
      <div>
        <form onSubmit={(e) => onUpdateContact(e)}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};



//App.js
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

const App = () => {
  return (

    <Router>
      <div>
        <Link to="/contacts/add"> Add Records</Link>
        <Switch>
          <Route exact path="/" component={Contacts} />
          <Route exact path="/contacts/add" component={AddContact} />
          <Route exact path="/contacts/edit/:id" component={EditContact} />
        </Switch>
      </div>
    </Router>
  );
};`.trim();

const reducersCurd = `
//contactReducer.js
import Contact from "../components/Contact";
import {
  GET_CONTACT,
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SELECT_CONTACT,
  CLEAR_CONTACT,
  DELETE_SELECTED_CONTACT,
} from "../actions/types";

const initialState = {
  contacts: [
    {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      phone: "1-770-736-8031 x56442",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
      phone: "010-692-6593 x09125",
    }
  ],
  contact: null,
  selectedContacts: [],
};
const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case GET_CONTACT:
      let arr = state.contacts.filter(
        (contact) => contact.id == action.payload
      );
      arr = arr.values();
      for (let val of arr) {
        arr = val;
      }
      return {
        ...state,
        contact: arr,
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          Contact.id == action.payload.id ? action.payload : contact
        ),
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id != action.payload
        ),
      };

    case SELECT_CONTACT:
      return {
        ...state,
        selectedContacts: action.payload,
      };

    case DELETE_SELECTED_CONTACT:
      return {
        ...state,
        contacts: [],
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        selectedContacts: [],
      };

    default:
      return state;
  }
};
export default contactReducer;
`.trim();

const actions = `
//types.js
export const CREATE_CONTACT = "CREATE_CONTACT";
export const GET_CONTACT = "GET_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const SELECT_CONTACT = "SELECT_CONTACT";
export const CLEAR_CONTACT = "CLEAR_CONTACT";
export const DELETE_SELECTED_CONTACT = "DELETE_SELECTED_CONTACT";



//contactAction.js
import {
  CREATE_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SELECT_CONTACT,
  CLEAR_CONTACT,
  DELETE_SELECTED_CONTACT,
} from "./types";

export const addContact = (contact) => ({
  type: CREATE_CONTACT,
  payload: contact,
});

export const getContact = (id) => ({
  type: GET_CONTACT,
  payload: id,
});

export const updateContact = (contact) => ({
  type: UPDATE_CONTACT,
  payload: contact,
});

export const deleteContact = (id) => ({
  type: DELETE_CONTACT,
  payload: id,
});

export const selectAllContact = (id) => ({
  type: SELECT_CONTACT,
  payload: id,
});

export const clearAllContact = () => ({
  type: CLEAR_CONTACT,
});

//delete selected contacts
export const deleteAllContact = () => ({
  type: DELETE_SELECTED_CONTACT,
});
`.trim();



class ContctHooks extends Component {
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
              <h3>1. Jsonplaceholder</h3>
              <b>App.js</b>
              <div style={titles}>
                <PrismCode
                  code={useSelector}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Reducers</b>
              <div style={titles}>
                <PrismCode
                  code={reducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2.Curd(components)</h3>
              <div style={titles}>
                <PrismCode
                  code={components}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>reducers</b>
              <div style={titles}>
                <PrismCode
                  code={reducersCurd}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>actions</b>
              <div style={titles}>
                <PrismCode
                  code={actions}
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

export default (withStyles(styles)(ContctHooks));
