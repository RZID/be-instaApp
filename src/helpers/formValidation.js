const mongoose = require("mongoose");
module.exports = {
  isEmpty: (objectValidate, arrOfValidation) => {
    return new Promise(async (resolve) => {
      let emptyField = [];
      await arrOfValidation.map((el) => {
        if (!objectValidate[el]) emptyField.push(el);
      });
      resolve(emptyField);
    });
  },
  isObjectId: (id) => {
    return new Promise((resolve) => {
      resolve(mongoose.Types.ObjectId.isValid(id));
    });
  },
};
