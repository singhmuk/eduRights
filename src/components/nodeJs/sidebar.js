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
        <MenuItem><Link to='/introNodejs' className={classes.line}>Intro</Link></MenuItem>
        <MenuItem><Link to='/ejsNode' className={classes.line}>Basics</Link></MenuItem>
        <MenuItem><Link to='/buffers' className={classes.line}>Buffer</Link></MenuItem>
        <MenuItem><Link to='/evtNode' className={classes.line}>EvtEmter-Capture data</Link></MenuItem>
        <MenuItem><Link to='/childs' className={classes.line}>Child Process-fork()-exec()</Link></MenuItem>
        <MenuItem><Link to='/tut_1' className={classes.line}>Async-Await</Link></MenuItem>
        <MenuItem><Link to='/filSystems' className={classes.line}>File System</Link></MenuItem>
        <MenuItem><Link to='/codes' className={classes.line}>Codes</Link></MenuItem>
        <MenuItem><Link to='/url_shortener' className={classes.line}>Url_Shortener</Link></MenuItem>
        <MenuItem><Link to='/stripe_payment' className={classes.line}>stripe_payment</Link></MenuItem>
        <MenuItem><Link to='/sendEmail' className={classes.line}>sendEmail</Link></MenuItem>
        <MenuItem><Link to='/search_pagination' className={classes.line}>search_pagination</Link></MenuItem>
        <MenuItem><Link to='/push_notifications' className={classes.line}>push_notifications</Link></MenuItem>
        <MenuItem><Link to='/nodetext' className={classes.line}>nodetext</Link></MenuItem>
        <MenuItem><Link to='/file_upload' className={classes.line}>file_upload</Link></MenuItem>
        <MenuItem><Link to='/e_acco_veri' className={classes.line}>email_acco_veri</Link></MenuItem>
        <MenuItem><Link to='/2fa_speakearst' className={classes.line}>2fa_speakearst</Link></MenuItem>
        <MenuItem><Link to='/authentications' className={classes.line}>SignUp</Link></MenuItem>
        <MenuItem><Link to='/serverSide' className={classes.line}>Server Side</Link></MenuItem>
        <MenuItem><Link to='/tut_2' className={classes.line}>Geocode-Upload</Link></MenuItem>
        <MenuItem><Link to='/tut_6' className={classes.line}>Chat</Link></MenuItem>
        <MenuItem><Link to='/udemy' className={classes.line}>Udemy</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}
