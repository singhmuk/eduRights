import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import GitLogo from "../../../assets/git_imgs.PNG"
import javaScript from '../../mern/projects/javaScript';


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



class TechSkils extends Component {
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
            <ul>
              <li><b>Good morning, Ms. Khusboo. How are you today?</b></li>
              <li className='textsFomtate'>Fine thanks. And you? </li>
              <li>Please follow me. We'll meet in the conference room.</li>
              <br/>

              <li>Are you Mr. Thomas? Thank you for comming.</li>
              <li>Would you like a glass of water or a cup of coffee before we begin?</li>
              <li className='textsFomtate'>No thanks, I'm fine.</li>
              <br/>

              <li><b>Could you give me one minute? I'll be right with you.</b></li>
              <li>How are you doing this morning?</li>
              <li className='textsFomtate'>I'm doing fine, thank you.</li>
              <br/>

              <li>Thanks for being patient. Things are quite busy here right now.</li>
              <li>Yes, I'm here to see Mr David about the s/w developer position.</li>
              <li className='textsFomtate'>Right. I'm Mr David. Glad to meet you.</li>
              <li className='textsFomtate'>Take your time. Just let me know when you finish.</li>
              <br/>

              <li>Mr Ajay is ready to interview you now.</li>
              <br/>
              
              <li>What do you know about our company so far?</li>
              <li className='textsFomtate'>I've read on your website that for over ten years LCI Software has delivered professional services. On software development projects for clients all over the world.</li>
              <li>You did very well.</li>
              <br/>
              <li><b>Tell me something about yourself.</b></li>
              <li className='textsFomtate'>Yes, I completed a Bachelo's Degree in computer from UPTU university in 2016. 
              Well... I've been an software engineer for 4 years now. I first get job in APlayes as a software engineer. I worked 
              with them for 10 months. I left when i got good opeertunity, and moved to Nile Technology. Then, I worked with Nile 
              for a year. I had the opeertunity to learn more about the software-building process there. But, since there were not 
              too many projects at that agency, after 1 years, I decided to look for another job. I soon started to work at an 
              ACL Digitals. It was a good chance to join a team. I've been able to use my training and 
              experience fully at this company. I gained experience in many Things like teamwork, time management.</li>
              <li className='textsFomtate'>I've learned a lot about Technology and developed my job skills.</li>
              <li className='textsFomtate'>In my freetime, I enjoy reading about AI, tech, and ML.</li>
              <br/>

              <li><b>What is your role?</b></li>
              <li className='textsFomtate'>There I provided helpe in making UI component and render data in client side, and 
              maintained the resusable components.</li>
              <li className='textsFomtate'>After that, I was working as a MERN Stack Developer for Company Nile Techanology that 
              provided product management solutions. There, I managed 3+ teams of software projects, and made sure everything went 
              smoothly in terms of business requirement, deadlines, and more.</li>
              <br/>

              <li>Why do you want to leave that job?</li>
              <li className='textsFomtate'>I'm looking for a company where i can contribute more and grow. I'm ready to take the next step of my career.</li>
              <br/>
              
              <li>Do you have any special skills that would help you do this job?</li>
              <li className='textsFomtate'>I have web development experience. I can use javascript.</li>
              <br/>
              
              <li>Could you describe your ideal job?</li>
              <li className='textsFomtate'>Yes, my ideal job would be challenging but secure.</li>
              <br/>
              
              <li>Tell me more... Why challenging?</li>
              <li className='textsFomtate'>Well, i'd like to imporove my core development skills. And i'd like to be interested in my work.</li>
              <br/>
              
              <li>What are some of your personal interests outside of work?</li>
              <li className='textsFomtate'>Well, I really enjoy painting, listen to music, it helps me relax.</li>
              <br/>
              
              <li><b>Why did you leave your previous job?</b></li>
              <li className='textsFomtate'>My company was downsizing because of the covid-19. So, i was laid off. Other people have been there for over ten years. I only been there for 1 so I was laid off first.</li>
              <li className='textsFomtate'>They cut my hours. I wanted to work full time. But, they only want a part time worker.</li>
              <br/>
              
              <li><b>Why are you looking for another job?</b></li>
              <li className='textsFomtate'>There is no growth potential at my current job. I would like to work for a company that has more room to grow.</li>
              <br/>
              
              <li>How do you handle pressure?</li>
              <li className='textsFomtate'>I work very well with pressure. I prepare for it before it comes.</li>
              <br/>
              
              <li>Why do you want to work for us?</li>
              <li className='textsFomtate'>When i saw the job advertisement. I became very interested. Well, the descriptions sounded very interesting And i think i can succeed at it.</li>
              <li className='textsFomtate'>This company has a good reputation.</li>
              <br/>
              
