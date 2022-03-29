const bcrypt = require("bcryptjs");
const validator = require("validator");
const Session = require("../models/Session");
const User = require("../models/User");
const multer = require("multer");

exports.getUser = (req, res, next) => {
  User.findOne({
    where: {
      id: req.query._id,
    },
  })
    .then((user) => {
      if (user) {
        res.status(200).send({
          data: user,
        });
      } else {
        res.status(404).json({
          Error: {
            code: 404,
            Message: "No user found with this id",
          },
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.createUser = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return bcrypt
          .hash(req.body.password, 12)
          .then((hashedPassword) => {
            console.log("hashedPassword");
            const user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            res.status(200).send({ data: result });
          });
      } else {
        res.status(404).json({
          Error: {
            code: 404,
            Message: "E-Mail exists already, please pick a different one.",
          },
        });
        res.status(400).send({
          error: "E-Mail exists already, please pick a different one.",
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.updateUser = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (user) {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        console.log("hashedPassword");
        await user.update(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
          },
          { where: { id: user.id } }
        );
        res.status(200).send({ data: user });
      } else {
        res.status(404).json({
          Error: {
            code: 404,
            Message: "User Does Not Exists",
          },
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  User.findOne({
    where: {
      id: req.query._id,
    },
  })
    .then(async (user) => {
      if (user) {
        const result = await user.destroy({
          where: {
            id: user.id,
          },
        });
        const result_1 = user;
        res.status(200).send({ data: result_1 });
      } else {
        res.status(404).json({
          Error: {
            code: 404,
            Message: "User Does Not Exists",
          },
        });
      }
    })
    .catch((err) => console.log(err));
};
