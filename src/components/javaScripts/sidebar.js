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
        <MenuItem><Link to='/introJs' className={classes.line}>IntroJs-Proxies</Link></MenuItem>
        <MenuItem><Link to='/prototypes' className={classes.line}>Prototypes-Defa. Param</Link></MenuItem>
        <MenuItem><Link to='/JsObjects' className={classes.line}>JsObject</Link></MenuItem>
        <MenuItem><Link to='/array' className={classes.line}>String</Link></MenuItem>

        <MenuItem><Link to='/this' className={classes.line}>This-call(), apply(), bind()</Link></MenuItem>
        <MenuItem><Link to='/clousers' className={classes.line}>Clousers</Link></MenuItem>
        <MenuItem><Link to='/oops' className={classes.line}>Oops-GetSet</Link></MenuItem>
        <MenuItem><Link to='/regular' className={classes.line}>Regular</Link></MenuItem>
        <MenuItem><Link to='/keyedCollections' className={classes.line}>Keyed Collections</Link></MenuItem>

        <MenuItem><Link to='/arrayApi' className={classes.line}>Indexed colle-Arr Obj</Link></MenuItem>
        <MenuItem><Link to='/logic' className={classes.line}>Logic</Link></MenuItem>
        <MenuItem><Link to='/findOutput' className={classes.line}>findOutput</Link></MenuItem>
        <MenuItem><Link to='/mcqjs' className={classes.line}>McqJs</Link></MenuItem>

        <MenuItem><Link to='/hackerRank' className={classes.line}>HackerRank1</Link></MenuItem>
        <MenuItem><Link to='/hackerRank6' className={classes.line}>HackerRank2</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}
