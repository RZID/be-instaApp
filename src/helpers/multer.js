const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const limiterSize = 3; // Megabyte unit
const responser = require("../helpers/responser");

// Multer storage configuration
const multerStorage = (dir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${uuidv4()}${path.extname(file.originalname)}`);
    },
  });

// Multer upload configuration
const multerUpload = (dir) =>
  multer({
    storage: multerStorage(dir),
    limits: {
      fileSize: limiterSize * 1024 * 1024, // Megabyte unit
    },
    fileFilter: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      if (/\.(jpe?g|png)$/i.test(extension)) {
        cb(null, true);
      } else {
        cb(
          {
            message:
              "File extension not allowed! [Please upload like: jpeg/jpg/png]",
            code: "notMatchType",
          },
          false
        );
      }
    },
  });

// Upload methods
module.exports = {
  post: (req, res, next) => {
    const upload = multerUpload("./storages/post/").array("files");
    if (upload) {
      upload(req, res, (err) => {
        if (err) {
          // Error conditional
          switch (err.code) {
            case "LIMIT_FILE_SIZE":
              return responser.badRequest_400(
                res,
                `The file size is too large, please enter the file under ${limiterSize}MB`
              );
            case "notMatchType":
              return responser.badRequest_400(res, err.message);
            default:
              return responser.internalServerError_500(
                res,
                "Oops, an error occured in our system",
                err
              );
          }
        } else {
          next();
        }
      });
    } else {
      next();
    }
  },
};
