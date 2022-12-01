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

const reactAdd = `
import { v4 as uuidv4 } from "uuid";

const initialState = [
  { id: 1, aim: "Success" },
  { id: 2, aim: "Advanced" },
  { id: 3, aim: "Properly" },
];

const App = () => {
  const [list, setList] = useState(initialState);
  const [aim, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleAdd = () => {
    const newItem = list.concat({ aim, id: uuidv4() });
    setList(newItem);
    console.log(newItem);
    setName("");
  };

  return (
    <div>
      <input type="text" value={aim} onChange={handleChange} />
      <button type="submit" onClick={handleAdd}>
        Add
      </button>
      {list.map((val) => (
        <div>{val.aim}</div>
      ))}
    </div>
  );
};
`.trim();

const reduxAdd = `
//App.js
import { connect } from "react-redux";
import { addFun } from "./actions/dataActions";

const App = (props) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleAdd = () => {
    const newItem = name;
    props.addFun(newItem);
    setName("");
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <button type="submit" onClick={handleAdd}>
        Add
      </button>
      {props.data.map((val) => (
        <div>{val.name}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  addFun,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



//reducers/data.js
const initialState = [
  { id: 1, name: "Mukesh" },
  { id: 2, name: "Rakesh" },
  { id: 3, name: "Niketh" },
];

export default (state = initialState, action) => {
  console.log("props.list", state);
  const { type, payload } = action;
  switch (type) {
    case ADD:
      return [...state, { name: payload }];

    default:
      return state;
  }
};



//actions/dataActions.js
export const addFun = (payload) => {
  return {
    type: ADD,
    payload: payload,
  };
};
`.trim();

const reactDelete = `
const initialState = [
  { id: 1, name: "Success" },
  { id: 2, name: "Advanced" },
  { id: 3, name: "Properly" },
];

const App = () => {
  const [list, setList] = useState(initialState);

  const handleRemoveItem = (id) => {
    const deleteItems = list.filter((item) => item.id !== id);
    setList(deleteItems);
  };

  return (
    <div>
      {list.map((val) => (
        <div>
          {val.name}
          <button onClick={() => handleRemoveItem(val.id)}>X</button>
        </div>
      ))}
    </div>
  );
};`.trim();

const reduxDelete = `
//App.js
import { deletFun } from "./actions/dataActions";

const App = (props) => {
  const handleRemoveItem = (id) => {
    props.deletFun(id);
  };

  return (
    <div>
      {props.data.map((val) => (
        <div>
          {val.name}
          <button onClick={() => handleRemoveItem(val.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.dataVal,
});

const mapDispatchToProps = {
  deletFun,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



//reducers/dataReducers.js
const initialState = [
  { id: 1, name: "Mukesh" },
  { id: 2, name: "Rakesh" },
  { id: 3, name: "Niketh" },
];

export default (state = initialState, action) => {
  console.log("props.list", state);
  const { type, payload } = action;
  switch (type) {
    case DELETE_DATA:
      state = state.filter((x) => x.id !== payload);
      return state;
    default:
      return state;
  }
};



//actions/dataActions.js
export const deletFun = (id) => {
  return {
    type: DELETE_DATA,
    payload: id,
  };
};
`.trim();

const reduxEdit = `
//App.js
import Forms from "./components/form";
import { connect } from "react-redux";
import * as actions from "./actions/transactionActions";
import { bindActionCreators } from "redux";

const App = (props) => {
  const handleEdit = (index) => {
    props.updateTransactionIndex(index);
  };

  return (
    <div>
      <Forms />
      <table>
        <tbody>
          {props.list.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.bAccountNo}</td>
                <td>{item.amount}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateTransactionIndex: actions.updateIndex,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



//components/form.js
import { connect } from "react-redux";
import * as actions from "../actions/transactionActions";
import { bindActionCreators } from "redux";

class Forms extends Component {
  state = {};

  returnStateObject() {
    if (this.props.currentIndex == -1)
      return {
        bAccountNo: "",
        bName: "",
      };
    else return this.props.list[this.props.currentIndex];
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentIndex != this.props.currentIndex ||
      prevProps.list.length != this.props.list.length
    ) {
      this.setState({ ...this.returnStateObject() });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.currentIndex == -1) this.props.insertTransaction(this.state);
    else this.props.updateTransaction(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <input
          name="bAccountNo"
          onChange={this.handleInputChange}
          value={this.state.bAccountNo}
        />
        <br />

        <input
          name="amount"
          onChange={this.handleInputChange}
          value={this.state.amount}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    currentIndex: state.currentIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      insertTransaction: actions.insert,
      updateTransaction: actions.update,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
`.trim();

const actions = `
//reducers/transactionReducer.js
export const transactionReducer = (state, action) => {
  var list = JSON.parse(localStorage.getItem("transactions"));
  switch (action.type) {
    case "INSERT":
      list.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(list));
      return { list, currentIndex: -1 };
    case "UPDATE":
      list[state.currentIndex] = action.payload;
      localStorage.setItem("transactions", JSON.stringify(list));
      return { list, currentIndex: -1 };

    case "UPDATE-INDEX":
      return { list, currentIndex: action.payload };

    case "DELETE":
      list.splice(action.payload, 1);
      localStorage.setItem("transactions", JSON.stringify(list));
      return { list, currentIndex: -1 };
    default:
      return state;
  }
};

export default transactionReducer;




//actions/transactionActions.js
export const insert = data => {
  return {
      type: 'INSERT',
      payload: data
  }
}

export const update = data => {
  return {
      type: 'UPDATE',
      payload: data
  }
}

export const Delete = id => {
  return {
      type: 'DELETE',
      payload: id
  }
}

export const updateIndex = index => {
  return {
      type: 'UPDATE-INDEX',
      payload: index
  }
}
`.trim();


class ReduxMethods extends Component {
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
              <h2>Add(React)</h2>
              <div style={titles}>
                <PrismCode
                  code={reactAdd}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Add(Redux)</h3>
              <div style={titles}>
                <PrismCode
                  code={reduxAdd}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>Delete(React)</h3>
              <div style={titles}>
                <PrismCode
                  code={reactDelete}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Delete(Redux)</h3>
              <div style={titles}>
                <PrismCode
                  code={reduxDelete}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Edit(Redux)</h3>
              <div style={titles}>
                <PrismCode
                  code={reduxEdit}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>actions</h3>
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

export default (withStyles(styles)(ReduxMethods));