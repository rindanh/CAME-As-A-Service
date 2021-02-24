const { CHARACTERISTICS } = require("./characteristic");
const { testProject, testProject2 } = require("./project");

const fetch = require("node-fetch");

const user = {
  username: "rinda",
  password: "rinda",
  name: "Rinda Nur Hafizha"
}

const authenticate = () => {

  return fetch(`${server}/login`, {
    method: "POST",
    body: JSON.stringify(user),
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
    body: JSON.stringify(user),
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
      console.log("characteristics", res);
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
const server = "http://localhost:3000";
var token = "";

const dbConfig = require("../config/db");
const seeder = require("mongoose-seed");

// Connect to MongoDB via Mongoose
seeder.connect(dbConfig.uri, function() {
  const models = ["Characteristic", "Project"];

  // Load Mongoose models
  seeder.loadModels([
    "src/app/models/characteristic",
    "src/app/models/project",
    // "src/app/models/user"
  ]);

  // Clear specified collections
  seeder.clearModels(models, function() {
    var init = null;
    if (models.includes("User")) {
      console.log("jalan register")
      init = register();
    }
    console.log("jalan authenticate")
    init = authenticate();
    
    Promise.resolve(init)
      .then(res => {
        token = res.token;
        console.log(token)
        if (models.includes("Characteristic")) {
          seedCharacteristic().then(() => {
            if (models.includes("Project")) {
              seedProject();
            }
          });
        } else {
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
