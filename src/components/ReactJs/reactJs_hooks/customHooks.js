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

const useDocumentTitle = `
//Count
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


//Progress
const App =() => {
  const [count, setCount]=useState(0)
  const [text,setText]=useState('Reach Maximum')

  const handleProgress = () => {
    if(count<100){
      setCount(count+10)
    }
    else{
      setText(text)
    }
  }

  return(
    <div>
      {count<100 ? count: text}<br/>
      <button onClick={handleProgress}>Progress</button>
    </div>
  )
}
`.trim()

const DocTitleOne = `
//Counter.js
import React, { useState, useMemo } from 'react'

function Counter() {
    const [counterOne, setCounterOne] = useState(0)
    const [counterTwo, setCounterTwo] = useState(0)

    const incrementOne = () => {
        setCounterOne(counterOne + 1)
        }

    const incrementTwo = () => {
        setCounterTwo(counterTwo + 1)
        }

    const isEven = useMemo(() => {
      let i = 0
      while (i < 2000000000) i++
          return counterOne % 2 === 0
        }, [counterOne])

    return (
      <div>
        <div>
          <button onClick={incrementOne}>Count One - {counterOne}</button>
            <span>{isEven ? 'Even' : 'Odd'}</span>
            </div>
            <div>
          <button onClick={incrementTwo}>Count Two - {counterTwo}</button>
        </div>
      </div>
    )
}

export default Counter;
`.trim();

const customs = `
function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return data;
}

// import useFetch from "./useFetch";
function App(props) {
  const data = useFetch("https://jsonplaceholder.typicode.com/posts");
  return (
    <div>
      <ul>
        {data.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  );
}`.trim();



class CustomHooks extends Component {
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
              <h3>Custom Hooks</h3>
              <div style={titles}>
                <PrismCode
                  code={useDocumentTitle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Explain why and when would you use useMemo()?</h3>
              In the lifecycle of a component, React re-renders the component when an update is made. When React checks for any 
              changes in a component, it may detect an unintended or unexpected change due to how JavaScript handles equality 
              and shallow comparisons. This change in the React application will cause it to re-render unnecessarily.
              <br/>
              <br/>
              useMemo takes in a function and an array of dependencies. The dependency’s list are the elements useMemo watches: 
              if there are no changes, the function result will stay the same. Otherwise, it will re-run the function. If they 
              don’t change, it doesn’t matter if our entire component re-renders, the function won’t re-run but instead return 
              the stored result.
              <div style={titles}>
                <PrismCode
                  code={DocTitleOne}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Custom Hooks</h3>
              <p>
                Instead of HOCs and render props, we can encapsulate our logic in a React hook and then import that hook whenever
                we feel the need. In our example we can create a custom hooks for fetching data.
                A custom hook is a JavaScript function whose name starts with "use".
                     </p>
              <div style={titles}>
                <PrismCode
                  code={customs}
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

export default (withStyles(styles)(CustomHooks));
