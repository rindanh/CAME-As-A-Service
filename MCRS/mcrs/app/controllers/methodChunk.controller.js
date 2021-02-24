const Characteristic = require("../models/characteristic.model.js");
const MethodChunk = require("../models/methodChunk.model.js");
const slugify = require("slugify");

exports.create = (req, res) => {
  if (req.body.length) {
    var initAll = req.body.map(doc => {
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
                  console.log("Find ref method chunk", err);
                  return err;
                });
              resolve(c);
            })
      );
      return new Promise((resolve, reject) => {
        let p = Promise.all(init).then(characteristics => {
          let d = {
            ...doc,
            id: slugify(doc.name, {
              replacement: "-",
              remove: /[*+~.()'"!:@]/g,
              lower: true
            }),
            provider: doc.provider || req.user.id,
            characteristics: characteristics
          };
          return d;
        });
        resolve(p);
      });
    });

    Promise.all(initAll).then(docs => {
      MethodChunk.insertMany(docs)
        .then(result => res.send(result))
        .catch(err => {
          console.log("Create bulk method chunk", err);
          res.status(400).send({
            message: err.message || "Some error occurred while saving."
          });
        });
    });
  } else {
    let doc = req.body;
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
                console.log("Find ref method chunk", err);
                return err;
              });
            resolve(c);
          })
    );
    Promise.all(init).then(characteristics => {
      doc.id = slugify(doc.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      });
      doc.provider = doc.provider || req.user.id;
      doc.characteristics = characteristics;

      const methodChunk = new MethodChunk(doc);
      methodChunk
        .save()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.log("Create MC", err);
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
  var criteriaCharacteristics = {};
  if (req.query.characteristics_id) {
    criteriaCharacteristics.id = {
      $regex: new RegExp(req.query.characteristics_id, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_value) {
    criteriaCharacteristics.value = {
      $regex: new RegExp(req.query.characteristics_value, "g"),
      $options: "i"
    };
  }
  criteria.characteristics = { $elemMatch: criteriaCharacteristics };

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
  MethodChunk.find(criteria)
    .sort(sort)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log("Find all MC", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.findOne = (req, res) => {
  MethodChunk.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Method Chunk ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Find one MC", err);
      return res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.update = (req, res) => {
  let doc = {};
  if (req.body.provider) {
    doc.provider = req.body.provider;
  }
  if (req.body.url) {
    doc.url = req.body.url;
  }
  if (req.body.description) {
    doc.description = req.body.description;
  }
  var init = [];
  if (req.body.characteristics) {
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
    MethodChunk.findOneAndUpdate({ id: req.params.id.toLowerCase() }, doc, {
      new: true
    })
      .then(result => {
        if (!result) {
          return res.status(404).send({
            message: `Method Chunk ${req.params.id} not found.`
          });
        }
        res.send(result);
      })
      .catch(err => {
        console.log("Update MC", err);
        return res.status(400).send({
          message: err.message || "Some error occurred while updating."
        });
      });
  });
};

exports.delete = (req, res) => {
  MethodChunk.findOneAndRemove({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Method Chunk ${req.params.id} not found.`
        });
      }
      res.send({ message: "Deleted successfully." });
    })
    .catch(err => {
      console.log("Hard delete MC", err);
      return res.status(400).send({
        message: err.message || "Colud not perform delete."
      });
    });
};
