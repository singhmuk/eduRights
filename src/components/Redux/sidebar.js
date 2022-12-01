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
        <MenuItem><Link to='/introRedux' className={classes.line}>Intro</Link></MenuItem>
        <MenuItem><Link to='/counter' className={classes.line}>Counter Select</Link></MenuItem>
        <MenuItem><Link to='/reduxState' className={classes.line}>Redux State-Curd</Link></MenuItem>
        <MenuItem><Link to='/reduxMethods' className={classes.line}>Redux Methods</Link></MenuItem>
        <MenuItem><Link to='/react_redux' className={classes.line}>Filter</Link></MenuItem>
        <MenuItem><Link to='/reduxCurd' className={classes.line}>Redux Curd</Link></MenuItem>
        <MenuItem><Link to='/expenseTraMern' className={classes.line}>ReactCurdPlaceholder</Link></MenuItem>
        <MenuItem><Link to='/contactKeeperApi' className={classes.line}>ReactReduxCurdPlaceholder</Link></MenuItem>
        <MenuItem><Link to='/mernRedux' className={classes.line}>Mern Redux</Link></MenuItem>
        <MenuItem><Link to='/signUp' className={classes.line}>SignUP</Link></MenuItem>
        <MenuItem><Link to='/git' className={classes.line}>Git</Link></MenuItem>
        <MenuItem><Link to='/gitConcepts' className={classes.line}>Git Concepts</Link></MenuItem>
        <MenuItem><Link to='/skills' className={classes.line}>Skills</Link></MenuItem>
        <MenuItem><Link to='/comskills' className={classes.line}>Comskills</Link></MenuItem>
        <MenuItem><Link to='/techskills' className={classes.line}>Techskills</Link></MenuItem>
        <MenuItem><Link to='/techinto' className={classes.line}>TechsInto</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}
