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
        <MenuItem><Link to='/setUpFiles' className={classes.line}>SetUp</Link></MenuItem>
        <MenuItem><Link to='/javaScript' className={classes.line}>JavaScript</Link></MenuItem>
        <MenuItem><Link to='/reactCurdMern' className={classes.line}>Mern React</Link></MenuItem>
        <MenuItem><Link to='/4_reactCurdHooks' className={classes.line}>Mern React Hooks</Link></MenuItem>
        <MenuItem><Link to='/pagination' className={classes.line}>Sea Sort Pagi Auth_Token</Link></MenuItem>
        <MenuItem><Link to='/propsModel' className={classes.line}>SS pagination-Captcha</Link></MenuItem>
        <MenuItem><Link to='/imageGallery' className={classes.line}>ImageGallery</Link></MenuItem>
        <MenuItem><Link to='/stripes' className={classes.line}>Stripes-Signin with gfb</Link></MenuItem>
        <MenuItem><Link to='/paginationsMern' className={classes.line}>Paginations-push_notifis</Link></MenuItem>
        <MenuItem><Link to='/googleMap' className={classes.line}>GoogleMap</Link></MenuItem>
        <MenuItem><Link to='/videoChat' className={classes.line}>VideoChat</Link></MenuItem>
        <MenuItem><Link to='/qrSccaners' className={classes.line}>QrCode-reCapcha</Link></MenuItem>
        <MenuItem><Link to='/react_share' className={classes.line}>Share-Stripe</Link></MenuItem>
        <MenuItem><Link to='/socialSignUp' className={classes.line}>SocialSignUp</Link></MenuItem>
        <MenuItem><Link to='/mernSocial' className={classes.line}>MernSocial</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}

