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

const mainApp = `
import React, { useState, useEffect } from "react";

import { User } from "./components/User";
import { AddUser } from "./components/AddUser";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (name, email) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };

  const onEdit = async (id, name, email) => {
    await fetch('https://jsonplaceholder.typicode.com/users/'$'{id}', {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.email = email;
          }

          return user;
        });

        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch('https://jsonplaceholder.typicode.com/users/'$'{id}', {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <AddUser onAdd={onAdd} />
      {users.map((user) => (
        <User
          id={user.id}
          key={user.id}
          name={user.name}
          email={user.email}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}`.trim();

const compos = `
//components/AddUser.js
export const AddUser = ({ onAdd }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    onAdd(e.target.name.value, e.target.email.value);
    e.target.name.value = "";
    e.target.email.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h3>Add User</h3>
      <input placeholder="Name" name="name" />
      <input placeholder="Email" name="email" />
      <button onSubmit={handleOnSubmit}>Add</button>
      <hr />
    </form>
  );
};


//components/User.js
export const User = ({ name, email, id, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEditSubmit = (e) => {
    e.preventDefault();
    onEdit(id, e.target.name.value, e.target.email.value);
    setIsEdit(!isEdit);
  };

  return (
    <div>
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit}>
          <input placeholder="Name" name="name" defaultValue={name} />
          <input placeholder="Email" name="email" defaultValue={email} />
          <button onSubmit={handleOnEditSubmit}>Save</button>
        </form>
      ) : (
        <div className="user">
          <span className="user-name">{name}</span>
          <span className="user-email">{email}</span>
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
`.trim();

const edits = `
//editLists.js
const EditLists = (props) => {
  const [document, setDocument] = useState(props.currentLists);
  useEffect(() => {
    setDocument(props.currentLists);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setDocument({ ...document, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!document.docTitle || !document.description || !document.publisher)
          return;

        props.updateLists(document.id, document);
      }}
    >
      <input
        type="text"
        name="docTitle"
        placeholder="Enter Title"
        value={document.docTitle}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Enter Description"
        value={document.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="publisher"
        placeholder="Enter Publisher"
        value={document.publisher}
        onChange={handleInputChange}
      />
      <button>Edit Document</button>
      <button onClick={() => props.setEditing(false)}>Cancel</button>
    </form>
  );
};



//App.js
import EditLists from "./editLists";

const initialState = [
  {
    id: 1,
    docTitle: "document1",
    description: "desc1",
    publisher: "publisher1",
  },
];

const App = () => {
  const initialFormState = {
    id: null,
    docTitle: "",
    description: "",
    publisher: "",
  };

  const [lists, setLists] = useState(initialState);
  const [editing, setEditing] = useState(false);
  const [currentLists, setCurrentLists] = useState(initialFormState);

  const [data, setData] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleAdd = (data) => {
    data.id = lists.length + 1;
    setLists([...lists, data]);
  };

  const handleEdit = (data) => {
    setEditing(true);
    setCurrentLists({
      id: data.id,
      docTitle: data.docTitle,
      description: data.description,
      publisher: data.publisher,
    });
  };
  const updateLists = (id, updatedDocument) => {
    setEditing(false);
    setLists(lists.map((item) => (item.id === id ? updatedDocument : item)));
  };

  return (
    <>
      <div className="row">
        {editing ? (
          <EditLists
            editing={editing}
            setEditing={setEditing}
            currentLists={currentLists}
            updateLists={updateLists}
          />
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();

              handleAdd(data);
              setData(initialFormState);
            }}
          >
            <input
              type="text"
              name="docTitle"
              placeholder="Enter Title"
              value={data.docTitle}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              value={data.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="publisher"
              placeholder="Enter Publisher"
              value={data.name}
              onChange={handleInputChange}
            />
            <button>Add Document</button>
          </form>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Publisher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lists.length > 0
            ? lists.map((item) => (
                <tr key={item.id}>
                  <td>{item.docTitle}</td>
                  <td>{item.description}</td>
                  <td>{item.publisher}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(item);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};
`.trim();

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

class JsonPlaceholder extends Component {
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
              <h3>JsonPlaceholder(Curd)</h3>
              <b>App.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={mainApp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>components/</b>
              <div style={titles}>
                <PrismCode
                  code={compos}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Edit</h3>
              <div style={titles}>
                <PrismCode
                  code={edits}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Local Storage</h3>
              <div style={titles}>
                <PrismCode
                  code={localStorage}
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

export default (withStyles(styles)(JsonPlaceholder));
