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

const Previews = `
const postSchema = new Schema({
  text: String,
  title: String,
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post


//Controllers
const Post = require('./model.js');

router.post('/',async (req,res) =>{
  const posts = new Post({
    text: req.body.text,
    title: req.body.title
  })
      await posts.save()
      res.status(201).send(posts)
})


//Routes
router.get("/posts", async (req, res) => {
  const sort = {}
  
  const PAGE_SIZE = 3;                                                           //data per page
  const page = parseInt(req.query.page || "0");
  const total = await Post.countDocuments({});
  const posts = await Post.find({})

    .limit(PAGE_SIZE)                                                            //data limit get from mongodb
    .skip(PAGE_SIZE * page);
    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      posts,
    });
  
 
  if(req.query.sortBy){                                             //localhost:5000/posts?sortBy=createdAt:true
    const str = req.query.sortBy.split(':')
    sort[str[0]] = str[1] === 'desc' ? -1:1
    console.log('sort',str)
}
});


router.get("/search/:text", (req, res) => {
  var regex = new RegExp(req.params.text,'i');
  Post.find({name:regex}).then(result => {
    res.status(200).json(result)
  })
})

module.exports = router;



//server.js
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/users", require("./routes/users"));

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server Listening on'));
`.trim();

const ViewDetails = `
function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(http://localhost:5000/posts?page='$'{pageNumber})
      .then((res) => res.json())
      .then(({ totalPages, posts }) => {
        setPosts(posts);
        console.log('eeeee',posts)
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

const captcha = `
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const app = express();

app.use(express.json());

app.get('/', (_, res) => res.sendFile(__dirname + '/index.html'));

app.post('/subscribe', async (req, res) => {
  if (!req.body.captcha)
    return res.json({ success: false, msg: 'Please select captcha' });

  const secretKey = '6LdpvDEUAAAAAHszsgB_nnal29BIKDsxwAqEbZzU';                                     // Secret key

  // Verify URL
  const query = stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress
  });
  const verifyURL = https://google.com/recaptcha/api/siteverify?'$'{query};

  const body = await fetch(verifyURL).then(res => res.json());

  if (body.success !== undefined && !body.success)
    return res.json({ success: false, msg: 'Failed captcha verification' });

  return res.json({ success: true, msg: 'Captcha passed' });
});

app.listen(3000, () => console.log('Server started on port 3000'));
`.trim();


class PropsModel extends Component {
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
              <h3>1.Server Side Pagination</h3>
              <b>Server</b>
              <div style={titles}>
                <PrismCode
                  code={Previews}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Client</h3>
              <div style={titles}>
                <PrismCode
                  code={ViewDetails}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Captcha</h3>
              <div style={titles}>
                <PrismCode
                  code={captcha}
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

export default (withStyles(styles)(PropsModel));
