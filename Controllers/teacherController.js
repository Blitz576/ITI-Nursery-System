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
    // Check if a file is uploaded
    if (!request.file) {
      return next(new Error("No file uploaded"));
    }

    const hashedPassword = await bycrypt.hash(request.body?.password, 10);

    // Update the password with hashedPassword
    request.body.password = hashedPassword;

    const newTeacher = new teacherShema(request.body);
    newTeacher.image = `${newTeacher._id}.jpg`;
    // Save the new teacher
    newTeacher
      .save()
      .then(() => {
        file.writeFile(
          `../uploads/${newTeacher.image}`,
          request.file.buffer,
          (error) => {
            if (error) {
              return next(new Error("Error while saving photo"));
            }
            response.status(201).json({ data: newTeacher });
          }
        );
      })
      .catch((err) => {
        next(new Error("Error while saving data"));
      });
  } catch (error) {
    next(error);
  }
};

exports.updateTeacher = (request, response, next) => {
  const id = request.body._id;
  teacherShema
    .findByIdAndUpdate(id, req.body, { new: true })
    .then(async (data) => {
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
exports.changePassword = async (req, res, next) => {
  const id = req.token._id;
  const oldPassword = req.body.old_password;
  const newPassword = req.body.new_password;

  try {
    // Find the teacher by ID
    const teacher = await teacherShema.findById(id);

    // Check if teacher exists
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Compare old password
    const isMatch = await bycrypt.compare(oldPassword, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Encrypt the new password
    const hashedPassword = await bycrypt.hash(newPassword, 10);

    // Update password
    const updatedTeacher = await teacherShema.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({
      message: "Password updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    next(error);
  }
};
