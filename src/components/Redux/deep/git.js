import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import GitLogo from "../../../assets/git_imgs.PNG"


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 350,
  width: 600
}

const styles = theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: "center"
  }
})

const configGit = `
ls, ls -A
pwd (print working directory)

To register user account with git:
  git config --global user.name mukesh
  git config --global user.email mukese0794@gmail.com

to check name and email:
  git config --global user.name 
  git config --global user.email


2.Add Reactjs App to github:
a. npm install gh-pages --save-dev

b. Second in the existing scripts property we to need to add predeploy and deploy.

    "scripts": {
    //...
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
    }
    
c. Create a Github repository and initialize it and add it as a remote in your local git 
    repository.
    
d.1 git init (initialize this)

d.2 git remote add origin https://mukeshcse94.github.io/dev.git (add it as remote)


3.Now deploy it to GitHub Pages.
npm run deploy


git config --get remote.origin.url                                  //find git repository url
`.trim();

const lastCommit = `
git branch –a                   //to list all branch
git checkout                    //match last commit
git log -p  -5                  //see last 5 commit
git diff                        //compare working tree with staging area
git log
`.trim();

const sortKeysOP = `
npx create-react-app .                 //inside client
npx create-react-app /client           //outside client

imr                                    //import React
imro                                   //import React as Object
imrc                                   //import React Component
imrpc                                  //import React PureComponent
rpc                                    //react Pure Function Const
cdm                                    //componentDidMount
ed                                     //export default
cmmb                                   //comment Big Block
rfce                                   //react functional components
rcc                                    //class component
rrc                                    //class component with react-redux connect
ren                                    //render method
`.trim();


class Git extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4><Sidebar /></h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>Git</h3>
              <ul>
                <li><b>Git: </b>
                  <ul>
                    <li>Give access to command: Push, Pull, Commit, etc.</li>
                    <li>Use to tracking our changes in the Documents.</li>
                  </ul>
                </li>
                <br />
                <li><b>GitHub: </b>Is Remote Server.</li>
                <li>Local files send to remote server</li>
              </ul>
              <br />
              <img src={GitLogo} alt="Omega" className="responsive" style={redesign} />
              <h3>Config Git</h3>
              <div style={titles}>
                <PrismCode
                  code={configGit}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Git Basics</h3>
              <ul>
                <li><b>git log:</b>Commit time and details</li>
                <li><b>git diff one.js:</b>To Chack difference added in one.js</li>
                <li><b>git checkout one.js:</b>Rollback previous commit</li>
                <li><b>git rm --cached index.js: </b>File remove from staging area.</li>
                <li><b>git rm --cached -r .:</b>Everything in working directory should be remove in staging area.</li>
                <li><b>git restore index.js/ git restore .: </b>To reove the files from staging changes.</li>
                <li><b>git log: </b>To know the git commit detals.</li>
                <li><b>git checkout commit_id: </b>To revert the previous commit_id.</li>
                <li><b>git push -u "guthub url" master: </b></li>
              </ul>
              <br />

              <h3>Git setup</h3>
              <ul>
                <li>write code.</li>
                <li>git add .</li>
                <li>git commit -m "commits"</li>
                <li>git push</li>
                <br />
                <li><b>change branch: </b>git checkout dev</li>
                <br />
                <li><b>create new branch</b>: git checkout -b primary</li>
                <li>npm install or npm push</li>
                <br />
                <li><b>Pull: </b>git clone 'url'</li>
                <li><b>Push: </b>git push origin mukesh_dev</li>
                <br />
                <li><b>Merge secondary branch with main branch</b>: <ul>
                  <li>git branch (main)</li>
                  <li>git merge secondary</li>
                </ul></li>

              </ul>
              <br />
              <br />

              <b>Check last commit</b>
              <div style={titles}>
                <PrismCode
                  code={lastCommit}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>React Sort Keys</b>
              <div style={titles}>
                <PrismCode
                  code={sortKeysOP}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>1. Starting work on an existing project</h3>
              <p>You may compare a new project to a new toy. Give the toy to the kid, and he would be eager to play with it.</p>
              <p>Usually, the complexity lies in consistency. You must follow previous work, understand the logic behind it and develop in a way that will not affect the existing elements. At the same time, it is important that all your additions will bring value to the project and won’t look out of place in the existing environment.</p>
              <b>Here are the main steps we take:</b>
              <ul>
                <li>Documentation – the document that served as a guideline when developing the project. It should contain goals, expected results, timelines as well as the entire project specifications.</li>
                <li>Access to source codes – a list of all the credentials we need to start the work. Access to a GIT repository on top of this would be an excellent bonus.</li>
                <li>Nothing exists or what we get is just a mockery of materials → That’s ok, we’ll just do everything from scratch.</li>
              </ul>
              <p>
                You might ask yourself – do we really need this? It will take time, money and it will raise lots of annoying questions like “why didn’t we asked for this before?”, “who was in charge with this?”, “were we supposed to have this?”. We understand it’s annoying, yet the short answer is “Yes, we do”. We do because, although we can see what has been done on a project, we can’t see what was the purpose of it being done. And we need to understand everything there is to know about a project if want to be able to make a difference.
              </p>
              <p>Starting with an existing project, you will need some time to get used with the team structure, the methodology (deadlines or sprints) and the codebase itself.</p>
              <p>The first step is identifying the hierarchy - where you stand, will you manage some juniors and who are you going to report to.</p>
              <br />
              <b>can ask for the following:</b>
              <br />
              <ul>
                <li>Is there any documentation repository with all relevant summaries - user and development ones - that you can read first</li>
                <li>What sort of access will you have - is it the complete project repository, or a specific module, and what's the best way to commit your new changes</li>
                <li>Is there anyone who can brief you in the project - a quick run through the project idea, the main components, what is each module responsible for, what will you start with first</li>
                <li>Play with code , Add new components obserb its functionality even not required.</li>
              </ul>
              <p>
                Most companies are aware that you'll need some time to catch up with everything that has happened before - so make sure that you can stick to their pace. They could give you a week to get fully acquainted with 3 millions lines of code and start contributing right away, which is usually not realistic. It may take you a few weeks (or more) to get up to speed, and start with minor customizations and cosmetic changes until you feel confident enough to contribute larger chunks of independent code.
              </p>
              <br />
              <br />
              <h3>2. Building a project from scratch</h3>
              <ul>
                <li>It opens the door to a new, exciting world. It gives you the possibility to try out new tools, skills or procedures. It's a huge refresh for your day to day work.</li>
                <li>Projects made from scratch can differ a lot, some may need design, some may involve only development, others consist of support and maintenance. And finally, there are also the larger ones, that expand on all these areas.</li>
                <li>The brick foundation of any new work consists of understanding its primary objectives. That's why the first step is to ask the client to provide the project brief. This is a document that may contain: the company description, the target audience, more project details, goals and expectations, a timeline and budget.</li>
                <li>When big projects begin, planning helps to build in the right direction. A complex project is hard to follow already, and not having a detailed plan from the start would cast doubt over any further progress.</li>
                <li>Other than providing the right direction, planning is meant to define an active approach. It will help the project evolve by dividing it into small pieces but still keeping the initially-aimed coherence.</li>
              </ul>
              <br />
              <b>Development phase - constructing the project: </b>
              <p>
                The implementing phase is a project's most elaborate stage. To make sure it happens as planned, we split the project into milestones and divide every milestone into agile sprints.
              </p>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Git));