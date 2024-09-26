const { v4 } = require("uuid");

const generateId = () => {
  return v4();
};

module.exports = {
  generateId,
};
