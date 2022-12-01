import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const sections = [
  { title: 'Dashboard', url: '/' },
  { title: 'Algorithams', url: '/introAlgo' },
  { title: 'Css', url: '/cssbasics' },
  { title: 'JavaScript', url: '/introJs' },
  { title: 'ReactJs', url: '/introReact' },
  { title: 'Angular', url: '/introAngularjs' },
  { title: 'Redux', url: '/introRedux' },
  { title: 'NodeJs', url: '/introNodejs' },
  { title: 'ExpressJs', url: '/introExpress' },
  { title: 'Mongodb', url: '/infoMD' },
  { title: 'Mern', url: '/javaScript' },
  { title: 'Python', url: '/introPython' },
  { title: 'ML', url: '/infoMl' },
  { title: 'AI', url: '/introAngular' },


];

export default function HeaderSection(props) {
  const classes = useStyles();

  return (
    <React.Fragment>

      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

HeaderSection.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
