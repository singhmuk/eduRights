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


const sliderBox = `
//App.js
class App extends Component {
  state = {
    selectIndex:0
  }

  slideIndex = () => {
    const labels = document.querySelectorAll('#slider label');
    const nextIndex = this.state.selectIndex === (labels.length - 1) ? 0 : 
                      this.state.selectIndex + 1; 
                      
    this.setState({selectIndex: nextIndex})
  }

  render(){
    return (
      <div>
        <div>
          <div>
              <button onClick={this.slideIndex}>btn</button>
          </div>
          <div>
            <section id="slider">
              <input type="radio" id="s1" checked={this.state.selectIndex === 0} />
              <input type="radio" id="s2" checked={this.state.selectIndex === 1} />
              <input type="radio" id="s3" checked={this.state.selectIndex === 2} />
              
              <label id="slide1">
                <img src="https://picsum.photos/200/200" height="100%" width="100%"/>
              </label>
              <label id="slide2">
                <img src="https://picsum.photos/200/300" height="100%" width="100%"/>
              </label>
              <label id="slide3">
                <img src="https://picsum.photos/300/300" height="100%" width="100%"/>
              </label>
            </section>
          </div>
        </div>
      </div>
    );
  }
}  


//App.css
[type=radio] {
  display: none;
}

#slider {
  height: 30vw;
  width: 40vw;
  margin: 0 auto;
  left: -10%;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
}

#slider label {
  margin: auto;
  background-color: aliceblue;
  width: 60%;
  height: 100%;
  border-radius: 4px;
  position: absolute;
  left: 0; right: 0;
  cursor: pointer;
  transition: transform 0.4s ease;
}


#s1:checked ~ #slide3, #s2:checked ~ #slide1,
#s3:checked ~ #slide2 {
  box-shadow: 0 6px 10px 0 rgba(0,0,0,.3), 0 2px 2px 0 rgba(0,0,0,.2);
  transform: translate3d(-50%,0,-100px);
}

#s1:checked ~ #slide1, #s2:checked ~ #slide2,
#s3:checked ~ #slide3 {
  box-shadow: 0 13px 25px 0 rgba(0,0,0,.3), 0 11px 7px 0 rgba(0,0,0,.19);
  transform: translate3d(0,0,0);
}

#s1:checked ~ #slide2, #s2:checked ~ #slide3,
#s3:checked ~ #slide1 {
  box-shadow: 0 6px 10px 0 rgba(0,0,0,.3), 0 2px 2px 0 rgba(0,0,0,.2);
  transform: translate3d(50%,0,-100px);
}
`.trim();

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

class MainCompo extends Component {
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

              <h3>4. Slider on click</h3>
              <div style={titles}>
                <PrismCode
                  code={sliderBox}
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

export default (withStyles(styles)(MainCompo));
