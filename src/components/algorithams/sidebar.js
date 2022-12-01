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
        <MenuItem><Link to='/introAlgo' className={classes.line}>Deadlock</Link></MenuItem>
        <MenuItem><Link to='/Stack' className={classes.line}>Stack</Link></MenuItem>
        <MenuItem><Link to='/Queue' className={classes.line}>Queue</Link></MenuItem>
        <MenuItem><Link to='/linkedList' className={classes.line}>LinkedList</Link></MenuItem>
        <MenuItem><Link to='/heap' className={classes.line}>Heap</Link></MenuItem>
        <MenuItem><Link to='/trees' className={classes.line}>Tree</Link></MenuItem>
        <MenuItem><Link to='/graph' className={classes.line}>Graph</Link></MenuItem>
        <MenuItem><Link to='/sort' className={classes.line}>QuickSort</Link></MenuItem>
        <MenuItem><Link to='/searchAlgo' className={classes.line}>Search</Link></MenuItem>
        <MenuItem><Link to='/topTech' className={classes.line}>TopTech</Link></MenuItem>
        <MenuItem><Link to='/stringAlgo' className={classes.line}>String</Link></MenuItem>
        <MenuItem><Link to='/arrayAlgo' className={classes.line}>Array</Link></MenuItem>
        <MenuItem><Link to='/nestingArrAlgo' className={classes.line}>Nesting Array</Link></MenuItem>
        <MenuItem><Link to='/numbersAlgo' className={classes.line}>Numbers</Link></MenuItem>
        <MenuItem><Link to='/gameAlgo' className={classes.line}>Game</Link></MenuItem>
        <MenuItem><Link to='/arrayStrAlgo' className={classes.line}>ArrayStr</Link></MenuItem>
        <MenuItem><Link to='/arrayNumAlgo' className={classes.line}>ArrayNum</Link></MenuItem>
        <MenuItem><Link to='/dslogic8' className={classes.line}>Logic8</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}

