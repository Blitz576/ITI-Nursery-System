const { body } = require("express-validator"); //validation step
//import schema
const childSchema = require("../Model/childSchema");

exports.getAllChild = (req, res, next) => {
   childSchema
     .find()
     .then((data) => {
       res.status(200).json({ data });
     })
     .catch((error) => next(error));

};

exports.getchildById = (req, res, next) => {
  const id = req.params.id;
  childShema
    .findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "child not found" });
      }
      res.status(200).json(data);
    })
    .catch((err) => next(err));
};

exports.insert = (req, res, next) => {
  let object = new childSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((error) => next(error));
};

exports.update = (req, res, next) => {
   const id = req.body._id;
   childShema
     .findByIdAndUpdate(id, req.body, { new: true })
     .then((data) => {
       if (!data) {
         res.status(404).json({ message: "child not found" });
       }
       res.status(200).json({ data: "updated sucessfully" });
     })
     .catch((err) => next(err));
};


exports.delete = (req, res, next) => {
  const id = req.params.id;
  childShema
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "child not found" });
      }
      res.status(200).json({ data: "deleted sucessfully" });
    })
    .catch((err) => next(err));
};
