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


const serverApp = `
import React, { useState, useRef } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';


function App() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const classes = useStyles();
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    }
    catch (err) { console.log(err); }
  }
  const handleErrorFile = (err) => { console.log(err); }
  const handleScanFile = (result) => {
    if (result) { setScanResultFile(result); }
  }
  const onScanFile = () => { qrRef.current.openImageDialog(); }
  const handleErrorWebCam = (error) => { console.log(error); }
  const handleScanWebCam = (result) => {
    if (result) { setScanResultWebCam(result); }
  }

  return (
    <Container className={classes.conatiner}>
      <Card>
        <h2 className={classes.title}>Generate Download & Scan QR Code</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField label="Enter Text" onChange={(e) => setText(e.target.value)} />
              <Button className={classes.btn} variant="contained"
                color="primary" onClick={() => generateQrCode()}>Generate</Button>
              <br />
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>) : null}
            </Grid>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button className={classes.btn} variant="contained" onClick={onScanFile}>Scan Qr Code</Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: '100%' }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
              <h3>Scanned Code: {scanResultFile}</h3>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>Qr Code Scan by Web Cam</h3>
              <QrReader
                delay={300}
                style={{ width: '100%' }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  }
}));
`.trim();

const reCapcha = `
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const DELAY = 1500;

class App extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      callback: "not fired",
      value: "[empty]",
      load: false,
      expired: "false"
    };
    this._reCaptchaRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, DELAY);
  }

  handleChange = value => {
    this.setState({ value });
    // if value is null recaptcha expired
    if (value === null) this.setState({ expired: "true" });
  };

  asyncScriptOnLoad = () => { this.setState({ callback: "called!" }); };

  render() {
    const { value, callback, load, expired } = this.state || {};
    return (
      <div className="App">
        <h3>Recaptcha loaded callback: {callback}</h3>
        <h5>Recaptcha value: {value}</h5>
        <h5>Expired: {expired}</h5>
        {load && (
          <ReCAPTCHA
            style={{ display: "inline-block" }}
            theme="dark"
            ref={this._reCaptchaRef}
            sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
            onChange={this.handleChange}
            asyncScriptOnLoad={this.asyncScriptOnLoad}
          />
        )}
      </div>
    );
  }
}
`.trim();


class QrCode extends Component {
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
              <h3>react qrcode generation scanner</h3>
              <div style={titles}>
                <PrismCode
                  code={serverApp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>React reCapcha</h3>
              <div style={titles}>
                <PrismCode
                  code={reCapcha}
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

export default (withStyles(styles)(QrCode));
