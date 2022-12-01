import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  
}));

function getSteps() {
  return ['MavenLink (Genpact User And Project Management)', 'myPat (FIIT-JEE online courses)', 
          'CRM Tool (Product based Company)', 'OES Academy (Educational Institute)'];
}


export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();


  return (
    <div className={classes.root}>
      <Stepper orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel style={{color:'green'}}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
    </div>
  );
}