              <li>Why should we hire you?</li>
              <li className='textsFomtate'>Because i have experience and a strong desire to succeed.</li>
              <li className='textsFomtate'>Because of my drive and commitment.</li>
              <br/>
              
              <li>Can you provide an example of how you acted as a team player?</li>
              <li className='textsFomtate'>I alwase tried to help my teammates complete their tasks if i had completed mine.</li>
              <br/>
              
              <li>Where do you see yourself in five years?</li>
              <li className='textsFomtate'>In five years, I'd like to be see as someone with deep expertise in software development. I hope to be offered the opportunity to take the lead on some projects.</li>
              <br/>
              
              <li><b>Can you tell me about a recent accomplishment or success you had?</b></li>
              <li className='textsFomtate'>I was part of the team that build the Qualcumm product app. With this app, it's easy to order your chips from list of products.</li>
              <br/>
              
              <li><b>Do you have any questions for me?</b></li>
              <li className='textsFomtate'>May i ask what the specific responsibilities for this position are?</li>
              <li className='textsFomtate'>What kind of person are you looking for?</li>
              <li className='textsFomtate'>Do you offer any kind of educational or training programs for employees?</li>
              <li className='textsFomtate'>Yes, What is the focus of this company?</li>
              <br/>
              
              <li>I'd like to offer you the job. Are you still interested?</li>
              <li className='textsFomtate'>Yes, i am. When can i start?</li>
              <br/>
              
              <li>How is Monday?</li>
              <li className='textsFomtate'>It'll be good.</li>
              <li className='textsFomtate'>Well, I'll have to give notice at my present job first. I'll be able to start in 2 week's time.</li>
              <li className='textsFomtate'>Sounde good. I look forward to it.</li>
              <li className='textsFomtate'>Thank you, i'd love to take the job.</li>
              <li className='textsFomtate'>When would you like me to start?</li>
              <br/>
              
              <li>May i know your name, please?</li>
              <li>Go straight and turn right.</li>
              <li>Where are you currently working?</li>
              <li className='textsFomtate'>I am currently working at an Acl Digitals.</li>
              <br/>
              
              <li>How long have you been working there?</li>
              <li className='textsFomtate'>I have been working there for last 1.5 years.</li>
              <br/>
              
              <li>May i see your CV?</li>
              <li className='textsFomtate'>Here you are.</li>
              <br/>
              
              <li>May i come in Sir?</li>
              <li className='textsFomtate'>Please come in.</li>
              <li className='textsFomtate'>Good morning. My name is Robert. And i'm the owner of this company. Please have your sit.</li>
              <li className='textsFomtate'>How are you doing Jane?</li>
              <br/>
              
              <li>Yes, I'm fine.</li>
              <li className='textsFomtate'>Okay, today i will take your interview. So let's start.</li>
              <li>Yeah, sure.</li>
              <li className='textsFomtate'>Nice. Can i have your resume?</li>
            </ul>
            <br/>

            <h3>2. Tell us about a recent project you worked on.</h3>
            "In my previous position, I had to create an online selling product for company to ensure 
            all clients can received a semiconductor product information and choose products on basis of 
            their requirments. 
            <br/>
            <br/>
            At first, I struggled to incorporate content like the count, type and point-based features. 
            However, after researching similar programs, I used JavaScript to code an application where 
            we could upload company products and features for all clients. My implementations were 
            successful and helped the organisation eliminate lengthy processes."
            <br/>
            <br/>
            
            <h3>3. Which design patterns do you use most often?</h3>
            "For Zebra printer projects, I implement my printer state and client as singletons, and, for 
            printer creation, I use a factory to produce different printer based on inputs. However, if 
            more printer is required at a time, I may switch to using a compositional model, such as an 
            Entity-Component-System. The system functions would leverage dependency injection to better 
            separate concerns and increase the testability of the printer logic."
            <br/>
            <br/>
            
            <h3>4. How do you explain technical information to non-technical audiences?</h3>
            If I work with someone without a technical background, I do my best to simplify my language 
            and reduce my communications to only what they need to know to understand my update or 
            question. 
            <br/>
            For example, if I was describing a complicated coding process to a client, I might just describe the end-user changes and experience. This way, the information is more relatable.
            <br/>
            <br/>
            
            <h3>5. Describe a difficult bug you fixed in a large application.</h3>
            At my last job, my manager sent me a bug report about to create step function with pure 
            javaScript, the step function should collect data from database and on the basis of values 
            which getting from backend our UI step should be change. I develop UI but when receiving data
            from API our required functionality didn't fulfilled.
            I started by checking the logs to determine when the bug started, I used complex logic to achieved 
            our requirement.
            From there, I was able to use the browser's developer tools to debug the issue.
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(TechSkils));


