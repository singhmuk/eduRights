import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './blog/Header';
import MainFeaturedPost from './blog/MainFeaturedPost';
import FeaturedPost from './blog/FeaturedPost';
import Sidebar from './blog/Sidebar';
import Footer from './blog/Footer';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  line: {
    textDecoration: 'none',
    fontSize: '25px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  }
}));

const sections = [
  { title: 'Dashboard', url: '/' },
  { title: 'algorithams', url: '/introAlgo' },
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

const mainFeaturedPost = {
  title: 'JavaScript And Python',
  description: 'Best resource for Online JavaScript and JavaScript Frameworks',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'JavaScript',
    description:
      `JavaScript is a scripting or programming language that allows you to implement complex 
      features on web pages — every time a web page does more than displaying content updates, 
      interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. JavaScript 
      can update and change both HTML and CSS.`,
    imageText: 'Image Text',
  },
  {
    title: 'React Js',
    description:
      `React makes it painless to create interactive UIs. Design simple views for each state 
      in your application, and React will efficiently update and render just the right 
      components when your data changes. Declarative views make your code more predictable and 
      easier to debug.`,
    imageText: 'Image Text',
  },
];


const sidebar = {
  title: 'About',
  description: 'Etiam pamet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
};

export default function Dashboard() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="EduRights" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
          <Link to='/about' className={classes.line}>About Us</Link>
        </main>
      </Container>
      <Footer description="mukeshcs94@gmail.com" />
    </React.Fragment>
  );
}
