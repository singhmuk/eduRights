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

const ReactShareSimplified = `
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  EmailIcon,
  WhatsappIcon
} from "react-share";


class ReactShareSimplified extends Component {
  render() {
    const {url,title,facebook,googlePlus,twitter,whatsapp,email,addClass,Previewemail} = this.props;
    let {facebookClass,twitterClass,googlePlusClass,whatsappClass,emailClass} = this.props || "shareIcon";
    console.log("iconsize",this.props.iconSize);
    
    let iconSize = 32;
    if(this.props.iconSize!==undefined){
        iconSize = this.props.iconSize
    }
    
    return (
      <span className={addClass}>
        {facebook && (<FacebookShareButton url={url} quote={title} style={{outline:'none'}} className={facebookClass}>
          <FacebookIcon
            size={iconSize}
            round />
        </FacebookShareButton>)}
        
        {googlePlus && (<GooglePlusShareButton url={url} quote={title} style={{outline:'none'}} className={googlePlusClass}>
          <GooglePlusIcon
            size={iconSize}
            round />
        </GooglePlusShareButton>)}
        
        {twitter && (<TwitterShareButton url={url} quote={title} style={{outline:'none'}}  className={twitterClass}>
          <TwitterIcon
            size={iconSize}
            round />
        </TwitterShareButton>)}
        
        {whatsapp && (<WhatsappShareButton url={url} quote={title} style={{outline:'none'}} className={whatsappClass}>
          <WhatsappIcon
            size={iconSize}
            round />
        </WhatsappShareButton>)}
        
        {email && (<EmailShareButton url={url} quote={title} style={{outline:'none'}} className={emailClass}>
          <EmailIcon
            size={iconSize}
            round />
        </EmailShareButton>)}
        {Previewemail && (<EmailShareButton url={url} quote={title} style={{outline:'none'}} className={emailClass}>
          <EmailIcon
            size={iconSize}
            round />
        </EmailShareButton>)}
      </span>
    );
  }
}
export default ReactShareSimplified;`.trim();

const ShareApp = `
import ReactShareSimplified from './dist/ReactShareSimplified'
import './App.css';

class App extends Component {
  render() {
    const url = "https://www.github.com";
    const title = "React share simplified";
    return (
      <div className="App">
        <div className="align-inline" style={{marginTop:'10px'}}>
          <span className="share-title">Share: </span>
          <ReactShareSimplified
            url={url}
            title={title}
            facebook={true}
            facebookClass="iconStyle"
            googlePlus={true}
            googlePlusClass="iconStyle"
            twitter={true}
            twitterClass="iconStyle"
            email={true}
            emailClass="iconStyle"
            whatsapp={true}
            whatsappClass="iconStyle"
            iconSize={32}
            addClass="align-inline"
          />
        </div>
      </div>
    );
  }
}

export default App;`.trim();

const ShareAppCss = `
.share-title {
  justify-content: center;
  align-self: center;
  font-size: 17px;
  font-family: "Nunito";
  font-weight: 500;
  margin-right: 5px;
}
.align-inline {
  display: flex;
  flex: 1;
  flex-direction: row;
}
.iconStyle {
    margin: 0 5px 5px;
    cursor: pointer;
}`.trim();

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

const MoveButton = `
const MoveButton = (props) => {
  return (
      <button onClick={props.onClick}>
          Click To Move
      </button>
  );
}

const BoxOne = () => <p>Box1</p>;

const BoxTwo = () => <p>Box2</p>;


class App extends Component {
state = { positions: 0 }

handleClick = () => {
  this.setState({ positions: (this.state.positions + 1) % 3 })
}

render () { 
const positions = this.state.positions;
  return (
      <div>
          { positions === 0 ? <MoveButton onClick={this.handleClick}/> : ''}
          <BoxOne />
          { positions === 1 ? <MoveButton onClick={this.handleClick}/> : ''}
          <BoxTwo />
          { positions === 2 ? <MoveButton onClick={this.handleClick}/> : ''}
      </div>
  );
}
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
              <h3>1.Share</h3>
              <b>dist/ReactShareSimplified.js</b>
              <div style={titles}>
                <PrismCode
                  code={ReactShareSimplified}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>App.js</b>
              <div style={titles}>
                <PrismCode
                  code={ShareApp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>App.css</h3>
              <div style={titles}>
                <PrismCode
                  code={ShareAppCss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>2.Min-Max date</h3>
              <div style={titles}>
                <PrismCode
                  code={minMaxs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>3.onClick move button</h3>
              <div style={titles}>
                <PrismCode
                  code={MoveButton}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>4.slideshow</h3>
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
