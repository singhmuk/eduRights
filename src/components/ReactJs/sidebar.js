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
        <MenuItem><Link to='/introReact' className={classes.line}>Intro-Lazy-Children</Link></MenuItem>
        <MenuItem><Link to='/reactInter' className={classes.line}>Intro</Link></MenuItem>
        <MenuItem><Link to='/pureComp' className={classes.line}>PureComp-conComp</Link></MenuItem>
        <MenuItem><Link to='/customHooks' className={classes.line}>CustomHooks-memo</Link></MenuItem>
        <MenuItem><Link to='/useStates' className={classes.line}>contextApi</Link></MenuItem>
        <MenuItem><Link to='/mainCompo' className={classes.line}>Hoc-form curd-slider</Link></MenuItem>
        
        <MenuItem><Link to='/async_await' className={classes.line}>Async-await-sideMenu<br />Mouse hover</Link></MenuItem>
        <MenuItem><Link to='/ticGame' className={classes.line}>maxMinDate<br />moveBtn-slideshow</Link></MenuItem>
        <MenuItem><Link to='/like' className={classes.line}>Like-checkbox-radio<br />select-scroll</Link></MenuItem>
        <MenuItem><Link to='/sortItems' className={classes.line}>IncOnClick-pushBtn-fizzBuzz<br />show-addDocs-ratings</Link></MenuItem>
        <MenuItem><Link to='/models' className={classes.line}>Models-chidData-csv<br />Icon-router</Link></MenuItem>
        
        <MenuItem><Link to='/numberFormats' className={classes.line}>Random NumFor-biToDe<br /> Validations Step DateTimw</Link></MenuItem>
        
       
        <MenuItem><Link to='/textEditors' className={classes.line}>TextEditors-paginations<br />translator-sortCheck</Link></MenuItem>
        <MenuItem><Link to='/serverSideRend' className={classes.line}>Jwt-multiSel</Link></MenuItem>
        <MenuItem><Link to='/dropdownSelect' className={classes.line}>SelectFtr-checkFtr-updtCrd</Link></MenuItem>
        <MenuItem><Link to='/linkGet' className={classes.line}>LinkGet</Link></MenuItem>
        <MenuItem><Link to='/kanban' className={classes.line}>Kanban</Link></MenuItem>
        <MenuItem><Link to='/hackeRank' className={classes.line}>HackeRank</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}

