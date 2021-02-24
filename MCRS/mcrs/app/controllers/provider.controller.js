const Provider = require("../models/provider.model.js");
const Project = require("../models/project.model.js");
const MethodChunk = require("../models/methodChunk.model.js");
const slugify = require("slugify");
const jwtConfig = require("../../config/jwt.config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.authenticate = (req, res) => {
  return Provider.findOne({ email: req.body.email })
    .then(result => {
      if (!result) {
        return res.status(401).send({
          message: "Email and password doesn't match."
        });
      }
      result.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({ id: result.id }, jwtConfig.secret);
          res.cookie("token", token);
          res.send({ token });
        } else {
          res.status(401).send({
            message: "Email and password doesn't match."
          });
        }
      });
    })
    .catch(err => {
      console.log("Authenticate", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.register = (req, res) => {
  const provider = new Provider({
    id: slugify(req.body.name, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: true
    }),
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    description: req.body.description,
    industry: req.body.industry,
    urls: req.body.urls,
    contacts: req.body.contacts,
    relatedProviders: req.body.relatedProviders
  });

  provider
    .save()
    .then(result => {
      const token = jwt.sign({ id: result.id }, jwtConfig.secret);
      res.cookie("token", token);
      res.send({ token });
    })
    .catch(err => {
      console.log("Create provider", err);
      res.status(400).send({
        message: err.message || "Some error occurred while saving."
      });
    });
};

exports.create = (req, res) => {
  if (req.body.length) {
    req.body.forEach(e => {
      (e.id = slugify(e.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      })),
        (e.password = bcrypt.hashSync(e.password, 10));
    });
    Provider.insertMany(req.body)
      .then(result => res.send(result))
      .catch(err => {
        console.log("Create bulk provider", err);
        res.status(400).send({
          message: err.message || "Some error occurred while saving."
        });
      });
  } else {
    const provider = new Provider({
      id: slugify(req.body.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
      }),
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      name: req.body.name,
      description: req.body.description,
      industry: req.body.industry,
      urls: req.body.urls,
      contacts: req.body.contacts,
      relatedProviders: req.body.relatedProviders
    });

    provider
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log("Create provider", err);
        res.status(400).send({
          message: err.message || "Some error occurred while saving."
        });
      });
  }
};

exports.findAll = (req, res) => {
  var criteria = {};
  if (req.query.email) {
    criteria.email = {
      $regex: new RegExp(req.query.email, "g"),
      $options: "i"
    };
  }
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
  if (req.query.industry) {
    criteria.industry = {
      $regex: new RegExp(req.query.industry, "g"),
      $options: "i"
    };
  }
  if (req.query.relatedProviders) {
    criteria.relatedProviders = {
      $regex: new RegExp(req.query.relatedProviders, "g"),
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
  Provider.find(criteria)
    .sort(sort)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log("Find all provider", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.findOne = (req, res) => {
  Provider.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Provider ${req.params.id} not found.`
        });
      }
      res.send(result);
    })
    .catch(err => {
      console.log("Find one provider", err);
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving."
      });
    });
};

exports.update = (req, res) => {
  Provider.findOne({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (req.body.description) {
        result.description = req.body.description;
      }
      if (req.body.industry) {
        result.industry = req.body.industry;
      }
      if (req.body.urls) {
        result.urls = req.body.urls;
      }
      if (req.body.contacts) {
        result.contacts = req.body.contacts;
      }
      if (req.body.relatedProviders) {
        result.relatedProviders = req.body.relatedProviders;
      }
      if (req.body.password) {
        result.password = req.body.password;
      }
      result.save((err, record) => {
        if (err) {
          console.log(err);
          res.status(400).send({
            message: err.message || "Some error occurred while updating."
          });
        } else {
          res.send(record);
        }
      });
    })
    .catch(err => {
      console.log("Update provider", err);
      res.status(400).send({
        message: err.message || "Some error occurred while updating."
      });
    });
};

exports.delete = (req, res) => {
  MethodChunk.deleteMany({ provider: req.params.id.toLowerCase() }).exec();
  Project.deleteMany({ provider: req.params.id.toLowerCase() }).exec();
  Provider.findOneAndRemove({ id: req.params.id.toLowerCase() })
    .then(result => {
      if (!result) {
        return res.status(404).send({
          message: `Provider ${req.params.id} not found.`
        });
      }
      res.send({ message: "Deleted successfully." });
    })
    .catch(err => {
      console.log("Hard delete provider", err);
      res.status(400).send({
        message: err.message || "Could not perform delete."
      });
    });
};
