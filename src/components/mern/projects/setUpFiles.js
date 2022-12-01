import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import SPass from "../../../assets/strong_password.png";
import SEmail from "../../../assets/send_email.png";
import SEmail2 from "../../../assets/send_email_2.png";
import SEmail3 from "../../../assets/send_email_3.png";
import SEmail4 from "../../../assets/send_email_4.png";
import SEmail5 from "../../../assets/send_email_5.png";
import SEmail6 from "../../../assets/send_email_6.png";
import EMailLog from "../../../assets/email_login.png";
import EMailLog2 from "../../../assets/email_log2.png";
import EMailLog3 from "../../../assets/email_log3.png";
import EMailLog4 from "../../../assets/email_log4.png";
import EMailLog5 from "../../../assets/email_log5.png";
import EMailLog6 from "../../../assets/email_log6.png";
import EMailLog7 from "../../../assets/email_log7.png";

import Post from "../../../assets/postman.png";
import LoginGoogle from "../../../assets/login_google.png";
import LoginGoogle2 from "../../../assets/login_google2.png";
import LoginGoogle3 from "../../../assets/login_google3.png";
import LoginFb1 from "../../../assets/fb.png";
import LoginFb2 from "../../../assets/fb2.png";
import FireBase from "../../../assets/firebase.png";
import FireBase2 from "../../../assets/firebase_2.png";
import FireBase4 from "../../../assets/firebase_4.png";
import Recapcha from "../../../assets/recapcha.png";
import Stripes from "../../../assets/stripe.png";
import GMap from "../../../assets/gm.png";
import GMap2 from "../../../assets/gm2.png";



const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

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

const proSetup = `
//client package.json
"proxy": "http://localhost:5000",

//server package.json
"scripts": {
  "client-install": "npm install --prefix client",
  "start": "node server",
  "server": "nodemon server",
  "client": "npm start --prefix client",
  "dev": "concurrently "npm run server" "npm run client"",
  "dev": "concurrently \"npm run server-dev\" \"npm run client-dev\""     // if package.jsom inside server folder
},

`.trim();

const envSetUp = `
PORT = 5000
NODE_ENV = development
SKIP_PREFLIGHT_CHECK=true
MONGODB_URL = mongodb://localhost:27017/socialmedia

CLOUD_API_KEY = 945977577931871
CLOUD_API_SECRET = YeD1drmBlFB8Un6x4MtSbe0Znys
CLOUD_NAME = djh2hg0iq

ACCESS_TOKEN_SECRET = jwtsecret
REFRESH_TOKEN_SECRET = 1d
ACTIVATION_TOKEN_SECRET = 1min

CLOUD_NAME = djh2hg0iq
CLOUD_API_KEY = 945977577931871
CLOUD_API_SECRET = YeD1drmBlFB8Un6x4MtSbe0Znys

MAILING_SERVICE_CLIENT_ID = 785902412673-pk8aavn6vh2uh8fsla2qj4mmjg5t10r3.apps.googleusercontent.com
MAILING_SERVICE_CLIENT_SECRET = AtMxARca1iYzwerm7RCgHMUT
MAILING_SERVICE_REFRESH_TOKEN = 1//04aSBfO5NFaNJCgYIARAAGAQSNwF
SENDER_EMAIL_ADDRESS = mukeshcs94@gmail.com

GOOGLE_SECRET = YOUR_GOOGLE_SECRET
FACEBOOK_SECRET = YOUR_FACEBOOK_SECRET

REACT_APP_GOOGLE_MAPS_API_KEY = AIzaSyACmVis1yWx1wCi2AX9V0lu3JT_PGXT1qI


-------------------/ReactJs/----------------------
REACT_APP_GOOGLE_MAPS_API_KEY = AIzaSyACmVis1yWx1wCi2AX9V0lu3JT_PGXT1qI
REACT_RECAPCHA = 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
REACT_STRIPE_KEY = pk_test_
`.trim();

const serverSetup = `
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({ useTempFiles: true }))

app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))

//Local images
app.use(express.static(path.join(__dirname, "uploads")));
 
mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server is running on port', PORT))`.trim();

const OAuth = `
Application type => Web application

Authorized JavaScript origins: http://localhost:3000
Authorized redirect URIs: https://developers.google.com/oauthplayground/
`.trim();

const loginGoogles = `
const responseSuccessGoogle = (res) => { console.log(res) }

const responseErrorGoogle = (res) => { console.log(res) }

<GoogleLogin
  clientId="Your Client ID"
  buttonText="Login"
  onSuccess={responseSuccessGoogle}
  onFailure={responseErrorGoogle}
  cookiePolicy={'single_host_origin'}
/>
`.trim();

const fbLogin = `
const responseFacebook = (res) => { console.log(res) }

<FacebookLogin
  appId="813747969439811"
  autoLoad={false}
  fields="name,email,picture"
  onClick={componentClicked}
  callback={responseFacebook} />,
`.trim();

