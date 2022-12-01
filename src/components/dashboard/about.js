import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import logo from '../../assets/small_size.jpg';
import { Link } from 'react-router-dom';
import LinearDeterminate from './about/linear';
import VerticalLinearStepper from './about/stepper';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  img: {
    borderRadius: '50%',
    height: '300px',
    width: '200px',
    marginTop: -40,
    paddingLeft: 20
  },
  line: {
    textDecoration: 'none',
    color: 'white',
    float: 'right'
  }
}));


export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar><Link to='/' className={classes.line}>Home</Link>
          <Typography variant="h6" noWrap>
            MERN Stack Developer
          </Typography>
        </Toolbar>
      </AppBar>
          
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <img src={logo} alt="Logo" className={classes.img} />;
        <b>Mukesh Singh</b>
        <b>email: mukeshcs94@gmail.com</b>
        <b>Call: 6200060755</b>
        
            <br/>
          <ListItem style={{backgroundColor:'skyblue', fontSize:'25px'}}>Skills</ListItem>
          <Divider />
          <ListItem>CSS</ListItem>
          <ListItem>Google Material UI</ListItem>
          <ListItem>JavaScript</ListItem>
          <ListItem>React Js</ListItem>
          <ListItem>Redux</ListItem>
          <ListItem>MongoDB</ListItem>
          <ListItem>Node Js</ListItem>
          <ListItem>Express Js</ListItem>
          <ListItem>Python</ListItem>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
        Accomplished software developer with 3.10 years of experience in development of web 
        applications. Excels in every stage of the life cycle of software development, including 
        design creation, coding, debugging, and maintenance. Advanced skills and knowledge of 
        leading programming tools with a strong background in mathematics, algorithms, and 
        data-processing logic...
        </Typography>
        <br/>
        
        <h3>EXPERIENCE: 3.10+ YEAR</h3>
        <h3>PROJECTS:</h3>
        <LinearDeterminate />
        <VerticalLinearStepper />
        <br/>
        <br/>
        <h2>Skills</h2>
        <LinearDeterminate />
        <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model
</li>
        <li>Thorough understanding of React.js and its core principles</li>
        <li>Experience with popular React.js workflows (Redux)</li>
        <li>Familiarity with newer specifications of EcmaScript</li>
        <li>Familiarity with RESTful APIs</li>
        <li>Work with Server side technologies like NodeJs, ExpressJs</li>
        <li>Knowledge of modern authorization mechanisms, such as JSON Web Token</li>
        <li>Experience with common front-end development tools such as Babel, Webpack, NPM, etc.</li>
        <li>Ability to understand business requirements and translate them into technical requirements</li>
           <br/>
           <br/>
           <b>This is an educational website used technologies are:</b><br/>
           ReactJs as front-end,<br/>
           Redux used for state management,<br/>
           nodeJs, ExpressJs used as server site,<br/>
           and Mongodb as database.
            <br/>
            <br/>
            <br/>
        
      </main>
    </div>
  );
}
