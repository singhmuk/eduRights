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


const code = `
class App extends Component {
  state = {show: true};

  delHeader = () => {
    this.setState({show: !this.state.show});
  }
  render() {
    let myheader;
    if (this.state.show) {
      myheader = <Child />;
    };
    return (
      <>
        {myheader}
        <button type="button" onClick={this.delHeader}>Delete Header</button>
      </>
    );
  }
}

class Child extends Component {
  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}`.trim();


const storeData = `
export default class App extends Component {
  state = { user: '', rememberMe: false };
  
  componentDidMount() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const user = rememberMe ? localStorage.getItem('user') : '';
    this.setState({ user, rememberMe });
  }
 
  handleChange = (e) => {
    const input = e.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
 
    this.setState({ [input.name]: value });
  };
 
  handleFormSubmit = () => {
    const { user, rememberMe } = this.state;
    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('user', rememberMe ? user : '');
  };
 
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>
          User: <input name="user" value={this.state.user} onChange={this.handleChange}/>
        </label>
        <label>
          <input name="rememberMe" checked={this.state.rememberMe} 
                 onChange={this.handleChange} type="checkbox"/> Remember me
        </label>
        <button type="submit">Sign In</button>
      </form>
    );
  }
}`.trim();

const shibling = `
class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null };
  
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <>
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </>
      );
    }
    
    return this.props.children;
  }  
}



//BuggyCounter.js
const BuggyCounter = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    setCounter({counter: counter + 1})
  }

  if (counter === 5) {
    throw new Error('I crashed!');
  }
  return <h1 onClick={handleClick}>{counter}</h1>;
}



function App() {
  return (
    <div>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}

export default App;`.trim();

const body = `
  const App = OriginalComponent => {
    class NewComponent extends Component {
      constructor(props) {
        super(props)
        this.state={
          count:0
        }
      }
      
      incrementCount = () => {
        this.setState(prevState => {
          return { count: prevState.count +1 }
        })
      }
      render(){
        return(
           <OriginalComponent 
            count={this.state.count}
            incrementCount={this.incrementCount}
         />
        )
      }
    }
    return NewComponent;
  }
  
  
  
  const ClickCounter = (props) => {
      const { count, incrementCount } = props;
      return (
        <div>
          <button onClick={incrementCount}>
            Click {count} times
          </button>
        </div>
      )
    }
  //export default App(ClickCounter);
  
  
  
  const HoverCounter = (props) => {
      const { count, incrementCount } = props;
      return (
        <div>
          <button onMouseOver={incrementCount}>
            Hover {count} times
          </button>
        </div>
      )
    }
  
  export default App(HoverCounter, ClickCounter);
  //export default App(HoverCounter)`.trim()

const form = `
const App = () => {
  const usersData = [
    { id: 1, name: "AAA", username: "aiueo" }
  ];

  const initialFormState = { id: null, name: "", username: "" };
  const [mockData, setMockData] = useState(usersData);
  const [user, setUser] = useState(initialFormState);

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

  return (
    <div className="container">
      <form
        onSubmit={e => {
          e.preventDefault();
          addUser(user);
        }}
      >
        <input type="text" name="name" value={user.name} placeholder="Name" onChange={handleInputChange} />
        <input type="text" name="username" value={user.username} placeholder="Username" onChange={handleInputChange} />
        <button>Add new user</button>
      </form>
      
          {mockData.map(user => (
            <li key={user.id}>
              {user.name}---
              {user.username}
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))
        }
    </div>
  );
};
`.trim();


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

const formMul = `
class App extends Component {
  state = {
    username: '',
    city: '',
    country: '',
    age: null,
    mockData: []
  };

handleChange = (e) => {
  let name = e.target.name;
  this.setState({[name]: e.target.value});

  console.log(name)
}

handleSubmit = (e) => {
  e.preventDefault();
  let age = this.state.age;

  const newItem = {
    username: this.state.username,
    city: this.state.city,
    country: this.state.country,
    age: this.state.age
  };

  this.setState(state => ({
    mockData: state.mockData.concat(newItem),
      username: '',
      city: '',
      country: '',
      age: '',
      }));

  if (!Number(age)) {
    alert("Your age must be a number");
  }
}

render() {
  return (
    <div>
    <form onSubmit={this.handleSubmit}>
      <input type='text' name='username' onChange={this.handleChange} />
      <input type='text' name='city' onChange={this.handleChange} />
      <input type='text' name='city' onChange={this.handleChange} />
      <input type='text' name='age' onChange={this.handleChange} />
      
      <button>Submit</button>
    </form>

      {this.state.mockData.map(item => (
        <div>
          <li>{item.username} --- {item.city} --- {item.city} --- {item.age}</li>
        </div> 
      ))}
    </div>
  );
}
}`.trim();

