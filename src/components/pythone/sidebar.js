import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  line: {
    textDecoration: 'none'
  }
}));

export default function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuList>
        <MenuItem><Link to='/introPython' className={classes.line}>intro Python</Link></MenuItem>
        <MenuItem><Link to='/tuples' className={classes.line}>Tuples</Link></MenuItem>
        <MenuItem><Link to='/stringPy' className={classes.line}>Strings</Link></MenuItem>
        <MenuItem><Link to='/iteratorsPy' className={classes.line}>Iterators</Link></MenuItem>
        <MenuItem><Link to='/json' className={classes.line}>Json</Link></MenuItem>
        <MenuItem><Link to='/mathematics' className={classes.line}>Mathematics</Link></MenuItem>
        <MenuItem><Link to='/oops_' className={classes.line}>Oops</Link></MenuItem>
        <MenuItem><Link to='/abstract' className={classes.line}>Abstract</Link></MenuItem>
        <MenuItem><Link to='/exceptionsPy' className={classes.line}>ExceptionsHandling</Link></MenuItem>

        <MenuItem><Link to='/pyIntro' className={classes.line}>Pickle</Link></MenuItem>

        <MenuItem><Link to='/threadings' className={classes.line}>Thread</Link></MenuItem>
        <MenuItem><Link to='/collections' className={classes.line}>Collections</Link></MenuItem>
        <MenuItem><Link to='/logging' className={classes.line}>Logging</Link></MenuItem>
        <MenuItem><Link to='/regex' className={classes.line}>Regex</Link></MenuItem>
        <MenuItem><Link to='/tkinter' className={classes.line}>TKinter</Link></MenuItem>

        <MenuItem><Link to='/logicalspy' className={classes.line}>Logicals</Link></MenuItem>
        <MenuItem><Link to='/pyLogic' className={classes.line}>PyLogic</Link></MenuItem>
        <MenuItem><Link to='/csv' className={classes.line}>CsvPython</Link></MenuItem>
        <br />
        Flask
        <MenuItem><Link to='/conroutes' className={classes.line}>routes</Link></MenuItem>
        <MenuItem><Link to='/httpsMethods' className={classes.line}>Https</Link></MenuItem>
        <MenuItem><Link to='/flasksIn' className={classes.line}>Interviews</Link></MenuItem>

        <MenuItem><Link to='/flask_signUp' className={classes.line}>Flask_signUp</Link></MenuItem>
        <MenuItem><Link to='/get_search' className={classes.line}>Get_Search</Link></MenuItem>
        <MenuItem><Link to='/load_search' className={classes.line}>Load_Search</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}