const FireBase3 = `
const firebaseConfig = {
  apiKey: "AIzaSyDxXaDxok6eY-chbAaBRh8pMShN6CFR0vs",
  authDomain: "socialideas-ad6cc.firebaseapp.com",
  projectId: "socialideas-ad6cc",
  storageBucket: "socialideas-ad6cc.appspot.com",
  messagingSenderId: "367867465684",
  appId: "1:367867465684:web:69c7fe82033fa0961c5041",
  measurementId: "G-KTRZ0R5ZD9"
};
`.trim();

const reCapch = `
script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" 
            async defer></script>`.trim();

const recapchaCodes = `
<ReCAPTCHA
  style={{ display: "inline-block" }}
  theme="dark"
  ref={this._reCaptchaRef}
  sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
  onChange={this.handleChange}
  asyncScriptOnLoad={this.asyncScriptOnLoad}
/>
`.trim();

const StripeCheckout = `
<StripeCheckout
        //Publishable key
        // stripeKey={process.env.REACT_APP_KEY}
        stripeKey="pk_test_51He1P4Jz7nbfLVoYDBP7q8kVxEZLjLd34krGafVPawZ4PIkziU"
        token={makePayment}
        amount={product.price * 100}
        name="Reactjs"
        shippingAddress
        billingAddress
      />
`.trim();

const reactShareSimplified = ``.trim();

// const reactShareSimplified = ``.trim();

// const reactShareSimplified = ``.trim();


