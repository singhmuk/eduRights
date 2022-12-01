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

const unlike = `
const App = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('green');
  const [size, setSize] = useState(1);
  
  const handleSetCount = () => {
    (count === 4) ? setCount(0) : setCount(count + 1); 
    (count === 4) ? setSize(1) : setSize(size + .05); 
  };
  
  const handleSetColor = () => {
    if(count === 1) setColor('red');
    if(count === 2) setColor('blue');
    if(count === 3) setColor('pink');
    if(count === 4) setColor('yellow');
  };
  
  const heartStyle = {
    color: color,
    transform: 'scale('$'{size})'
  };
  
  return (
    <>
      <button onClick={() => { handleSetCount(); handleSetColor() } }>
        <i>Like</i>
      </button>
      <p style={heartStyle}>You have liked this {count} times</p>
    </>
  );
}`.trim()

const checkbox = `
const App = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleClick = () => {
    setIsChecked(isChecked => !isChecked);
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleClick} />
    </div>
  );
}`.trim()

const radio = `
const App = () => {
  const [size, setSize] = useState("")

  const handleChange = (e) => {
    setSize(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('You chose the '$'{size} pizza.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="title">Select a pizza size:</p>
      <label>Small</label>
      <input type="radio" value="small" checked={size === "small"} onChange={handleChange} />
      <label>Medium</label>
      <input type="radio" value="medium" checked={size === "medium"} onChange={handleChange} />
      <label>Large</label>
      <input type="radio" value="large" checked={size === "large"} onChange={handleChange} />

      <button>Make your choice</button>
    </form>
  );
}`.trim()

const select = `
const options = ["Select an Option", "First", "Second", "Third"]

const App = () => {
  const [value, setValue] = useState('Select an Option')

  const onChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div>
      <select value={value} onChange={onChange}>
        {options.map(option => {
          return <option value={option}>{option}</option>
        })}
      </select>
    </div>
  )
}`.trim();


const scroll = `
const items = [...Array(100)].map((i) => 'Item '$'{i}');

const App = () => (
  <div className="container">
    <div className="left-col">
      Left col
    </div>
    
    <div className="center-col">
      <ul>
        {items.map((item, i) => (<li key={'item_'$'{i}'}>{ item }</li>))}
      </ul>
    </div>
    
    <div className="left-col">
      Right col
    </div>
  </div>
);


//App.css
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.left-col {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(106, 91, 235);
}

.center-col {
  flex: 1;
  background: #aaa;
  overflow-y: scroll;
}`.trim();

const profiles = `
class App extends Component {
  state = { selectedFile: null };
  
  onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
  
    formData.append(
      "myFile",
      this.state.selectedFile,
    );
  
    // Request made to the backend api
    axios.post("api/uploadfile", formData);
  };
  
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } 
  };
  
  render() {
    return (
      <div>
          <div>
              <input type="file" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>
                Upload!
              </button>
          </div>
        {this.fileData()}
      </div>
    );
  }
}`.trim();


const code = `
const moods = [
  { name: "Happy", "emoji": "😀" }, 
  { name: "Angry", "emoji": "😠" },
  { name: "Really Angry", "emoji": "😡" },
  { name: "Sad", "emoji": "🙁" },
  { name: "Really Sad", "emoji": "☹️" },
  { name: "Poop", "emoji": "💩" }
];

class App extends React.Component {
  state = {
    mood: { 
      name: "Emoji", 
      emoji: null 
    }
  }

handleButtonClick = () => {
    const mood = moods[Math.floor(Math.random() * moods.length)];
    this.setState({ mood });
}

render() {
    return (
        <div>
          <div>{ this.state.mood.emoji }</div>
          <div>{ this.state.mood.name }</div>
          
            <button onClick={this.handleButtonClick}>
              Click
            </button>
        </div>
    )
  }
}`.trim();



class Like extends Component {
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
              <b>1. Like</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={unlike}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              2. checkbox.js
              <div style={titles}>
                <PrismCode
                  code={checkbox}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              3. radio.js
              <div style={titles}>
                <PrismCode
                  code={radio}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>4. Select</h3>
              <br />
              <div style={titles}>
                <PrismCode
                  code={select}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. Scroll</h3>
              <div style={titles}>
                <PrismCode
                  code={scroll}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Upload Profile</h3>
              <div style={titles}>
                <PrismCode
                  code={profiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. EMJ</h3>
              <div style={titles}>
                <PrismCode
                  code={code}
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

export default (withStyles(styles)(Like));
