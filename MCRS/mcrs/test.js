const { performance } = require("perf_hooks");
const seeder = require("mongoose-seed");
const fetch = require("node-fetch");
const dbConfig = require("./config/database.config.js");
const { companyA, companyB, companyC } = require("./seed/provider.seed");
const server = "http://localhost:4000";
const baseUrlB = "C:/Users/User/Desktop/mcrs/case/mbms-b/browse.html#";
const ORGANISATIONAL = "organisational";
const HUMAN = "human";

const CHARACTERISTICS = [
  {
    name: "Impact",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Level of innovation",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Expertise",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: HUMAN
  }
];

const METHOD_CHUNKS = [
  {
    name: "NFR Framework",
    description: "NFR Framework for IS Security",
    url: baseUrlB + "NFR-framework",
    characteristics: [
      {
        id: "impact",
        value: "high"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "normal"
      }
    ]
  },
  {
    name: "KAOS",
    description: "KAOS for IS Security",
    url: baseUrlB + "KAOS",
    characteristics: [
      {
        id: "impact",
        value: "low"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "high"
      }
    ]
  },
  {
    name: "Secure Tropos",
    description: "Secure Tropos for IS Security",
    url: baseUrlB + "secure-tropos",
    characteristics: [
      {
        id: "impact",
        value: "high"
      },
      {
        id: "level-of-innovation",
        value: "low"
      },
      {
        id: "expertise",
        value: "high"
      }
    ]
  },
  {
    name: "GBRAM",
    description: "GBRAM for IS Security",
    url: baseUrlB + "gbram",
    characteristics: [
      {
        id: "impact",
        value: "low"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "normal"
      }
    ]
  },
  {
    name: "Misuse Cases",
    description: "Misuse Cases for IS Security",
    url: baseUrlB + "misusecases",
    characteristics: [
      {
        id: "impact",
        value: "normal"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "low"
      }
    ]
  }
];

const providerTest = {
  name: "Provider Test",
  email: "provider@example.com",
  password: "password",
  description: "Provider Test",
  industry: "computer-software",
  contacts: [
    {
      name: "IT Support",
      description: "IT Support is responsible for assisting any inquiries regarding IT services.",
      email: "support@example.com"
    }
  ]
};

const providerUpdate = {
  description: "Updated description",
  urls: [
    {
      name: "Homepage",
      url: "http://homepage"
    }
  ]
};

const characteristicTest = {
  name: "Characteristic Test",
  characteristicValues: [
    {
      ref: "default",
      values: ["low", "normal", "high"],
      isQuantifiable: true
    }
  ],
  dimension: ORGANISATIONAL
};

const characteristicUpdate = {
  characteristicValues: [
    {
      ref: "default",
      values: ["low", "normal", "high"],
      isQuantifiable: true
    },
    {
      ref: "a/b/c",
      values: ["a", "b", "c"],
      isQuantifiable: false
    }
  ]
};

const methodChunkTest = {
  name: "Method Chunk Test",
  description: "This is a test method chunk.",
  url: "http://example.com/method-chunk-test",
  characteristics: [
    {
      id: "characteristic-test",
      value: "normal"
    },
    {
      id: "impact",
      value: "normal"
    },
    {
      id: "level-of-innovation",
      value: "normal"
    },
    {
      id: "expertise",
      value: "normal"
    }
  ]
};

const methodChunkUpdate = {
  description: "Updated description"
};

const projectTest = {
  name: "Project Test",
  characteristics: [
    {
      id: "impact",
      rule: "maximum"
    },
    {
      id: "level-of-innovation",
      rule: "maximum"
    },
    {
      id: "expertise",
      rule: "minimum"
    },
    {
      id: "characteristic-test",
      rule: "maximum"
    }
  ]
};

const projectUpdate = {
  description: "Updated description",
  characteristics: [
    {
      id: "impact",
      rule: "minimum"
    },
    {
      id: "characteristic-test",
      rule: "maximum"
    }
  ]
};

