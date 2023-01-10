import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
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


const minMaxs = `
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div>
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        inputProps={{
          min: "2020-10-10"
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <p>End date</p>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        inputProps={{
          min: "2020-10-10"
        }}
      />
    </form>
    </div>
  );
}

export default App;`.trim();

const slideshow = `
import "./slideshow.css";

const colors = ["green", "blue", "yellow"];
const delay = 2500;

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ), delay);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: 'translate3d('$'{-index * 100}%, 0, 0)' }}
      >
        {colors.map((backgroundColor, index) => (
          <div className="slide" key={index} style={{ backgroundColor }}></div>
        ))}
      </div>

      <div>
        {colors.map((_, idx) => (
          <div
            className={'slideshowDot'$'{index === idx ? " active" : ""}'}
            onClick={() => { setIndex(idx) }} />
        ))}
      </div>
    </div>
  );
}`.trim();

const slideshowCss = `
.slideshow {
  margin: 0 auto;
  overflow: hidden;
  max-width: 500px;
}

.slideshowSlider {
  white-space: nowrap;
  transition: ease 1000ms;
}

.slide {
  display: inline-block;

  height: 400px;
  width: 100%;
  border-radius: 40px;
}

.slideshowDots {
  text-align: center;
}

.slideshowDot {
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #c4c4c4;
}

.slideshowDot.active {
  background-color: #6a0dad;
}`.trim();


class TicGame extends Component {
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
              <h3>1. Min-Max date</h3>
              <div style={titles}>
                <PrismCode
                  code={minMaxs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Slideshow</h3>
              <div style={titles}>
                <PrismCode
                  code={slideshow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>slideshow.css</b>
              <div style={titles}>
                <PrismCode
                  code={slideshowCss}
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

export default (withStyles(styles)(TicGame));
