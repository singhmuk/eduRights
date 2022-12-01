import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../prismCode';
import Pure from '../../../assets/pure.png';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 350,
  width: 600
}

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

const pureComps = `
const quotes = ["quote1", "quote2", "quote3", "quote4", "quote5"];

const NotFound = () => {
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <h1>
      Quote: <strong>{randomQuote}</strong>
    </h1>
  );
};

export default class Controll extends Component {
  state = { username: "foo" };

  componentDidMount() {
    setTimeout(() => this.setState({ username: "bar" }), 2000); // Simulate async ajax call
  }

  render() {
    return (
      <div>
        Welcome: {this.state.username}
        <NotFound />
      </div>
    );
  }
}
`.trim();

const pureComps2 = `
const quotes = ["quote1", "quote2", "quote3", "quote4", "quote5"];

class NotFound extends React.PureComponent {
  render() {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return (
      <h1>
        Quote: <strong>{randomQuote}</strong>
      </h1>
    );
  }
}

export default class Controll extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "foo" };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ username: "bar" }), 2000);
  }

  render() {
    return (
      <div>
        Welcome: {this.state.username}
        <NotFound />
      </div>
    );
  }
}
`.trim();

const PureComponents = `
//App.js
import Task from '../comp';

class App extends PureComponent {
state = {
     taskList: [
        { title: 'excercise'},
        { title: 'cooking'},
        { title: 'Reacting'},
     ]
  };

  componentDidMount() {
  setInterval(() => {
     this.setState({taskList: this.state.taskList});
  }, 1000);
}

render() {
  return (
      <div>
         {this.state.taskList.map((task, i) => {
            return (<Task
               key={i}
               title={task.title}
            />);
         })}
      </div>
    );
  }
}

export default App;


//text.js
class Task extends React.Component {
  render() {
     console.log('task added');
     return (
          <div>
            {this.props.title}
          </div>);
  }
}

export default Task;
`.trim();

const PureComponents3 = `
class PureComponent extends React.PureComponent {
  renderCounter = 0

  render() {
    this.renderCounter++
    return <h2>{this.props.name} rendered: {this.renderCounter}</h2>
  }
}

class ImpureComponent extends React.Component {
  renderCounter = 0

  render() {
    this.renderCounter++
    return <h2>{this.props.name} rendered: {this.renderCounter}</h2>
  }
}

export default class App extends React.Component {
  state = { 
    renderCounter: 1,
  }

  onButtonPress = () => {
    this.setState({ renderCounter: this.state.renderCounter + 1 })
  }

  render() {
    return (
      <div>
        <h2>App rendered: {this.state.renderCounter}</h2>
        <ImpureComponent name="Impure Child Component" />
        <PureComponent name="Pure Child Component" />
        <button id="button" onClick={this.onButtonPress}><h2>Trigger</h2></button>
      </div>
    )
  }
}`.trim();

const PureComponents4 = `
let pureCounter = 0
let impureCounter = 0

const PureComponent = React.memo(({ name }) => {
  pureCounter++
  
  return <h2>{name} rendered: {pureCounter}</h2>
})

const ImpureComponent = ({ name }) => {
  impureCounter++

    return <h2>{name} rendered: {impureCounter}</h2>
}

export default class Controll extends React.Component {
  state = { 
    renderCounter: 1,
  }

  onButtonPress = () => {
    this.setState({ renderCounter: this.state.renderCounter + 1 })
  }

  render() {
    return (
      <div>
        <h1>Pure Functional Component</h1>
        <h2>App rendered: {this.state.renderCounter}</h2>
        <ImpureComponent name="Impure Child Component" />
        <PureComponent name="Pure Child Component" />
        <button id="button" onClick={this.onButtonPress}><h2>Trigger Render</h2></button>
      </div>
    )
  }
}`.trim();

const PureComponents5 = `
class ComponentShouldComponentUpdate extends React.Component {
  renderCounter = 0

  shouldComponentUpdate(nextProps) {
    return nextProps.name !== this.props.name
  }

  render() {
    this.renderCounter++
    return <h2>{this.props.name} rendered: {this.renderCounter}</h2>
  }
}

class Component extends React.Component {
  renderCounter = 0

  render() {
    this.renderCounter++
    return <h2>{this.props.name} rendered: {this.renderCounter}</h2>
  }
}

export default class Controll extends React.Component {
  state = { 
    renderCounter: 1,
  }

  onButtonPress = () => {
    this.setState({ renderCounter: this.state.renderCounter + 1 })
  }

  render() {
    return (
      <div>
        <h1>Should Component Update</h1>
        <h2>App rendered: {this.state.renderCounter}</h2>
        <Component name="Component Should Update" />
        <ComponentShouldComponentUpdate name="Component Should Not Update"   someProp={this.state.renderCounter} />
        <button id="button" onClick={this.onButtonPress}><h2>Trigger Render</h2></button>
      </div>
    )
  }
}`.trim();

