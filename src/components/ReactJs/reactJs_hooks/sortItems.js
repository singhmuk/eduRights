import React, { Component } from 'react';
import PrismCode from '../prismCode';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../styles.css'
import Sidebar from '../sidebar';


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


const countProgress = `
class App extends Component {
  state = {
      progress: 0,
      score: 0
    };  
    
    
  handleClick = () => {
      this.setState(() => {
        if (this.state.progress + 10 === 100) {
          return { progress: 0, score: this.state.score + 1 };
        }
        return { progress: this.state.progress + 10 };
      });
    }

  render() {
    const style = { width: this.state.progress + '%' };
    
    return (
      <div onClick={this.handleClick}>
        {'Score: ' + this.state.score} <br />
        {this.state.progress + '%'}
        <div className="bar" style={style} />
      </div>
    );
  }
}


//App.css
.bar {
  width: 0;
  height: 20px;
  transition: width 0.3s;
  background: #21d147;
  cursor: pointer;
}`.trim();

const contTimmer = `
class App extends Component {
  state = {
    isActive: false,
    secondsElapsed: 1800000 / 1000 //time in seconds
  };

  getHours() {
    return ("0" + Math.floor(this.state.secondsElapsed / 3600)).slice(-2);
  }

  getMinutes() {
    return ("0" + Math.floor((this.state.secondsElapsed % 3600) / 60)).slice(-2);
  }

  getSeconds() {
    return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
  }

  startTime = () => {
    this.setState({ isActive: true });
    
    this.countdown = setInterval(() => {
      this.setState({ secondsElapsed: this.state.secondsElapsed - 1 }) 
    }, 1000);
  };

  resetTime = () => {
    clearInterval(this.countdown);
    this.setState({
        secondsElapsed: 1800000 / 1000,
        isActive: false
    });
  };

  pauseTime = () => {
    clearInterval(this.countdown);
    this.setState({ isActive: false });
  };

  render() {
    return (
      <div>
        <div>
          <span>{this.getHours()} : {this.getMinutes()} : {this.getSeconds()}</span>
        </div>
        <div>
          <button onClick={this.state.isActive ? this.pauseTime : this.startTime}>
            Start/Pause
          </button>
          <button onClick={this.resetTime}>Reset</button>
        </div>
      </div>
    );
  }
}`.trim();

const pause = `
const App=()=>{
  const [count, setCount]=useState(0);
  const [isFalse,setIsFalse]=useState(false);

  const handleCount=()=>{
   
       if(isFalse){
           setCount(count+1)
       }
       else{
           setCount(count-1)
       }
  }
  
  const handleBtn=()=>{
   setIsFalse(!isFalse);
  }

  return(
   <div>
       {count}<br/>
       <button onClick={handleCount}>Count</button>
       <button onClick={handleBtn}>Handle</button>

   </div>
  )
}

export default App;
`.trim();

const fizzBuzz = `
class App extends Component {
  state = {
    fizzBuzz: '',
    counter: 1
  };
  
  isFizzBuzz = () => {
    const counter = this.state.counter;
    let fizzBuzz = this.state.fizzBuzz;
    
    if (counter % 3 === 0) { fizzBuzz += 'Fizz, ' }
    if (counter % 5 === 0) { fizzBuzz += 'Buzz, ' };
    if (counter % 5 && counter % 3) { fizzBuzz += ''$'{counter}, ' };
    
    this.setState({ fizzBuzz: fizzBuzz });
  };
  increment = () => {
    this.setState((prevState) => ({ counter: ++prevState.counter }));
    this.isFizzBuzz();
  };
  decrement = () => {
    this.setState((prevState) => ({ counter: --prevState.counter }));
    this.isFizzBuzz();
  };
  render() {
    return (
      <div>
        <button onClick={this.increment}>+</button>{ }
        <button onClick={this.decrement}>-</button><br /><br />
        {this.state.fizzBuzz}
      </div>
    );
  }
}`.trim();

const ratings = `
const Star = ({ starId, marked }) => {
  return (
    <span
      star-id={starId}
      style={{ color: "green", cursor: "pointer" }}
    >
      {marked ? "★" : "☆"}  // "/u2605" : "/u2606"
    </span>
  );
};

const App = () => {
  const [selection, setSelection] = React.useState(0);

  const [rating, setRating] = React.useState(0);

  const hoverOver = event => {
    let starId = 0;
    if (event && event.target && event.target.getAttribute("star-id")) {
      starId = event.target.getAttribute("star-id");
    }
    setSelection(starId);
  };

  return (
    <div
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      onClick={event => setRating(event.target.getAttribute("star-id"))}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star starId={i + 1} marked={selection ? selection > i : rating > i} />
      ))}
    </div>
  );
};`.trim();



class SortItems extends Component {
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
              <b>1.onClick increase 10% progress bar</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={countProgress}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>2. A click to start the countdown timer and a second one to Pause the timer in the same button</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={contTimmer}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>3. Click on pause button to decrese count again Click on pause to start increse count</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={pause}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>4. FizzBuzz :</b> If counter = 3, then print 'Fizz', counter = 5, 'Buzz' else print counter values.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={fizzBuzz}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>7. Start Rating</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={ratings}
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

export default (withStyles(styles)(SortItems));