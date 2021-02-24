const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;

const router = require("./app/routes/index.js");
const methodChunkRouter = require("./app/routes/methodChunk.routes.js");
const characteristicRouter = require("./app/routes/characteristic.routes.js");
const providerRouter = require("./app/routes/provider.routes.js");
const projectRouter = require("./app/routes/project.routes.js");

// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// parse cookies in request
var cookieParser = require("cookie-parser");

app.use(cookieParser());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// Configuring jwt auth
const jwtConfig = require("./config/jwt.config.js");
const expressJwt = require("express-jwt");

app.use(
  expressJwt({
    secret: jwtConfig.secret,
    getToken: function fromHeaderOrCookie(req) {
      if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      return null;
    }
  }).unless({
    path: [
      // public routes that don't require authentication
      "/",
      /\/swagger.json/i,
      /\/api-docs/i,
      /\/authenticate/i,
      /\/register/i,
      /\/find/i,
      { url: "/dimensions", methods: ["GET"] },
      { url: "/industries", methods: ["GET"] },
      { url: /^\/providers.*/, methods: ["GET", "POST"] },
      { url: /^\/providers\/.*/, methods: ["GET", "POST"] },
      { url: /^\/method-chunks.*/, methods: ["GET"] },
      { url: /^\/method-chunks\/.*/, methods: ["GET"] },
      { url: /^\/characteristics.*/, methods: ["GET"] },
      { url: /^\/characteristics\/.*/, methods: ["GET"] },
      { url: /^\/projects.*/, methods: ["GET"] },
      { url: /^\/projects\/.*/, methods: ["GET"] }
    ]
  })
);

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(err.status).send({ message: err.message });
  }
  next();
});

app.use(function(req, res, next) { 
  if (req.method == "POST" || req.method == "PUT") {
    if (Object.entries(req.body).length === 0 && req.body.constructor === Object) {
      console.log("Empty request", req.body);
      return res.status(400).send({ message: "Invalid request body" });
    }
  }
  next();
  let uid = "";
  if (req.user) uid = req.user.id;
  console.log(uid, req.method, req.originalUrl, res.statusCode);
});

// Configuring API documentation
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MCRS API Documentation",
      version: "0.1.0",
      description: "Method Chunk Registry System. [GitHub](https://github.com/audrynyonata/mcrs)"
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server for testing purposes"
      }
    ]
  },
  apis: ["./app/routes/index.js", "./app/routes/*.routes.js", "./docs/*.yaml"]
};

const swaggerSpec = swaggerJSDoc(options);

// Define docs routes
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: "section.models {display:none;}"
  })
);

// Require routes
app.use("/", router);
app.use("/method-chunks", methodChunkRouter);
app.use("/characteristics", characteristicRouter);
app.use("/providers", providerRouter);
app.use("/projects", projectRouter);

// listen for requests
app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
