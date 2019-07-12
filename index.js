const mongoose = require("mongoose");
const express = require("express");
const app = express();
var multer = require("multer");
const imageGalleryRouter = require("./Api/routes/ImageGalleyRouter");

/* #region multer - file upload */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "." + file.originalname);
  }
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

var upload = multer({ storage: storage, fileFilter: fileFilter });

/* #endregion */

/* #region database */
mongoose.connect("mongodb://localhost/ImageGallery", { useNewUrlParser: true });

mongoose.connection.on("error", () => console.error("connection error:"));

mongoose.connection.once("open", () =>
  console.log("successfully connected to database")
);

mongoose.connection.on("disconnected", () =>
  console.log("successfully disconnected from database")
);

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
});
/* #endregion */

app.post("/api/gallery", upload.single("image"), (req, res, next) => {
  next();
});

//app.use('/uploads',express.static('uploads'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/gallery", imageGalleryRouter);

app.listen(8000, () => {
  console.log("rest server running on port: 8000");
});
