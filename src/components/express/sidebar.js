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
        <MenuItem><Link to='/introExpress' className={classes.line}>IntroExpress</Link></MenuItem>
        <MenuItem><Link to='/resDocs' className={classes.line}>Responds</Link></MenuItem>
        <MenuItem><Link to='/routerDocs' className={classes.line}>Router</Link></MenuItem>

        {/* ---------- */}
        <MenuItem><Link to='/middleware' className={classes.line}>Middleware</Link></MenuItem>
        <b>Loopback</b>
        <MenuItem><Link to='/loopbackcli' className={classes.line}>Loopbackcli</Link></MenuItem>
        <MenuItem><Link to='/jqueries' className={classes.line}>jqueries</Link></MenuItem>
        <MenuItem><Link to='/backbonejs' className={classes.line}>Backbone</Link></MenuItem>
        <MenuItem><Link to='/underscorejs' className={classes.line}>Underscore</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}
