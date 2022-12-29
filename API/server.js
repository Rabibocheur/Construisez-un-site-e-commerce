const express = require("express");
const app = express();
const server = require("http").createServer(app);

const path = require("path");

const cameraRoutes = require("./routes/camera");
const teddyRoutes = require("./routes/teddy");
const furnitureRoutes = require("./routes/furniture");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("images"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/cameras", cameraRoutes);
app.use("/api/teddies", teddyRoutes);
app.use("/api/furniture", furnitureRoutes);

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");

server.listen(port, () => {
  console.log("Listening on " + port);
});
