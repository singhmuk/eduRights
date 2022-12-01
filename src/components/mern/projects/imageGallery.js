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


const Gallery = `
const gallerySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  images: { type: [String], required: false, }
});

module.exports = mongoose.model("galleries", gallerySchema);
`.trim();

const multer = `
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, ''$'{Date.now()}_'$'{file.originalname}');
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
`.trim();

const gallerys = `
const Gallery = require("../models/Gallery");
const upload = require("../middlewares/multer");
const fs = require("fs");

router.get("/", (req, res) => {
  Gallery.find().exec((err, galleries) => {
    if (err)
      return res.json({
        status: false,
        message: "Server errors",
        result: err,
      });
    return res.json({
      status: false,
      message: "Data found",
      result: galleries,
    });
  });
});

router.post("/add", (req, res) => {
  const gallery = new Gallery(req.body);
  gallery.save((err, newGallery) => {
    if (err)
      return res.json({
        status: false,
        message: "Server errors",
        result: err,
      });
    return res.json({
      status: true,
      message: "Gallery added",
      result: newGallery,
    });
  });
});

router.put("/upload/:galleryId", upload.array("image", 3), async (req, res) => {
  const inputfiles = req.files;
  const images = [];
  inputfiles.map((file) => {
    images.push(file.filename);
  });
  const galleryId = req.params.galleryId;

  Gallery.findOneAndUpdate(
    { _id: galleryId },
    { $push: { images: images } },
    { new: true },
    function (err, data) {
      if (err) {
        res.status(500).json({
          status: false,
          message: "Upload error",
          result: err,
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Upload successfully!",
          result: data,
        });
      }
    }
  );
});

router.get("/detail/:galleryId", (req, res) => {
  const galleryId = req.params.galleryId;
  Gallery.findOne({ _id: galleryId }, function (err, gallery) {
    if (err) {
      res.status(500).json({
        status: false,
        message: "Get gallery error",
        result: err,
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Get gallery successfully!",
        result: gallery,
      });
    }
  });
});

router.put("/removeImage/:galleryId", async (req, res) => {
  const fileName = req.body.fileName;
  console.log("~~~fileName: ", fileName);

  const galleryId = req.params.galleryId;

  Gallery.findOneAndUpdate(
    { _id: galleryId },
    { $pull: { images: fileName } },
    { new: true },
    function (err, data) {
      if (err) {
        res.status(500).json({
          status: false,
          message: "Remove image error",
          result: err,
        });
      } else {
        const path = "server/uploads/" + fileName;
        fs.unlinkSync(path);
        res.status(200).json({
          status: true,
          message: "Remove image successfully!",
          result: data,
        });
      }
    }
  );
});

module.exports = router;
`.trim();

const serverComp = `
var path = require("path");
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));

var URIstring = "mongodb://localhost:27017/uploads";

app.use("/galleries", require("./routes/gallery"));

mongoose.connect(URIstring, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("./uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
module.exports = app.listen(PORT, () => {
  console.log("Server listening in port:" + PORT);
});
`.trim();

const types = `
export const FETCH_ALBUMS = "FETCH_ALBUMS";
export const FETCH_ALBUM_DETAIL = "FETCH_ALBUM_DETAIL";
export const ADD_ALBUM = "ADD_ALBUM";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const REMOVE_IMAGE = "REMOVE_IMAGE";
`.trim();

const album = `
import axios from "axios";
import {
  FETCH_ALBUMS,
  FETCH_ALBUM_DETAIL,
  ADD_ALBUM,
  UPLOAD_IMAGE,
  REMOVE_IMAGE,
} from "./types";

export const fetchAlbums = () => {
  const req = axios.get("/galleries").then((res) => res.data);
  return {
    type: FETCH_ALBUMS,
    payload: req,
  };
};

export const fetchAlbumDetail = (id) => {
  const req = axios.get('/galleries/detail/'$'{id}').then((res) => res.data);
  return {
    type: FETCH_ALBUM_DETAIL,
    payload: req,
  };
};

export const addAlbum = (data) => {
  const req = axios.post("/galleries/add", data).then((res) => res.data);
  return {
    type: ADD_ALBUM,
    payload: req,
  };
};

export const uploadImages = (id, data, config) => {
  const req = axios.put('/galleries/upload/'$'{id}', data, config)
    .then((res) => res.data);
  return {
    type: UPLOAD_IMAGE,
    payload: req,
  };
};

export const removeImage = (id, imageName) => {
  const req = axios.put('/galleries/removeImage/'$'{id}', { fileName: imageName })
    .then((res) => res.data);
  return {
    type: REMOVE_IMAGE,
    payload: req,
  };
};
`.trim();

