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
        <MenuItem><Link to='/infoMl' className={classes.line}>InfoMl</Link></MenuItem>
        <MenuItem><Link to='/gredient_decents' className={classes.line}>Gredient Decents</Link></MenuItem>
        <MenuItem><Link to='/training' className={classes.line}>Traning</Link></MenuItem>

        <MenuItem><Link to='/regularizations' className={classes.line}>Regularizations</Link></MenuItem>
        <MenuItem><Link to='/featuresEng' className={classes.line}>FeaturesEng</Link></MenuItem>
        <MenuItem><Link to='/adaboost' className={classes.line}>Adaboots</Link></MenuItem>
        <MenuItem><Link to='/greedSearch' className={classes.line}>Greed Search</Link></MenuItem>
        <MenuItem><Link to='/perceptron' className={classes.line}>Perceptron</Link></MenuItem>
        <MenuItem><Link to='/pcaPy' className={classes.line}>PCA</Link></MenuItem>

        <MenuItem><Link to='/leanearRegression' className={classes.line}>Leanear Regression</Link></MenuItem>
        <MenuItem><Link to='/logisticReg' className={classes.line}>Logistic Regression</Link></MenuItem>
        <MenuItem><Link to='/lda' className={classes.line}>Lda</Link></MenuItem>
        <MenuItem><Link to='/knn' className={classes.line}>Knn</Link></MenuItem>
        <MenuItem><Link to='/k_meanClustring' className={classes.line}>K_Mean</Link></MenuItem>
        <MenuItem><Link to='/naiveBar' className={classes.line}>Naive Bayes</Link></MenuItem>
        <MenuItem><Link to='/randomForest' className={classes.line}>Random Forest</Link></MenuItem>
        <MenuItem><Link to='/decisiontree' className={classes.line}>Decision Tree</Link></MenuItem>
        <MenuItem><Link to='/svmPy' className={classes.line}>SVM</Link></MenuItem>

        <MenuItem><Link to='/numpyPy' className={classes.line}>Numpy</Link></MenuItem>
        <MenuItem><Link to='/pandas' className={classes.line}>Pandas</Link></MenuItem>
        <MenuItem><Link to='/bagging' className={classes.line}>Matplotlib</Link></MenuItem>
        <MenuItem><Link to='/logisticRegrations' className={classes.line}>Scikit Learn</Link></MenuItem>
        <MenuItem><Link to='/regrations' className={classes.line}>SciPy</Link></MenuItem>
        <MenuItem><Link to='/libraries' className={classes.line}>OpenCV</Link></MenuItem>
        <MenuItem><Link to='/capture' className={classes.line}>Capture</Link></MenuItem>
        <MenuItem><Link to='/joinImages' className={classes.line}>JoinImages</Link></MenuItem>
        <br />

        Deep Learning
        <MenuItem><Link to='/superwise' className={classes.line}>Superwise</Link></MenuItem>
      </MenuList>
      <div>
      </div>
    </div>
  );
}
