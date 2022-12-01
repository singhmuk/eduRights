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


const rowHttp = `
const https = require('https')
const url = 'https://api.darksky.net/forecast/5d82708dedf7f790ac891b3ce2a9c50a/37.8267,-122.4233'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()`.trim()

const expressJs = `
const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('Hello express!')
})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/weather', (req, res) => {
    res.send('Your weather')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})`.trim()

const htmlJson = `
const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Andrew'
    }, {
        name: 'Sarah'
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})`.trim()

const staticSer = `
const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})`.trim()

const defaultPara = `
const greeter = (name = 'user', age) => {
  console.log('Hello ' + name)
}

greeter('Andrew')

greeter()`.trim()


class Tut3 extends Component {
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

                        </List>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default (withStyles(styles)(Tut3));
