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


const modules = `
const urlSchema = new Schems({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: { type: String, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema);
`.trim();

const routesUrl = `
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/Url');


router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) {                           //Check base url
    return res.status(401).json('Invalid base url');
  }

  const urlCode = shortid.generate();                       //Create url code
  if (validUrl.isUri(longUrl)) {                            // Check long url
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});`.trim();

const routesIndex = `
const Url = require('../models/Url');

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});`.trim();

const serverUrl = `
const connectDB = require('./config/db');
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'))


//postman
POST http://localhost:5000/api/url/shorten
  {
    "longUrl": "https://www.amazon.com/dp/B075YBBQMM/ref=sspa_dk_detail_5?psc="
  }
`.trim();


class UrlShortenerService extends Component {
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
              <h3>Url Shortener Service</h3>
              <b>models/url.js</b>
              <div style={titles}>
                <PrismCode
                  code={modules}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/url.js</b>
              <div style={titles}>
                <PrismCode
                  code={routesUrl}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/index.js</b>
              <div style={titles}>
                <PrismCode
                  code={routesIndex}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={serverUrl}
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

export default (withStyles(styles)(UrlShortenerService));
