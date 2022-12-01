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

const curd = `
//components/User.js
export const User = ({ name, email, id, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => { setIsEdit(!isEdit); };

  const handleDelete = () => { onDelete(id); };

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


//App.js
import { User } from "./components/User";
import { AddUser } from "./components/AddUser";

export default function App() {
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
        email: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
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
        email: email
      }),
        headers: {
  "Content-type": "application/json; charset=UTF-8"
}
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
    method: "DELETE"
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
}

`.trim();

// const server = ``.trim();


class ExpenseTraMern extends Component {
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
              <h3>React Curd Json Placeholder</h3>
              <div style={titles}>
                <PrismCode
                  code={curd}
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

export default (withStyles(styles)(ExpenseTraMern));
