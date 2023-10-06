import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  line: {
    textDecoration: "none",
  },
}));

export default function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuList>
        <p>Angular 12</p>
        <MenuItem>
          <Link to="/introAngularjs" className={classes.line}>
            Intro
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/depenInjection" className={classes.line}>
            Architecture
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/flows" className={classes.line}>
            Routes
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/lifeCycleAng" className={classes.line}>
            LifeCycle
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/angularDir" className={classes.line}>
            Custom Elements
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/apiLogic3" className={classes.line}>
            Choose an element
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/rxjs" className={classes.line}>
            Rxjs
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/ngRepeat" className={classes.line}>
            Feature Module
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/ngModel" className={classes.line}>
            Pipes
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/ngFor" className={classes.line}>
            NgFor
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/dynamicallyLoad" className={classes.line}>
            DynamicallyLoad
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/ngrxCurd" className={classes.line}>
            Ngrx
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/ngrxCounter" className={classes.line}>
            NgrxCounter
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/outputs" className={classes.line}>
            Input-Output
            <br />
            -KeyIn-If-Switch
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/angularCurd" className={classes.line}>
            Curd
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/filterPlace" className={classes.line}>
            FilterPlace-get-live-
            <br />
            NoName-Excel
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/radioButton" className={classes.line}>
            Radio-Font
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/multiCheck" className={classes.line}>
            MultiSel-MultiCheck
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/services12" className={classes.line}>
            Services
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/dropdownsAngu" className={classes.line}>
            pick-
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/debounce" className={classes.line}>
            Debounce
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/loader" className={classes.line}>
            Loader
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/paginations" className={classes.line}>
            Paginations
          </Link>
        </MenuItem>
        <p>AngularJs</p>
        <MenuItem>
          <Link to="/scope" className={classes.line}>
            Scope
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/filter" className={classes.line}>
            Events
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/directives" className={classes.line}>
            Directives
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/angularConditions" className={classes.line}>
            Condition
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/angularlFlters" className={classes.line}>
            Fiters
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/services" className={classes.line}>
            Services
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/validations" className={classes.line}>
            Validations
          </Link>
        </MenuItem>
      </MenuList>
      <div></div>
    </div>
  );
}
