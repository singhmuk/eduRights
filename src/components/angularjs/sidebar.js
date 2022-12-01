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
        <MenuItem><Link to='/introAngular' className={classes.line}>AI</Link></MenuItem>
        <MenuItem><Link to='/tensorflow' className={classes.line}>Tensorflow</Link></MenuItem>
        <MenuItem><Link to='/tensors' className={classes.line}>Tensorboards</Link></MenuItem>
        <MenuItem><Link to='/angCompiler' className={classes.line}>Compiler</Link></MenuItem>
        <MenuItem><Link to='/neural' className={classes.line}>NeuralKeras</Link></MenuItem>
        <MenuItem><Link to='/activationFunctions' className={classes.line}>activationFuncs</Link></MenuItem>
        <MenuItem><Link to='/loss' className={classes.line}>Loss</Link></MenuItem>
        <MenuItem><Link to='/gradientNeural' className={classes.line}>GradientNeural</Link></MenuItem>
        <MenuItem><Link to='/stochastic' className={classes.line}>Stochastic</Link></MenuItem>
        <MenuItem><Link to='/benchmarking' className={classes.line}>Benchmarking</Link></MenuItem>
        <MenuItem><Link to='/customer' className={classes.line}>Customer</Link></MenuItem>
        <MenuItem><Link to='/regularizationDeep' className={classes.line}>Regularization Deep</Link></MenuItem>
        <MenuItem><Link to='/imbalanced' className={classes.line}>Imbalanced</Link></MenuItem>
        <MenuItem><Link to='/imbalanced2' className={classes.line}>Imbalanced2</Link></MenuItem>
        <MenuItem><Link to='/convolutionals' className={classes.line}>Convolutionals</Link></MenuItem>
        <MenuItem><Link to='/data_augmentation' className={classes.line}>data Augmentation</Link></MenuItem>
        <MenuItem><Link to='/transfer' className={classes.line}>Transfer</Link></MenuItem>
        <MenuItem><Link to='/word_embedding' className={classes.line}>Embedding</Link></MenuItem>
        <MenuItem><Link to='/datatypests' className={classes.line}>Datatypes</Link></MenuItem>
        <MenuItem><Link to='/typeScript_2' className={classes.line}>TS Function</Link></MenuItem>
        <MenuItem><Link to='/typeScript_4' className={classes.line}>Type Assertion</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}

