import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../../ReactJs/styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../../ReactJs/prismCode";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const editForm = `
import EditUserForm from "./EditUserForm";

const App = () => {
  const usersData = [
    { id: 1, name: "AAA", username: "aiueo" }
  ];

  const initialFormState = { id: null, name: "", username: "" };
  const [mockData, setMockData] = useState(usersData);
  const [user, setUser] = useState(initialFormState);

  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const addUser = user => {
    user.id = mockData.length + 1;
    setMockData([...mockData, user]);
    setUser(initialFormState);
  };

  const deleteUser = id => {
    setMockData(mockData.filter(user => user.id !== id));
  };

  const editRow = user => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updateUser) => {
    setEditing(false);
    setMockData(mockData.map(user => (user.id === id ? updateUser : user)));
  };

  return (
    <div className="container">
      {editing?
      <EditUserForm
      editing={editing}
      setEditing={setEditing}
      currentUser={currentUser}
      updateUser={updateUser}
    />:
      <form
        onSubmit={e => {
          e.preventDefault();
          addUser(user);
        }}
      >
        <input type="text" name="name" value={user.name} placeholder="Name" onChange={handleInputChange} />
        <input type="text" name="username" value={user.username} onChange={handleInputChange} />
        <button>Add new user</button>
      </form>
}
          {mockData.map(user => (
            <li key={user.id}>
              {user.name}---
              {user.username}
              <button onClick={() => editRow(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))
        }
    </div>
  );
};


//EditUserForm.js
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
`.trim();

const curdcom = `
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

const localStorage = `
import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
`.trim();

const addtext = `
const App = () => {
  const [user, setUser] = useState('');
  const [mocks, setMocks] = useState([]);

  const handleChange = (e) => {
    const {value} = e.target;
    setUser(value);
  } 

  const handleAdd = () => {
    setMocks([...mocks, user])
  };

  return (
    <div>
      <input type="text" name="user" value={user} onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
      {mocks.map(vals=>(
        <li>{vals}</li>
      ))}
    </div>
  );
};`.trim();

const addRef = `
const App = () => {
  const user = useRef("");
  const mocks = useRef([]);

  const handleChange = (e) => {
    const { value } = e.target;
    user.current = value;
  };

  const handleAdd = () => {
    mocks.current = [...mocks.current, user.current];
    console.log(mocks.current)
    user.current = "";
  };

  return (
    <div>
      <input type="text" name="user" onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
        {mocks.current.map((vals, index) => (
          <li key={index}>{vals}</li>
        ))}
    </div>
  );
};`.trim();

class MainCompo extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>
              <Sidebar />
            </h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>1. Curd Component</h3>
              <div style={titles}>
                <PrismCode
                  code={curdcom}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Curd</h3>
              <div style={titles}>
                <PrismCode
                  code={editForm}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Curd Local Storage</h3>
              <div style={titles}>
                <PrismCode
                  code={localStorage}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Add Text Only</h3>
              <div style={titles}>
                <PrismCode
                  code={addtext}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. UsRef</h3>
              <div style={titles}>
                <PrismCode
                  code={addRef}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MainCompo);