const controlled = `
class App extends Component{
  state = {
    name: '',
    email: ''
  }
  
  handleChange = (e) => {
     this.setState({[e.target.name]: e.target.value})
  };
  
  
  handleSubmit = (e) => {
     e.preventDefault();
    
     this.setState({[e.target.name]:e.target.value})
  }
  
  render(){
     return(
        <>
           <form onSubmit={this.handleSubmit}>
              <input name="name" value={this.state.name} onChange={this.handleChange} />
              <input name="email" value={this.state.email} onChange={this.handleChange} />
              <button 
                disabled = {this.state.name.length > 0 ? false : true}
                onClick={this.handleSubmit}>Submit</button>
           </form>
        </>
     );
  }
}`.trim();

const Uncontrolled = `
function App() {
  const inputRef = useRef(null);
  
  const handleSubmitButton = () => {
    alert(inputRef.current.value);
  };
  return (
    <div className="App">
      <input type="text" ref={inputRef} />
      <input type="submit" value="submit" onClick={handleSubmitButton} />
    </div>
  );
}`.trim();

const Update = `
class App extends Component{
  forceUpdateHandler = () => {
    this.forceUpdate();
  };
  
  render(){
    return(
      <div>
        <button onClick= {this.forceUpdateHandler} >FORCE UPDATE</button>
        <h4>Random Number : { Math.random() }</h4>
      </div>
    );
  }
}`.trim();


class PureComp extends Component {
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
              <b>Component</b>
              <br />
              <img src={Pure} alt="Pure" className="responsive" style={redesign} />
              <br />
              <p>
                we show a random quote from a list of quotes. The quote component will be a child of another stateful component.
              </p>
              <div style={titles}>
                <PrismCode
                  code={pureComps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>
                If you run it you will see that as soon as the component is rendered it displays a random quote, but after username state changes, it displays another random quote! A functional stateless component will re render every time the state ofthe parent component changes. Due to the limitations of a functional component you cannot implement life cycle hooks like shouldComponentUpdateto make explicit checks for renders.
              </i>
              <br />
              <br />
              <h3>Pure Component</h3>
              <b>Pure component solves this issue. Pure Component implementsshouldComponentUpdate, out of the box.</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={pureComps2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>
                Will notice that even though the state of the parent changes, the quote displayed, doesn’t change. Pure component also gives a more stable UI because it will only re render when a prop on which it depends will change.It is recommended by React team that you use PureComponent instead of manually implementing shouldComponentUpdate, because PureComponent performs a shallow comparison of props and state, and reduces the chance that you’ll skip a necessary update.
              </i>
              <br />
              <h3>How would you prevent a component from rendering</h3>
              Three Ways
              <br />
              1.Pure Components shallowly compares the old state & props with the new state & props.
              <div style={titles}>
                <PrismCode
                  code={PureComponents3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>2.React.memo</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={PureComponents4}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>3.Should Component Update</b>
              <br />
              <br />
              Most likely Pure Components will be sufficient enough. However in cases of props or state structures with deeply nested objects, values won’t be compared.
              using the shouldComponentUpdate life-cycle method which is invoked on state or prop changes before render is called.
              <br />
              <div style={titles}>
                <PrismCode
                  code={PureComponents5}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Force Update</h3>
              Calling forceUpdate() will cause render() to be called on the component and skip shouldComponentUpdate().<br />
              It will skip shouldComponentUpdate(), so you're not getting the optimization benefit.<br />
              Also, using forceUpdate() "bypasses" the proper lifecycle, making your code less straight-forward and possibly harder to understand and maintain.
              <div style={titles}>
                <PrismCode
                  code={Update}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <b>10.Which feature can we use to cause a component to render only when its ID changes? </b>
              <p>shouldComponentUpdate</p>
              <br />

              <b>Controlled component</b>
              <br />
              We have 2 ways to handle the input value: Controlled & Uncontrolled
              <p>In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.</p>
              <ul>
                <li>In a controlled component, the form data is handled by the state within the component.</li>
                <li>The controlled component is a way that you can handle the form input value using the state and to change the input value there is only one way to change it is using setState or useState</li>
                <li>Change this state using one of the events like onChange and when the user starts writing any character setState or useState will be called and update the state of this input then it will add the new value inside the input.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={controlled}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Uncontrolled Components</b>
              <br />
              <p>The uncontrolled component is like traditional HTML form inputs that you will not be able to handle the value by yourself but the DOM will take care of handling the value of the input and save it then you can get this value using React Ref</p>

              <div style={titles}>
                <PrismCode
                  code={Uncontrolled}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Use the controlled component when you create</b>
              <ul>
                <li>Form validation so you always need to know the value of the input when typing to check if it’s a valid character or not!</li>
                <li>Disable the submit button unless all fields have valid data</li>
                <li>If you have a specific format like the credit card input</li>
              </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(PureComp));
