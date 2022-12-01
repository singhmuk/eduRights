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

const inputs = `
const App = () => {
  const usersData = [
      { id: 1, name: "AAA", username: "aiueo" },
      { id: 2, name: "BBB", username: "kakikukeko" },
      { id: 3, name: "CCC", username: "sasisuseso" }
    ];
  const [users, setUsers] = useState(usersData);

  const initialFormState={id:'',name:'',username:''};
  const [user,setUser]=useState(initialFormState);

  const handleInputChange=(e)=>{
      const {name,value}=e.target;
      setUser({...user,[name]:value})        
  };

  const addUser = user => {
      user.id = users.length + 1;
      setUsers([...users, user]);
    };

  return(
      <div>
      <form 
       onSubmit={e=>{
          e.preventDefault();
          addUser(user);
          setUser(initialFormState);
       }}>
          <label>Name</label>
              <input type="text" name="name" value={user.name} onChange={handleInputChange} />
              <label>Username</label>
              <input type="text" name="username" value={user.username} onChange={handleInputChange} />
              <button>Add new user</button>
       </form>
       {users.map(items=>(
          <li>{items.name}-{items.username}</li>
       ))}
       </div> 
  )
}

export default App;
`.trim();

const curd2 = `const url = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component{
    state = {
      posts: []
    };

   async componentDidMount(){
      const { data: posts } = await axios.get(url)
      this.setState({posts})
    }

    handleAdd = async () => {
      const obj = {title:'title', body: 'body'}
      const {data: post} = await axios.post(url, obj)
      const posts = [post, ...this.state.posts]
      this.setState({posts})
    }

    handleUpdate = async post => {
      post.title = "update"
      await axios.put('$'{ url }/'$'{post.id}', post)

const posts = [...this.state.posts]
const index = posts.indexOf(post)
posts[index] = { ...post }
this.setState({ posts })
    }

handleDelete = async post => {
  await axios.delete('$'{url}/'$'{post.id}')

  const posts = this.state.posts.filter(p => p.id !== post.id)
  this.setState({ posts })
}

render(){
  return (
    <div>
      <button onClick={this.handleAdd}>Add</button>
      <ul>
        <li>Title</li>
        <li>Update</li>
        <li>Delete</li>
      </ul>
      {this.state.posts.map(post => (
        <li>
          {post.title}
          <button onClick={() => this.handleUpdate(post)}>Update</button>
          <button onClick={() => this.handleDelete(post)}>Delete</button>
        </li>
      ))}
    </div>
  )
}
}`.trim();

const states = `
//components/myContext.js
import React from 'react';

const MyContext = React.createContext();

export default MyContext;


//components/compA.js
import Comp2 from './compB';

const Comp = () => {
  return(
    <div>
      <Comp2 />
    </div>
  )
}

export default Comp;


//components/compB.js
import MyContext from './myContext';

const Comp2 = () => {
    return(
    <MyContext.Consumer>
      {(data)=>(
        <li>{data.name}</li>
      )}
    </MyContext.Consumer>
    )
  }

export default Comp2;


//App.js
import React, { useState } from 'react';
import MyContext from './components/myContext';
import CompA from './components/compA';

const App = () => {
  const [ name ] = useState('Mukesh')
  
    return(
      <div>
        <MyContext.Provider
          value={{name:name}}>
          <CompA />
        </MyContext.Provider>
      </div>
    )
  }

export default App;
`.trim();


const expensAction = `
//forms/AddUserForm.js
const AddUserForm = props => {
  const initialFormState = { id: null, name: "", username: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!user.name || !user.username) return;
        props.addUser(user);
        setUser(initialFormState);
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Add new user</button>
    </form>
  );
};


//forms/EditUserForm.js
const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => { setUser(props.currentUser) },
    [props]
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form onSubmit={e => { e.preventDefault(); props.updateUser(user.id, user) }} >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)}>Cancel</button>
    </form>
  );
};


//tables/UserTable.js
const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>
              <button onClick={() => props.editRow(user)}>Edit</button>
              <button onClick={() => props.deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
);


//App.js
import UserTable from "./tables/UserTable";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";

const App = () => {
  const usersData = [
    { id: 1, name: "AAA", username: "aiueo" },
    { id: 2, name: "BBB", username: "kakikukeko" },
    { id: 3, name: "CCC", username: "sasisuseso" }
  ];

  const [users, setUsers] = useState(usersData);

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: "", username: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const editRow = user => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updateUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updateUser : user)));
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Eidt User</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
};`.trim();


const curd = `
class App extends Component {
  state = {
    mockData: [],
    text: "",
    id: Math.random(1,100),
    editItem: false
  };
  
  handleChange = e => {
    this.setState({text: e.target.value});
  };
  
  handleAdd = e => {
    e.preventDefault();
    if (this.state.text.length === 0) return;

    const newItem = {
      id: this.state.id,
      title: this.state.text
    };
    
    const updatedItems = [...this.state.mockData].concat(newItem);

    this.setState({
      mockData: updatedItems,
      text: "",
      id: Math.random(1,100),
      editItem: false
    });
  };
  
  clearList = () => {
    this.setState({ mockData: [] });
    };
    
  handleDelete = (id) => {
      this.setState({ mockData: this.state.mockData.filter(item => item.id !== id) });
    };
    
  handleEdit = id => {
    const filteredItems = this.state.mockData.filter(item => item.id !== id);
    const selectedItem = this.state.mockData.find(item => item.id === id);

    this.setState({
      mockData: filteredItems,
      text: selectedItem.title,
      editItem: true,
      id: id
    });
  };
  
  render() {
    return (
      <div>
         <form onSubmit={this.handleAdd}>
          <div>
            <input type="text" value={this.state.text} onChange={this.handleChange} />
          </div>
          <button>{this.state.editItem ? "edit item" : "add item"}</button>
        </form>
            
        <ul>
        {this.state.mockData.map(item => {
          return (
            <div>
              <h1>{item.title}</h1>
            
              <button onClick={() => this.handleEdit(item.id)}>edit</button>
              <button onClick={() => this.handleDelete(item.id)}>delete</button>
            </div>
          );
        })}

        <button onClick={this.clearList}>clear list</button>
        </ul>
      </div>
    );
  }
}`.trim();


class ContextMeth extends Component {
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
            <h3>1. Input</h3>
              <div style={titles}>
                <PrismCode
                  code={inputs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Curd</h3>
              <div style={titles}>
                <PrismCode
                  code={curd2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. ReactCurd JsonPlaceholder</h3>
              <div style={titles}>
                <PrismCode
                  code={expensAction}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Curd</h3>
              <div style={titles}>
                <PrismCode
                  code={curd}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Context API State</h3>
              <div style={titles}>
                <PrismCode
                  code={states}
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

export default (withStyles(styles)(ContextMeth));
