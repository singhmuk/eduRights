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
        <MenuItem><Link to='/devtools' className={classes.line}>Devtools</Link></MenuItem>
        <MenuItem><Link to='/cssbasics' className={classes.line}>CSS</Link></MenuItem>
        <MenuItem><Link to='/sass' className={classes.line}>SASS</Link></MenuItem>
        <MenuItem><Link to='/html_1' className={classes.line}>html 1</Link></MenuItem>
        <MenuItem><Link to='/restApi' className={classes.line}>RestApi</Link></MenuItem>
        <MenuItem><Link to='/jest' className={classes.line}>Jest</Link></MenuItem>
        <MenuItem><Link to='/matchers' className={classes.line}>Matchers</Link></MenuItem>
        <MenuItem><Link to='/enzymes' className={classes.line}>Enzymes</Link></MenuItem>
        <MenuItem><Link to='/enzyme2' className={classes.line}>Enzymes2</Link></MenuItem>
        <MenuItem><Link to='/enzyme3' className={classes.line}>Enzymes3</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}

