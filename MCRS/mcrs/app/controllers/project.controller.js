const Characteristic = require("../models/characteristic.model.js");
const Project = require("../models/project.model.js");
const slugify = require("slugify");

exports.create = (req, res) => {
  if (req.body.length) {
    var initAll = req.body.map(doc => {
      doc.characteristics.forEach((e, idx) => {
        if (!e.weight) doc.characteristics[idx].weight = 1;
      });
      var init = doc.characteristics.map(e =>
        e.ref
          ? Promise.resolve(e)
          : new Promise((resolve, reject) => {
              let c = Characteristic.findOne({ id: e.id })
                .then(res => {
                  if (res) {
                    let characteristic = {
                      ...e,
                      ref: res.characteristicValues[0].ref
                    };
                    return characteristic;
                  }
                })
                .catch(err => {
                  console.log("Find ref project", err);
                  return err;
                });
              resolve(c);
            })
      );

      return new Promise((resolve, reject) => {
        let projectId = slugify(doc.name, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        });

        let p = Promise.all(init).then(characteristics => {
          let provider = doc.provider || req.user.id;
          let d = {
            ...doc,
            project: projectId,
            provider: provider,
            id: provider + "/" + projectId,
            characteristics: characteristics
          };
          // console.log(d);
          return d;
        });
        resolve(p);
      });
    });

    Promise.all(initAll).then(docs => {
      Project.insertMany(docs)
        .then(result => res.send(result))
        .catch(err => {
          console.log("Create bulk project", err);
          res.status(400).send({
            message: err.message || "Some error occurred while saving."
          });
        });
    });
  } else {
    let doc = req.body;
    doc.characteristics.forEach((e, idx) => {
      if (!e.weight) doc.characteristics[idx].weight = 1;
    });
    var init = doc.characteristics.map(e =>
      e.ref
        ? Promise.resolve(e)
        : new Promise((resolve, reject) => {
            let c = Characteristic.findOne({ id: e.id })
              .then(res => {
                if (res) {
                  let characteristic = {
                    ...e,
                    ref: res.characteristicValues[0].ref
                  };
                  return characteristic;
                }
              })
              .catch(err => {
                console.log("Find ref project", err);
                return err;
              });
            resolve(c);
          })
    );

    Promise.all(init).then(characteristics => {
      doc.project = slugify(doc.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      });
      doc.provider = doc.provider || req.user.id;
      doc.id = doc.provider + "/" + doc.project;
      doc.characteristics = characteristics;

      const project = new Project(doc);
      project
        .save()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.log("Create project", err);
          res.status(400).send({
            message: err.message || "Some error occurred while saving."
          });
        });
    });
  }
};

exports.findAll = (req, res) => {
  var criteria = {};
  if (req.query.name) {
    criteria.name = {
      $regex: new RegExp(req.query.name, "g"),
      $options: "i"
    };
  }
  if (req.query.description) {
    criteria.description = {
      $regex: new RegExp(req.query.description, "g"),
      $options: "i"
    };
  }
  if (req.query.provider) {
    criteria.provider = {
      $regex: new RegExp(req.query.provider, "g"),
      $options: "i"
    };
  }
  if (req.query.project) {
    criteria.project = {
      $regex: new RegExp(req.query.project, "g"),
      $options: "i"
    };
  }
  var criteriaCharacteristics = {};
  if (req.query.characteristics_id) {
    criteriaCharacteristics.id = {
      $regex: new RegExp(req.query.characteristics_id, "g"),
      $options: "i"
    };
    criteria.characteristics = { $elemMatch: criteriaCharacteristics };
  }

  var sort = {};
  if (req.query.sort) {
    switch (req.query.order) {
      case "desc":
      case "DESC":
      case "dsc":
      case "DSC":
        sort[req.query.sort] = -1;
        break;
      default:
        sort[req.query.sort] = 1;
        break;
    }
  }
  Project.find(criteria)
    .sort(sort)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log("Find all project", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.findOne = (req, res) => {
  Project.findOne({
    provider: req.params.provider_id.toLowerCase(),
    project: req.params.project_id.toLowerCase()
  })
    .then(result => {
      // console.log("a", req.params.provider_id, req.params.project_id);
      if (!result) {
        return res.status(404).send({
          message: `Project ${req.params.provider_id}/${req.params.project_id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Find one project", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.update = (req, res) => {
  let doc = {};
  if (req.body.description) {
    doc.description = req.body.description;
  }
  var init = [];
  if (req.body.characteristics != []) {
    req.body.characteristics.forEach((e, idx) => {
      if (!e.weight) req.body.characteristics[idx].weight = 1;
    });
    init = req.body.characteristics.map(e =>
      e.ref
        ? Promise.resolve(e)
        : new Promise((resolve, reject) => {
            let c = Characteristic.findOne({ id: e.id })
              .then(res => {
                if (res) {
                  let characteristic = {
                    ...e,
                    ref: res.characteristicValues[0].ref
                  };
                  return characteristic;
                }
              })
              .catch(err => {
                console.log("Find ref method chunk", err);
                return err;
              });
            resolve(c);
          })
    );
  }
  Promise.all(init).then(characteristics => {
    if (init != []) {
      doc.characteristics = characteristics;
    }
    Project.findOneAndUpdate(
      {
        provider: req.params.provider_id.toLowerCase(),
        project: req.params.project_id.toLowerCase()
      },
      doc,
      { new: true }
    )
      .then(result => {
        if (!result) {
          return res.status(404).send({
            message: `Project ${req.params.provider_id}/${req.params.project_id} not found.`
          });
        }
        res.send(result);
      })
      .catch(err => {
        console.log("Update project", err);
        res.status(400).send({
          message: err.message || "Some error occurred while updating."
        });
      });
  });
};

exports.delete = (req, res) => {
  Project.findOneAndRemove({
    provider: req.params.provider_id.toLowerCase(),
    project: req.params.project_id.toLowerCase()
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Project ${req.params.provider_id}/${req.params.project_id} not found.`
        });
      }
      res.send({ message: "Deleted successfully." });
    })
    .catch(err => {
      console.log("Soft delete project", err);
      res.status(400).send({
        message: err.message || "Could not perform delete."
      });
    });
};
