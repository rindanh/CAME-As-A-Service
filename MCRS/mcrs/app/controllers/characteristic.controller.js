const Characteristic = require("../models/characteristic.model.js");
const Project = require("../models/project.model.js");
const MethodChunk = require("../models/methodChunk.model.js");
const slugify = require("slugify");

exports.create = (req, res) => {
  if (req.body.length) {
    req.body.forEach(e => {
      e.id = slugify(e.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      });
      e.characteristicValues.forEach(el => {
        el.ref = el.ref ? el.ref : el.values.join("/");
      });
    });
    Characteristic.insertMany(req.body)
      .then(result => res.send(result))
      .catch(err => {
        console.log("Create bulk characteristic", err);
        res.status(400).send({
          message: err.message || "Some error occurred while saving."
        });
      });
  } else {
    req.body.characteristicValues.forEach(el => {
      el.ref = el.ref ? el.ref : el.values.join("/");
    });
    const characteristic = new Characteristic({
      id: slugify(req.body.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      }),
      name: req.body.name,
      dimension: req.body.dimension,
      description: req.body.description,
      characteristicValues: req.body.characteristicValues
    });

    characteristic
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log("Create characteristic", err);
        res.status(400).send({
          message: err.message || "Some error occurred while saving."
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
  if (req.query.dimension) {
    criteria.dimension = {
      $regex: new RegExp(req.query.dimension, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_type) {
    criteria["characteristicValues.type"] = {
      $regex: new RegExp(req.query.characteristics_type, "g"),
      $options: "i"
    };
  }
  if (req.query.characteristics_value) {
    criteria["characteristicValues.values"] = {
      $regex: new RegExp(req.query.characteristics_value, "g"),
      $options: "i"
    };
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
  Characteristic.find(criteria)
    .sort(sort)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log("Find all characteristic", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.findOne = (req, res) => {
  Characteristic.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Find one characteristic", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.update = (req, res) => {
  let doc = {};
  if (req.body.dimension) {
    doc.dimension = req.body.dimension;
  }
  if (req.body.description) {
    doc.description = req.body.description;
  }
  if (req.body.characteristicValues) {
    req.body.characteristicValues.forEach(el => {
      el.ref = el.ref ? el.ref : el.values.join("/");
    });
    doc.characteristicValues = req.body.characteristicValues;
  }
  Characteristic.findOneAndUpdate({ id: req.params.id.toLowerCase() }, doc, {
    new: true
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Update characteristic", err);
      res.status(400).send({
        message: err.message || "Some error occurred while updating."
      });
    });
};

exports.delete = (req, res) => {
  MethodChunk.find({ "characteristics.id": req.params.id.toLowerCase() })
    .updateMany({ $pull: { characteristics: { id: req.params.id.toLowerCase() } } })
    .exec();
  Project.find({ "characteristics.id": req.params.id.toLowerCase() })
    .updateMany({ $pull: { characteristics: { id: req.params.id.toLowerCase() } } })
    .exec();
  Characteristic.findOneAndRemove({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Characteristic ${req.params.id} not found.`
        });
      }
      res.send({ message: "Deleted successfully." });
    })
    .catch(err => {
      console.log("Hard delete characteristic", err);
      res.status(400).send({
        message: err.message || "Could not perform delete."
      });
    });
};
