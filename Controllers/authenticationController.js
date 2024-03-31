const teacherShema = require("../Model/teacherSchema");
const {adminName , adminPass} = require("../Model/admininfo")
const jwt = require("jsonwebtoken");


const checkAdmin= function(admin){
  if(admin.fullName == adminName && admin.password == adminPass)
     return true;

  return false;   
}

exports.login = (req, res, next) => {
  if(checkAdmin(req.body)){
      let token = jwt.sign(
        {
          role: "admin",
        },
        process.env.SECRETKEY,
        { expiresIn: "1h" }
      );
      res.json({ data: "Authenticated", token });
  } 
 
  else{
  teacherShema
    .findOne({
      fullName: req.body.fullName,
      password: req.body.password,
    })
    .then((teacher) => {
      if (!teacher) {
        throw new Error("User not found");
      }

      let token = jwt.sign(
        {
          _id: teacher._id,
          role: teacher.role,
        },
        process.env.SECRETKEY,
        { expiresIn: "1h" }
      );
      res.json({ data: "Authenticated", token });
    })
    .catch((err) => next(err));
  }
};
