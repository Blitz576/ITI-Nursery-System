const teacherShema = require("../Model/teacherSchema"); //import schema object
const ClassShema = require("../Model/classSchema"); //to get supervisor

const file = require("fs"); //file system(to deal with uploads)

const bycrypt = require("bcrypt"); //for encryption using hasing algorithm
const { body } = require("express-validator");

exports.getIdTeacher = (request, response, next) => {
  const id = request.params.id;
  teacherShema
    .findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ data: "Teacher not found" });
      }
      res.status(200).json(data);
    })
    .catch((err) => next(err));
};

exports.getAllTeachers = (request, response, next) => {
  teacherShema
    .find()
    .then((data) => response.status(200).json(data))
    .catch((err) => next(err));
};

exports.insertTeacher = async (request, response, next) => {
  try {
    return response.status(200).json({body: request.body , file: request.file})
    const hashedPassword = await bycrypt.hash(request.body.password, 10);
    //update the password with hashedPassword
    request.body.password = hashedPassword;

    
    // Check if a file is uploaded
    if (!request.file) {
      return next(new Error("No file uploaded"));
    }
    
    const newTeacher = new teacherShema(request.body);
    
    file.writeFile(
      `../uploads/${newTeacher._id}.jpg`,
      request.file.buffer,
      (error) => {
        if (error) {
          return next(new Error("Error while saving photo"));
        }
        response.status(201).json({ data: newTeacher });
      }
      );
    } catch (error) {
      next(error);
    }
    await newTeacher.save();
  };


exports.updateTeacher = (request, response, next) => {
  const id = request.body._id;
  teacherShema
    .findByIdAndUpdate(id, req.body, { new: true })
    .then( async (data) => {
      if (!data) {
        response.status(404).json({ data: "Teacher not found" });
      }
      //encrypt password 
      const hashedPassword = await bycrypt.hash(request.body.password, 10);
      //update the password with hashedPassword
      request.body.password = hashedPassword;


      file.writeFile(`../uploads/${id}.jpg`, request.file.buffer, (error) => {
        if (error) {
          return next(Error("Error while saving photo"));
        }
        response.status(200).json({ data: "Updated successfully with photo" });
      });

      response.status(200).json({ data: "updated Successful" });
    })
    .catch((err) => next(err));
};

exports.deleteTeacher = (request, response, next) => {
  const id = request.params.id;
  teacherShema
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        response.status(404).json({ data: "Teacher not found" });
      }
      res.status(200).json({ data: "deleted Successful" });
    })
    .catch((err) => next(err));
};

exports.getSupervisors = (request, response, next) => {
  ClassShema.find({})
    .populate({
      path: "supervisor",
      select: { fullName: 1 },
    })
    .then((data) => {
      let supervisors = data.map((item) => item.supervisor);
      res.status(200).json({ supervisors });
    })
    .catch((err) => next(err));
};
exports.changePassword = (req, res, next) => {
  const id = req.token._id;
  const oldPassword = req.body.old_password;
  const newPassword = req.body.new_password;

  teacherShema
    .findById(id)
    .then((teacher) => {
      if (!teacher) {
        throw new Error("Teacher not found");
      }
      if (teacher.password !== oldPassword) {
        throw new Error("Incorrect old password");
      }
      // Update password
      return teacherShema.findByIdAndUpdate(
        id,
        { password: newPassword },
        { new: true }
      );
    })
    .then((updatedTeacher) => {
      res.status(200).json({
        message: "Password updated successfully",
        data: updatedTeacher,
      });
    })
    .catch((error) => {
      next(error);
    });
};