const eventPass = `
const App = () => {
  const usersData = [
    { id: 1, name: "AAA", username: "aiueo" }
  ];

  const initialFormState = { id: null, name: "", username: "" };
  const [mockData, setMockData] = useState(usersData);
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const addUser = user => {
    user.id = mockData.length + 1;
    setMockData([...mockData, user]);
    setUser(initialFormState);
  };

  return (
    <div className="container">
      <form
        onSubmit={e => {
          e.preventDefault();
          addUser(user);
        }}
      >
        <input type="text" name="name" value={user.name} placeholder="Name" onChange={handleInputChange} />
        <input type="text" name="username" value={user.username} placeholder="Username" onChange={handleInputChange} />
        <button>Add new user</button>
      </form>
      
          {mockData.map(user => (
            <li key={user.id}>
              {user.name}---
              {user.username}
            </li>
          ))
        }
    </div>
  );
};`.trim();

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
        <input type="text" name="username" value={user.username} placeholder="Username" onChange={handleInputChange} />
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

const increase = `
const App = () => {
  const [count, setCount]=useState(0);
  const [toggle, setIsPouse]=useState(false);

  const handlePouse=()=>{
    setIsPouse(!toggle)
    console.log(toggle,"toggle")
  }

  const handleCount=()=>{
    if(toggle==true){
      setCount(count+1)
    }
    else{
      setCount(count-1)
    }
  }

  const reset=()=>{
    setCount(0)
  }

  return(
    <div>
      {count}<br/>
      <button onClick={handleCount}>count</button>
      <button onClick={handlePouse}>Pouse</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
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
              <h3>1. Lifecycle of Components</h3>
              Each component in React has a lifecycle which you can monitor and manipulate during its
              three main phases.
              <br />
              1. Mounting<br />
              2. Updating and<br />
              3. Unmounting<br />
              <br />
              <b>Mounting: </b>Mounting means putting elements into the DOM.
              <br />
              React has four built-in methods that gets called, in this order, when mounting a component:
              <br />
              <br />
              1. constructor()<br />
              3. <b>render():</b>  required and will always be called, the others are optional and will be called if you define them.<br />
              4. componentDidMount()<br />

              <br />
              <br />
              <b>constructor(): </b>Is called before anything else, when the component is initiated,
              and it is the natural place to set up the initial state and other initial values.
              <br />
              <br />
              The constructor() method is called with the props, as arguments, and you should always start
              by calling the super(props) before anything else, this will initiate the parent's constructor
              method and allows the component to inherit methods from its parent.
              <br />
              <br />
              <b>componentDidMount: </b>Method is called after the component is rendered.
              <br />
              This is where you run statements that requires that the component is already placed in the
              DOM.
              <br />
              <br />
              <b>Updating: </b>
              A component is updated whenever there is a change in the component's state or props.
              <br />
              <ul>
                <li>shouldComponentUpdate()</li>
                <li>render()</li>
                <li>componentDidUpdate()</li>
              </ul>
              <br />

              <b>shouldComponentUpdate: </b>
              In the shouldComponentUpdate() we can return a Boolean value that specifies whether
              React should continue with the rendering or not.
              <br />
              <b>The default value is true.</b>
              <br />
              <br />

              <b>render:</b>
              Method is called when a component gets updated, it has to re-render
              the HTML to the DOM, with the new changes.
              <br />
              <br />

              <b>componentDidUpdate: </b>
              The componentDidUpdate method is called after the component is updated in the DOM.
              <br />
              <br />
              <b>Unmounting: </b>
              componentWillUnmount:
              <br />
              This method is called when the component is about to be removed from the
              DOM.
              <br />
              <div style={titles}>
                <PrismCode
                  code={code}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>This method is called when there is an error during rendering, in a lifecycle method, or in the constructor of any
                child component. </p>
              <ul>
                <li>b. componentDidCatch</li>
              </ul>
              <br />

              <h3>2. Error Boundries</h3>
              <p>Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering.
                A component can become an Error boundary if it contains the definition of the <b>'componentDidCatch'</b>.</p>
              <div style={titles}>
                <PrismCode
                  code={shibling}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Local Storage</h3>
              <div style={titles}>
                <PrismCode
                  code={storeData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Event</h3>
              <p>
                In React, events are the triggered reactions to specific actions like mouse hover, mouse click, key press, etc.
              </p>
              <ul>
                <li>1. Events are passed as functions instead of strings. </li>
                <li>
                  2. The event argument contains a set of properties, which are specific to an event. Each event type contains its own
                  properties and behavior which can be accessed via its event handler only.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={eventPass}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>What are synthetic events in React?</h3>
              <p>
                Synthetic events are the objects which act as a cross-browser wrapper around the browser’s native event. They combine
                the behavior of different browsers into one API. This is done to make sure that the events show consistent properties
                across different browsers.
              </p>
              <b>Ex. </b>preventDefault
              <br />

              <h3>5. Higher Order Component</h3>
              <i>HOCs are the coined term for a custom Component that accepts dynamically provided children.</i>
              <div style={titles}>
                <PrismCode
                  code={body}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Form</h3>
              <div style={titles}>
                <PrismCode
                  code={form}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Form multi input</h3>
              <div style={titles}>
                <PrismCode
                  code={formMul}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Edit Form</h3>
              <div style={titles}>
                <PrismCode
                  code={editForm}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Increase-Decrease</h3>
              <div style={titles}>
                <PrismCode
                  code={increase}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Slider on click</h3>
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
