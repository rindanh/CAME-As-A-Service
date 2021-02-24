const { companyA, companyB, companyC } = require("./seed/provider.seed");
const { CHARACTERISTICS } = require("./seed/characteristic.seed");
const { METHOD_CHUNKS, METHOD_CHUNKS_ADDITIONAL } = require("./seed/methodChunk.seed");
const { testProject, testProject2 } = require("./seed/project.seed");

const fetch = require("node-fetch");

const authenticate = () => {
  return fetch(`${server}/authenticate`, {
    method: "POST",
    body: JSON.stringify(companyA),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const register = () => {
  return fetch(`${server}/register`, {
    method: "POST",
    body: JSON.stringify(companyA),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const seedProvider = () => {
  console.log("Seeding provider...");
  return fetch(`${server}/providers`, {
    method: "POST",
    body: JSON.stringify([companyB, companyC]),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const seedCharacteristic = () => {
  console.log("Seeding characteristics...");
  return fetch(`${server}/characteristics`, {
    method: "POST",
    body: JSON.stringify(CHARACTERISTICS),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const seedMethodChunk = () => {
  console.log("Seeding method chunks...");
  var modified = METHOD_CHUNKS.map(e => ({ ...e, provider: "company-b" }));
  return fetch(`${server}/method-chunks`, {
    method: "POST",
    body: JSON.stringify(modified.concat(METHOD_CHUNKS_ADDITIONAL)),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

const seedProject = () => {
  console.log("Seeding projects...");
  return fetch(`${server}/projects`, {
    method: "POST",
    body: JSON.stringify([testProject, testProject2]),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
};

/****************** MAIN *******************/
const server = "http://localhost:4000";
var token = "";

const dbConfig = require("./config/database.config.js");
const seeder = require("mongoose-seed");

// Connect to MongoDB via Mongoose
seeder.connect(dbConfig.url, function() {
  const models = ["Characteristic", "Project", "MethodChunk", "Provider"];

  // Load Mongoose models
  seeder.loadModels([
    "./app/models/characteristic.model.js",
    "./app/models/methodChunk.model.js",
    "./app/models/project.model.js",
    "./app/models/provider.model.js"
  ]);

  // Clear specified collections
  seeder.clearModels(models, function() {
    var init = null;
    if (models.includes("Provider")) {
      init = register();
    } else {
      init = authenticate();
    }
    Promise.resolve(init)
      .then(res => {
        token = res.token;
        if (models.includes("Provider")) {
          seedProvider();
        }
        if (models.includes("Characteristic")) {
          seedCharacteristic().then(() => {
            if (models.includes("MethodChunk")) {
              seedMethodChunk();
            }
            if (models.includes("Project")) {
              seedProject();
            }
          });
        } else {
          if (models.includes("MethodChunk")) {
            seedMethodChunk();
          }
          if (models.includes("Project")) {
            seedProject();
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    seeder.disconnect();
  });
});