const albumReducer = `
import * as ACTION_TYPES from "../actions/types";

const initialState = {
  albumList: [],
  albumDetail: {},
  addedAlbum: {},
};
const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALBUMS:
      return {
        albumList: [...action.payload.result],
      };
    case ACTION_TYPES.FETCH_ALBUM_DETAIL:
      return {
        albumDetail: action.payload.result,
      };
    case ACTION_TYPES.ADD_ALBUM:
      return {
        ...state,
        addedAlbum: action.payload,
      };
    case ACTION_TYPES.UPLOAD_IMAGE:
      return {
        albumDetail: action.payload.result,
      };
    case ACTION_TYPES.REMOVE_IMAGE:
      return {
        albumDetail: action.payload.result,
      };
    default:
      return state;
  }
};
export default albumReducer;
`.trim();

const AddAlbum = `
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addAlbum } from "../actions/album";

function AddAlbum(props) {
  const dispatch = useDispatch();
  const [values, setvalues] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setvalues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAlbum(values)).then((res) => {
      if (res.payload.status) {
        // toast.success(res.payload.message);
        console.log("~~~~data: ", res.payload.result._id);

        props.history.push('/upload/'$'{res.payload.result._id}');
      }
    });
  };
  return (
    <Fragment>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Albums</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add
          </li>
        </ol>
      </nav>
      <div className="card shadow-sm">
        <div className="card title p-2 bg-light">
          <h5>Add Album</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Album Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter album name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-success"
            >
              <i class="fas fa-plus"></i> Save and next
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddAlbum;
`.trim();

const AlbumList = `
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAlbums } from "../actions/album";

function AlbumList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);
  const albumList = useSelector((state) => state.album.albumList);
  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h5>Album List</h5>
      </div>
      <div className="card-title p-4">
        <a className="btn btn-success" href="/add">
          Add Album
        </a>
      </div>
      <div className="card-body p-4">
        <table class="table border">
          <thead class="table-dark">
            <tr>
              <td>No</td>
              <td>Album Name</td>
              <td>Description</td>
              <td>Image Count</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {albumList.map((album, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{album.name}</td>
                <td>{album.description}</td>
                <td>{album.images.length}</td>
                <td>
                  <a class="btn btn-info" href={'/upload/'$'{album._id}'}>
                    <i class="fas fa-image"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlbumList;
`.trim();

const UploadImage = `
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadImages, fetchAlbumDetail, removeImage } from "../actions/album";

function UploadImage(props) {
  const dispatch = useDispatch();
  const albumId = props.match.params.id;
  //   const [albumInfo, setAlbumInfo] = useState({});
  const albumDetail = useSelector((state) => state.album.albumDetail);

  useEffect(() => {
    dispatch(fetchAlbumDetail(albumId));
  }, []);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    files.map((file, index) => {
      formData.append("image", file);
    });

    dispatch(uploadImages(albumId, formData, config)).then((res) => {
      if (res.payload.status) {
        toast.success(res.payload.message);
      }
    });
  };

  const handleDelete = (albumId, imageName) => {
    dispatch(removeImage(albumId, imageName)).then((res) => {
      if (res.payload.status) {
        toast.success(res.payload.message);
      }
    });
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Albums</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Upload
          </li>
        </ol>
      </nav>
      <div className="card shadow-sm">
        <div className="card-header">
          <h5>Upload Image for Album {albumDetail.name}</h5>
        </div>
        <div className="card-body">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                className="m-1"
                style={{
                  width: "350px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <p>Drag and drop files here or click to upload</p>
              </div>
            )}
          </Dropzone>
          <div className="row m-1">
            {albumDetail.images &&
              albumDetail.images.map((image, index) => (
                <div className="card col-md-3 mb-2">
                  <div className="card-header bg-white">
                    <span>{image}</span>
                    <button
                      type="button"
                      className="btn btn-danger float-end"
                      onClick={() => handleDelete(albumId, image)}
                    >
                      <i class="fas fa-backspace"></i>
                    </button>
                  </div>
                  <div className="card-body p-1">
                    <img
                      style={{ width: "100%", maxHeight: "180px" }}
                      class="img-thumbnail"
                      src={'http://localhost:5000/'$'{image}'}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
`.trim();

const AppComp = `
import React from "react";
import AlbumList from "./components/AlbumList";
import { BrowserRouter, Route } from "react-router-dom";
import AddAlbum from "./components/AddAlbum";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadImage from "./components/UploadImage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="container">
        <Route path="/" exact component={AlbumList} />
        <Route path="/add" exact component={AddAlbum} />
        <Route path="/upload/:id" exact component={UploadImage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
`.trim();


class ImageGallery extends Component {
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
              <h3>1.Image Gallery</h3>
              <b>models/Gallery.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={Gallery}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>middlewares/multer.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={multer}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/gallery.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={gallerys}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>server</b>
              <br />
              Create a folder "uploads" with server.js file.
              <div style={titles}>
                <PrismCode
                  code={serverComp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Client</h3>
              <b>actions/types.js</b>
              <div style={titles}>
                <PrismCode
                  code={types}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>actions/album.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={album}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>reducers/albumReducer.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={albumReducer}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/AddAlbum.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={AddAlbum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/AlbumList.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={AlbumList}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/UploadImage.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={UploadImage}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>components/App.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={AppComp}
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

export default (withStyles(styles)(ImageGallery));
