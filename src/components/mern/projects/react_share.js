import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


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


const reactShareSimplified = `
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  EmailIcon,
  WhatsappIcon
} from "react-share";


class ReactShareSimplified extends Component {
  render() {
    const { url, title, facebook, googlePlus, twitter, whatsapp, email, addClass, Previewemail } = this.props;
    let { facebookClass, twitterClass, googlePlusClass, whatsappClass, emailClass } = this.props || "shareIcon";

    let iconSize = 32;
    if (this.props.iconSize !== undefined) { iconSize = this.props.iconSize }

    return (
      <span className={addClass}>
        {facebook && (<FacebookShareButton url={url} quote={title} className={facebookClass}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>)}

        {googlePlus && (<GooglePlusShareButton url={url} quote={title}  className={googlePlusClass}>
          <GooglePlusIcon size={iconSize} round />
        </GooglePlusShareButton>)}

        {twitter && (<TwitterShareButton url={url} quote={title} style={{ outline: 'none' }} className={twitterClass}>
          <TwitterIcon size={iconSize} round />
        </TwitterShareButton>)}

        {whatsapp && (<WhatsappShareButton url={url} quote={title} style={{ outline: 'none' }} className={whatsappClass}>
          <WhatsappIcon size={iconSize} round />
        </WhatsappShareButton>)}

        {email && (<EmailShareButton url={url} quote={title} style={{ outline: 'none' }} className={emailClass}>
          <EmailIcon size={iconSize} round />
        </EmailShareButton>)}
        {Previewemail && (<EmailShareButton url={url} quote={title} style={{ outline: 'none' }} className={emailClass}>
          <EmailIcon size={iconSize} round />
        </EmailShareButton>)}
      </span>
    );
  }
}`.trim();

const app = `
//App.js
import ReactShareSimplified from './dist/ReactShareSimplified'
import './App.css';

class App extends Component {
  render() {
    const url = "https://www.github.com";
    const title = "React share simplified";
    return (
      <div className="App">
        <div className="align-inline" style={{marginTop:'10px'}}>
          <span className="share-title">Share: </span>
          <ReactShareSimplified
            url={url}
            title={title}
            facebook={true}
            facebookClass="iconStyle"
            googlePlus={true}
            googlePlusClass="iconStyle"
            twitter={true}
            twitterClass="iconStyle"
            email={true}
            emailClass="iconStyle"
            whatsapp={true}
            whatsappClass="iconStyle"
            iconSize={32}
            addClass="align-inline"
          />
        </div>
      </div>
    );
  }
}



//App.css
.share-title {
  justify-content: center;
  align-self: center;
  font-size: 17px;
  font-family: "Nunito";
  font-weight: 500;
  margin-right: 5px;
}
.align-inline {
  display: flex;
  flex: 1;
  flex-direction: row;
}
.iconStyle {
    margin: 0 5px 5px;
    cursor: pointer;
}
`.trim();

const server = `
const cors = require('cors');
const express = require('express');

//Secret key
const stripe = require('stripe')('sk_test_51He1P4Jz7nbfLVoYjEiuLJJXUkw3yFMOLRXLm8Ons2fnzuwfo
               FLzCyncHIubREzUs60yiDPNvSxZltanq41RyLEi00vKugjwhC');
const uuid = require('uuid');

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('It is working')
})

app.post('/payment', (req, res) => {
    const { product, token } = req.body;
    console.log('Products', product);
    console.log('Price', product.price);
    const idempontencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: 'Purchase of product.name',
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempontencyKey })
    })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
})


app.listen(5000, () => console.log('Started on port 5000'))`.trim();

const clientApp = `
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setProduct] = useState({
    name: "Reactjs",
    price: 10,
    productBy: 'Facebook'
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const header = {
      "Content-Type": "application/json"
    }

    return fetch('http://localhost:5000/payment', {
    method: 'POST',
      header,
      body: JSON.stringify(body)
    }).then(res => {
        console.log('Response', res)
        const { status } = res;
        console.log('Status', status)
      })
  .catch(err => console.log(err))
  }

return (
  <div className="App">
    Stripe
    <StripeCheckout
      //Publishable key
      // stripeKey={process.env.REACT_APP_KEY}
      stripeKey="pk_test_51He1P4Jz7nbfLVoYDBP7q8kVxEZLjLd34krGafVPawZ4PIkziUVjrOyzePVtXM3rkRoo04sV
                 fvFjBuRZehSWy8Xu00kIVA41KE"
      token={makePayment}
      amount={product.price * 100}
      name="Reactjs"
      shippingAddress
      billingAddress
    />
  </div>
);
}
`.trim();


class ReactShare extends Component {
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
              <h3>React Share</h3>
              <b>dist/ReactShareSimplified.js</b>
              <div style={titles}>
                <PrismCode
                  code={reactShareSimplified}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>App.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={app}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Stripe</h3>
              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={server}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Client</h3>
              <b>App.js</b>
              <div style={titles}>
                <PrismCode
                  code={clientApp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(ReactShare));
