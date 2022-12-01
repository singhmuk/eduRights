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


const serverComp = `
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost/pagination", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const postSchema = new mongoose.Schema({
  text: String,
  title: String,
});

const Post = mongoose.model("Post", postSchema);

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const total = await Post.countDocuments({});
  const posts = await Post.find({})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    posts,
  });
});

const db = mongoose.connection;

db.once("open", () => {
  app.listen(4000);
});
`.trim();

const appComponents = `
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch('http://localhost:4000/posts?page='$'{pageNumber}')
      .then((response) => response.json())
      .then(({ totalPages, posts }) => {
        setPosts(posts);
        setNumberOfPages(totalPages);
      });
  }, [pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  return (
    <div className="App">
      <h3>Page of {pageNumber + 1}</h3>

      {posts.map((post) => (
        <div key={post._id} className="post">
          <h4>{post.title}</h4>
          <p>{post.text}</p>
        </div>
      ))}

      <button onClick={gotoPrevious}>Previous</button>
      {pages.map((pageIndex) => (
        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
          {pageIndex + 1}
        </button>
      ))}
      <button onClick={gotoNext}>Next</button>
    </div>
  );
}

export default App;
`.trim();

const serverPush = `
const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(Server started on port '$'{port}));
`.trim();

const worker = `
console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Traversy Media!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});
`.trim();

const clientApp = `
const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });

  
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
`.trim();

const indexApp = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Push Notifications Using Node</title>
</head>

<body>
  <h1>Push Notifications Using Node</h1>
  <script src="client.js"></script>
</body>

</html>`.trim();


class PaginationsMerns extends Component {
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
              <h3>Pagination</h3>
              <b>server/server.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={serverComp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>client/App.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={appComponents}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2.node_push_notifications</h3>
              <b>server/server.js</b>
              <div style={titles}>
                <PrismCode
                  code={serverPush}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Client</h3>
              <b>client/worker.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={worker}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>client/client.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={clientApp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>client/index.html</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={indexApp}
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

export default (withStyles(styles)(PaginationsMerns));