const register = (path, data, message) => {
  if (message) console.log(message);
  return fetch(`${server}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => console.log("Error!", err));
};

const post = (path, data, message, t) => {
  if (message) console.log(message);
  return fetch(`${server}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${t ? t : token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => console.log("Error!", err));
};

const put = (path, data, message, t) => {
  if (message) console.log(message);
  return fetch(`${server}${path}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${t ? t : token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => console.log("Error!", err));
};

const del = (path, message, t) => {
  console.log(message);
  return fetch(`${server}${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${t ? t : token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => console.log("Error!", err));
};

const get = (path, message) => {
  console.log(message);
  return fetch(`${server}${path}`)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => console.log("Error!", err));
};

/****************** MAIN *******************/
var token = "";

const seed = () => {
  return register("/register", companyA)
    .then(res => {
      post("/providers", [companyB, companyC], "", res.token);
      post("/characteristics", CHARACTERISTICS, "", res.token).then(() => {
        post("/method-chunks", METHOD_CHUNKS, "", res.token);
      });
    })
    .catch(err => {
      console.log("Error!", err);
    });
};

const testResult = {
  0: "POST /register should create provider and return valid token",
  1: "POST /register should not create provider due to duplicate id",
  2: "POST /authenticate should not return token due to wrong email and password",
  3: "POST /authenticate should check email password pair and return token",
  4: "POST /publish should create method chunk",
  5: "POST /publish should not create method chunks due to duplicate id",
  6: "GET /method-chunks should return all method chunks",
  7: "GET /method-chunks/method-chunk-test should return single method chunks",
  8: "GET /method-chunks?provider=company-test should return all method chunks by specified provider",
  9: "POST /find should return recommendation",
  10: "PUT /method-chunks/method-chunk-test should not update method chunk due to invalid token",
  11: "PUT /method-chunks/method-chunk-test should update method chunk",
  12: "DELETE /method-chunks/method-chunk-test should not delete method chunk due to invalid token",
  13: "DELETE /method-chunks/method-chunk-test should delete method chunk",
  14: "GET /providers should return all providers",
  15: "GET /providers/provider-test should return single provider",
  16: "PUT /providers/provider-test should update provider",
  17: "DELETE /providers/provider-test should delete provider",
  18: "GET /characteristics should return all characteristics",
  19: "GET /characteristics/characteristic-test should return single characteristic",
  20: "POST /characteristic should create characteristic",
  21: "PUT /characteristics/characteristic-test should update characteristic",
  22: "DELETE /characteristics/characteristic-test should delete characteristic",
  23: "GET /projects should return all projects",
  24: "GET /projects/project-test should return single project",
  25: "POST /projects should create project",
  26: "PUT /projects/provider-test/project-test should update project",
  27: "DELETE /projects/provider-test/project-test should delete project"
};

const test = () => {
  let i = 0;
  return get("/", "GET / should return welcome message")
    .then(res => {
      res.message ? console.log("OK") : console.log("FAIL");

      // get("/dimensions", "should return all dimensions").then(res => {
      //   res.length ? console.log("OK") : console.log ("FAIL")
      // });

      // get("/industries", "should return all industries").then(res => {
      //   res.length ? console.log("OK") : console.log ("FAIL")
      // });

      i = 0;
      register("/register", providerTest, testResult[0]).then(res => {
        token = res.token;
        if (token) testResult[0] += " OK";
        else testResult[0] += " FAIL";

        i = 1;
        register("/register", providerTest, testResult[1])
          .then(res => {
            res.token ? (testResult[1] += " FAIL") : (testResult[1] += " OK");
          })
          .catch(e => (testResult[1] += " OK"));

        const authenticate = {
          email: "provider@example.com",
          password: "password"
        };

        i = 2;
        post("/authenticate", { ...authenticate, password: "passwordd" }, testResult[i])
          .then(res => {
            res.token ? (testResult[2] += " FAIL") : (testResult[2] += " OK");
          })
          .catch(e => (testResult[2] += " OK"));

        i = 3;
        post("/authenticate", authenticate, testResult[3]).then(res => {
          res.token ? (testResult[3] += " OK") : (testResult[3] += " FAIL");
        });

        i = 14;
        get("/providers", testResult[14]).then(res => {
          res.length == 4 ? (testResult[14] += " OK") : (testResult[14] += " FAIL");
        });

        i = 15;
        get("/providers/provider-test", testResult[15]).then(res => {
          res.id == "provider-test" ? (testResult[15] += " OK") : (testResult[15] += " FAIL");
        });

        i = 16;
        put("/providers/provider-test", providerUpdate, testResult[16]).then(res => {
          res.description == "Updated description" && res.urls.length
            ? (testResult[16] += " OK")
            : (testResult[16] += " FAIL");
        });

        i = 20;
        post("/characteristics", characteristicTest, testResult[20]).then(res => {
          res.id == "characteristic-test" ? (testResult[20] += " OK") : (testResult[20] += " FAIL");

          i = 18;
          get("/characteristics", testResult[18]).then(res => {
            res.length == 4 ? (testResult[18] += " OK") : (testResult[18] += " FAIL");
          });

          i = 19;
          get("/characteristics/characteristic-test", testResult[19]).then(res => {
            res.id == "characteristic-test"
              ? (testResult[19] += " OK")
              : (testResult[19] += " FAIL");
          });

          i = 21;
          put("/characteristics/characteristic-test", characteristicUpdate, testResult[21]).then(
            res => {
              res.characteristicValues.length == 2
                ? (testResult[21] += " OK")
                : (testResult[21] += " FAIL");
            }
          );

          i = 4;
          post("/publish", methodChunkTest, testResult[4]).then(r => {
            r.id == "method-chunk-test" ? (testResult[4] += " OK") : (testResult[4] += " FAIL");

            i = 5;
            post("/publish", methodChunkTest, testResult[5])
              .then(res => {
                res.id ? (testResult[5] += " FAIL") : (testResult[5] += " OK");
              })
              .catch(e => (testResult[5] += " OK"));

            i = 6;
            get("/method-chunks", testResult[6]).then(res => {
              "testResult6", res;
              res.length == 6 ? (testResult[6] += " OK") : (testResult[6] += " FAIL");
            });

            i = 7;
            get("/method-chunks/method-chunk-test", testResult[7]).then(res => {
              res.id == "method-chunk-test" ? (testResult[7] += " OK") : (testResult[7] += " FAIL");
            });

            i = 8;
            get("/method-chunks?provider=provider-test", testResult[8]).then(res => {
              res.length == 1 ? (testResult[8] += " OK") : (testResult[8] += " FAIL");
            });

            i = 10;
            put("/method-chunks/method-chunk-test", methodChunkUpdate, testResult[10]).then(res => {
              res.description == "Updated description"
                ? (testResult[10] += " OK")
                : (testResult[10] += " FAIL");
            });

            i = 11;
            put("/method-chunks/method-chunk-test", methodChunkUpdate, testResult[11], "invalid")
              .then(res => {
                res.description == "Updated description"
                  ? (testResult[11] += " FAIL")
                  : (testResult[11] += " OK");
              })
              .catch(e => (testResult[11] += " OK"));
          });

          i = 25;
          post("/projects", projectTest, testResult[25]).then(r => {
            r.id == "provider-test/project-test"
              ? (testResult[25] += " OK")
              : (testResult[25] += " FAIL");

            i = 23;
            get("/projects", testResult[23]).then(res => {
              res.length == 1 ? (testResult[23] += " OK") : (testResult[23] += " FAIL");
            });

            i = 24;
            get("/projects/provider-test/project-test", testResult[24]).then(res => {
              res.id == "provider-test/project-test"
                ? (testResult[24] += " OK")
                : (testResult[24] += " FAIL");
            });

            i = 26;
            put("/projects/provider-test/project-test", projectUpdate, testResult[26]).then(res => {
              res.description == "Updated description"
                ? (testResult[26] += " OK")
                : (testResult[26] += " FAIL");
            });

            i = 9;
            const find = { project: "provider-test/project-test" };
            post("/find", find, testResult[9]).then(res => {
              res.results ? (testResult[9] += " OK") : (testResult[9] += " FAIL");

              i = 12;
              del("/method-chunks/method-chunk-test", testResult[12], "invalid")
                .then(res => {
                  res.message == "Deleted successfully."
                    ? (testResult[12] += " FAIL")
                    : (testResult[12] += " OK");
                })
                .catch(e => (testResult[i] += " OK"));

              i = 17;
              del("/projects/provider-test/project-test", testResult[17]).then(res => {
                res.message == "Deleted successfully."
                  ? (testResult[17] += " OK")
                  : (testResult[17] += " FAIL");

                i = 22;
                del("/characteristics/characteristic-test", testResult[22]).then(res => {
                  res.message == "Deleted successfully."
                    ? (testResult[22] += " OK")
                    : (testResult[22] += " FAIL");

                  i = 13;
                  del("/method-chunks/method-chunk-test", testResult[13]).then(res => {
                    res.message = "Deleted successfully."
                      ? (testResult[13] += " OK")
                      : (testResult[13] += " FAIL");
                  });

                  i = 27;
                  del("/providers/provider-test", testResult[27]).then(res => {
                    res.message == "Deleted successfully."
                      ? (testResult[27] += " OK")
                      : (testResult[27] += " FAIL");
                    console.log("--------------------- RESULT ----------------------");
                    Object.keys(testResult).forEach(function(key, index) {
                      console.log(key, testResult[key]);
                    });
                    var t1 = performance.now();
                    console.log("Test took " + (t1 - t0) + " milliseconds.");
                    console.log("Finished.");
                  });
                });
              });
            });
          });
        });
      });
    })
    .catch(err => {
      console.log("Error!", err);
    });
};

var t0;

// Connect to MongoDB via Mongoose
seeder.connect(dbConfig.url, function() {
  t0= performance.now();

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
    console.log("Populating database for testing purpose...");
    seed().then(res => {
      console.log("Begin test...");
      test();
    });
    seeder.disconnect();
  });
});
