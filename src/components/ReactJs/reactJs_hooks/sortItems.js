import React, { Component } from "react";
import PrismCode from "../prismCode";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../styles.css";
import Sidebar from "../sidebar";

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

const contTimmer = `
function App() {
  const [timer, setTimer] = useState(60);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    if (intervalId) return;
    const id = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    setIntervalId(id);
  };

  const pauseTimer = () => {
    if (!intervalId) return;
    clearInterval(intervalId);
    setIntervalId(null);
  };

  useEffect(() => {
    if (timer === 0) {
      pauseTimer();
    }
  }, [timer]);

  return (
    <div>
      <h1>{timer}</h1>
      <button onClick={startTimer}>{intervalId ? "Pause" : "Start"}</button>
      <button onClick={pauseTimer} disabled={!intervalId}>
        Pause
      </button>
    </div>
  );
}
`.trim();

const fizzBuzz = `
const App = () => {
  const [counter, setCounter] = useState(1);

  function handleCounter() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h1>
        {counter % 3 === 0 ? "Fizz" : ""}
        {counter % 5 === 0 ? "Buzz" : ""}
        {counter % 3 !== 0 && counter % 5 !== 0 ? counter : ""}
      </h1>
      <button onClick={handleCounter}>Next</button>
    </div>
  );
};
`.trim();

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
              <b>
                2. A click to start the countdown timer and a second one to
                Pause the timer in the same button
              </b>
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
              <b>4. FizzBuzz :</b> If counter = 3, then print 'Fizz', counter =
              5, 'Buzz' else print counter values.
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
    );
  }
}

export default withStyles(styles)(SortItems);
