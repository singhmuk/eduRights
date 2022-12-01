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

const refsReact = `
Problem:
this.setState({
  counter: this.state.counter + this.props.increment,
});

Answer:
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
`.trim();

const updateState = `
Problem: Have a component that receives a prop that looks like this:
const styles = {
  font: {
      size: {
          value: '22',
          unit: 'px'
      },
      weight: 'bold',
      color: '#663300',
      family: 'arial',
      align: 'center'
  }
};

How to update only the align property?

Answer: 
const { ...styling } = styles;
const [style, setStyle] = useState(styling);
...

setStyle(prevStyle => ({
      ...prevStyle,
      font: { ...prevStyle.font, align: event.target.value }
  }));


`.trim();

const conditionally = `
var condition = true;

var component = (
  <div
    value="foo"
    { ...( condition && { disabled: true } ) } />
);
`.trim();

const validation = `
import PropTypes from 'prop-types';

class User extends React.Component {
  render() {
    return (
      <h1>Welcome, {this.props.name}</h1>
      <h2>Age, {this.props.age}
    );
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired

};
`.trim();

const useCallback = `
const fn = () => 42 // assuming expensive calculation here
const memoFn = useCallback(fn, [dep]) // (1)
const memoFnReturn = useMemo(fn, [dep]) // (2)
`.trim();

const passProps = `
class MyComponent extends React.Component {    
  constructor(props) {
      super(props)

      console.log(this.props)
  }
}
`.trim();

const getLists = ``.trim();

// const getLists = ``.trim();

// const getLists = ``.trim();

// const getLists = ``.trim();


class CodingInter extends Component {
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
              <h3>What's wrong with that code?</h3>
              <div style={titles}>
                <PrismCode
                  code={refsReact}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <i>Because <b>this.props</b> and <b>this.state</b> may be updated asynchronously, you should not rely on their 
              values for calculating the next state. To fix it, use a second form of <b>setState()</b> that accepts a 
              function rather than an object. That function will receive the previous state as the first argument, and 
              the props at the time the update is applied as the second argument</i>
              <br/>

              <h3>How do I update state on a nested object with useState()?</h3>
              <div style={titles}>
                <PrismCode
                  code={updateState}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>We need to use spread syntax. Also while trying to update current state based on previous, use the callback pattern 
                  os setState:</i>
              <br/>

              <h3>How to conditionally add attributes to React components?</h3>
              For certain attributes, React is intelligent enough to omit the attribute if the value you pass to it is not truthy. 
              <br/>
              <b>Ex. </b>
              <div style={titles}>
                <PrismCode
                  code={conditionally}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>How to apply validation on props in ReactJS?</h3>
              When the application is running in development mode, React will automatically check for all props that we set on 
              components to make sure they must right correct and right data type. For incorrect type, it will generate warning 
              messages in the console for development mode whereas it is disabled in production mode due performance impact. The 
              mandatory prop is defined with isRequired.
              <br/>
              <br/>
              The set of predefined prop types are below:
              <ol>
                <li><b>React.PropTypes.string</b></li>
                <li><b>React.PropTypes.number</b></li>
                <li><b>React.PropTypes.func</b></li>
                <li><b>React.PropTypes.node</b></li>
                <li><b>React.PropTypes.bool</b></li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={validation}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>How would you go about investigating slow React application rendering?</h3>
              One of the most common issues in React applications is when components re-render unnecessarily. There are two 
              tools provided by React that are helpful in these situations:
              <ul>
                <li><b>React.memo(): </b>This prevents unnecessary re-rendering of function components.</li>
                <li><b>PureComponent: </b>This prevents unnecessary re-rendering of class components</li>
              </ul>
              <br/>
              Both of these tools rely on a shallow comparison of the props passed into the component—if the props have not 
              changed, then the component will not re-render. While both tools are very useful, the shallow comparison brings 
              with it an additional performance penalty, so both can have a negative performance impact if used incorrectly. 
              By using the React Profiler, performance can be measured before and after using these tools to ensure that 
              performance is actually improved by making a given change.
              <br/>

              <h3>What is wrong with this code?</h3>
              With <b>useCallback</b> we memoize functions, <b>useMemo</b> memoizes any computed value:
              <ul>
                <li>will return a memoized version of fn - same reference across multiple renders, as long as dep is the same. 
                  But every time you invoke memoFn, that complex computation starts again.</li><br/>
                <li>will invoke fn every time dep changes and remember its returned value (42 here), which is then stored in 
                  memoFnReturn.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={useCallback}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>When is it important to pass props to super(), and why?</h3>
              The only one reason when one needs to pass props to <b>super()</b> is when you want to access <b>this.props</b> 
              in constructor:
              <div style={titles}>
                <PrismCode
                  code={passProps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Passing or not passing props to super has no effect on later uses of this.props outside constructor.</i>
              <br/>

              <h3>When to use useState vs useReducer?</h3>
              <ul>
                <li><b>use useState if you have: </b>
                <ul>
                  <li>JavaScript primitives as state</li>
                  <li>Simple state transitions</li>
                  <li>Business logic within your component</li>
                  <li>Different properties that don't change in any correlated way and can be managed by multiple useState hooks.</li>
                </ul>
                </li><br/>
                <li><b>use useReducer if you have: </b>
                <ul>
                  <li>JavaScript objects or arrays as state</li>
                  <li>Complex state transitions</li>
                  <li>Different properties tied together that should be managed in one state object (when state depends on state).</li>
                </ul>
                </li>
              </ul>
              <br/>

              <h3>Why would you need to bind event handlers to this?</h3>
              In JavaScript, class methods are not bound by default. If forget to bind <b>this.someEventHandler</b> and pass it 
              to onChange, this will be undefined when the function is actually called.
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(CodingInter));