class SetUpFiles extends Component {
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
              <h3>Mern SetUp</h3>
              <div style={titles}>
                <PrismCode
                  code={proSetup}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>.env</h3>
              <div style={titles}>
                <PrismCode
                  code={envSetUp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>server.js</h3>
              <div style={titles}>
                <PrismCode
                  code={serverSetup}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>1. Strong Random Password Generator</b>
              <br />
              <br />
              <img src={SPass} alt="Omega" className="responsive" />
              <br />
              <br />

              <b>2. Send Mail</b>
              <br />
              <br />
              <p>Login to ‘google console’ than ‘google cloud console’.<br />
              Select ‘API And Services’ than ‘Credentials’</p>
              Step 1: <img src={SEmail} alt="Omega" className="responsive" />
              <br />
              <br />
              Step 2:<img src={SEmail2} alt="Omega" className="responsive" />
              <br />
              <br />
              Step 3: <img src={SEmail3} alt="Omega" className="responsive" />
              <br />
              <br />
              Step 4: <img src={SEmail4} alt="Omega" className="responsive" />
              <br />
              <br />
              <br />
              <br />
              <b>Select OAuth client ID:</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={OAuth}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              Step 5: <img src={SEmail5} alt="Omega" className="responsive" />
              <br />
              <br />
              <b>Than click on CREATE</b>
              <br />
              <br />
              Step 6: <img src={SEmail6} alt="Omega" className="responsive" />
              <br />
              <br />
              <i>Copy ‘Your Client ID’ and ‘Your Client Secret’, Paste into .env file.</i>

              <h3>For email login: </h3>
              <i>https://developers.google.com/oauthplayground/</i>
              <br />
              <br />
              Step 1: <img src={EMailLog} alt="Omega" className="responsive" />
              <br />
              <br />
              Click On Setting, Than check Use your own OAuth credentials<br />
              And fill data from newly created projects
              <br />
              <br />
              Step 2: <img src={EMailLog2} alt="Omega" className="responsive" />
              <br />
              <br />
              As show:
              <br />
              <br />
              Step 3: <img src={EMailLog3} alt="Omega" className="responsive" />
              <br />
              <br />
              <i>Now enter ‘https://mail.google.com/’ into </i>
              <br />
              <br />
              Step 4: <img src={EMailLog4} alt="Omega" className="responsive" />
              <br />
              <br />
              <i>And click on Authorize APIs, Than redirect to login by email</i>
              <br />
              <br />
              Step 5: <img src={EMailLog5} alt="Omega" className="responsive" />
              <br />
              <br />
              <b>Than window occurred </b>
              <br />
              <br />
              Step 6: <img src={EMailLog6} alt="Omega" className="responsive" />
              <br />
              <br />
              <b>Click on Exchange authorization code for tokens</b>
              <br />
              <br />
              Step 7: <img src={EMailLog7} alt="Omega" className="responsive" />
              <br />
              <br />
              <b>Copy Refresh Token and paste in .env</b>
              <br />
              MAILING_SERVICE_REFRESH_TOKEN:  1//04CsABh2NvEx3CgYIARAAGAQSNwF-L9IreuYlApH8ofHhQpOqOOyj361myIjlm_lZSpDbRrS0XZ6kqPC3UoIG1icCXoVLt6QFCxU
              <br />
              <br />
              Also write in .env, <b>SENDER_EMAIL_ADDRESS = mukeshcs94@gmail.com</b>
              <br />
              <br />
              Finally close all window.
              <br />
              <h3>3. Upload image in postman:</h3>
              <img src={Post} alt="Omega" className="responsive" />
              <br />
              <br />
              <i>Cloudinary: mukeshcs94@gmail.com / Mukesh@123</i>
              <br />
              <h3>4. Login with google:</h3>
              <b>Install (Client): react-google-login</b>
              <br />
              <i>Login in: https://console.cloud.google.com/</i>
              <br />
              <br />
              Than after create a new project see as. And select credentials.
              <br />
              Step 1:<img src={LoginGoogle} alt="Omega" className="responsive" />
              <br />
              <br />
              After click on create button, Go and select newly created project as.
              <br />
              <br />
              Step 2: <img src={LoginGoogle2} alt="Omega" className="responsive" />
              <br />
              After Select, Create Credentials = OAuth client ID
              <br />
              Now find ‘Your Client ID’ and ‘Your Client Secret’ as:
              <br />
              <br />
              Step 3: <img src={LoginGoogle3} alt="Omega" className="responsive" />
              <br />
              <br />
              Now final code is here. Also connect google auth with backend codes.
              <br />
              <div style={titles}>
                <PrismCode
                  code={loginGoogles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. Login with facebook:</h3>
              Login in: https://developers.facebook.com/
              <br />
              Click on ‘my App’, than click on ‘Create App’.
              <br />
              Than on Create App, And got UI as.
              <br />
              <br />
              Step 1: <img src={LoginFb1} alt="Omega" className="responsive" />
              <br />
              <br />
              <b>After Creating new App. We find App ID as</b>
              <br />
              <br />
              Step 1: <img src={LoginFb2} alt="Omega" className="responsive" />
              <br />
              <br />
              <b>Install (Client): react-facebook-login</b>
              <br />
              Now final code is here. Also connect google auth with backend codes.
              <br />
              <h3>6. Login with Social n/w with Firebase</h3>
              install firebase
              <br />
              <br />
              logn in: 'https://console.firebase.google.com/' And create new projects (web). It provide basic setup.
              <br />
              <br />
              Now goes, Project Overview = Project Setting, as
              <br />
              <br />
              Step 1: <img src={FireBase} alt="Omega" className="responsive" />
              <br />
              <br />
              <b>Than find Project ID, Project Number, Web API Key as show:</b>
              <br />
              <br />
              Step 2: <img src={FireBase2} alt="Omega" className="responsive" />
              <br />
             Final code:
              <br />
              Again login ‘firebase’ = Authentication = Select ‘Sign-in method’, than enable google, fb,… as:
              <br />
              <br />
             Step 3: <img src={FireBase4} alt="Omega" className="responsive" />
              <br />
              <br />
             During enable put Sacrete Key, ClientId, … And use those code in React App.
             <br />
              <div style={titles}>
                <PrismCode
                  code={FireBase3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>7. React share</h3>
              <b>npm install react-share</b>
              <br />
              <br />
              <i>no configuration need for console develop.</i>
              <br />
              <h3>8. React reCapch v3</h3>
              <b>Install react-google-recaptcha</b>
              <br />
              Inside index.html
              <div style={titles}>
                <PrismCode
                  code={reCapch}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              Login in: https://www.google.com/recaptcha/admin/site/453533502/setup
              <br />
              And copy site key as:
              <br />
              <br />
              <img src={Recapcha} alt="Omega" className="responsive" />
              <br />
              <div style={titles}>
                <PrismCode
                  code={recapchaCodes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Stripe</h3>
              mukeshcs94@gmail.com / mukeshSingh@_123
              <br />
              <br />
              Publishable key:
              <br />
              Secret key:
              <br />
              Developers = click on (…), to create roll key as
              <br />
              <br />
              <img src={Stripes} alt="Omega" className="responsive" />
              <br />
              Same way create secret key.
              <br />
              <br />
              Install (client): react-stripe-checkout<br />
              Install (server): stripe
              <div style={titles}>
                <PrismCode
                  code={StripeCheckout}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>After make payment goes ‘stripe’ and click on ‘Developers’ = Events, and check event happening.</p>

              <h3>10. Google Map:</h3>
              Goes to google console and make ‘Maps JavaScript API’ and ‘Geocoding API’, enable. To do this click on ‘Library’.
              <br />
              <br />
              Also enable ‘Places API’, Than search ‘API’ as:
              <br />
              <br />
              <img src={GMap} alt="Omega" className="responsive" />
              <br />
              <br />
              Than
              <br />
              <br />
              <img src={GMap2} alt="Omega" className="responsive" />
              <br />
              <br />
              <b>Now click on ‘Credentials’ and copy ‘Client ID’ that use in React Projects.</b>
              <br />
              <h3>11. WebRTC</h3>
              App work: ‘COPY YOUR ID’ and paste into ‘ID to call’, Than click on ‘CALL’. Two window
              will appear on screen because source and destination in the same system.
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(SetUpFiles));
