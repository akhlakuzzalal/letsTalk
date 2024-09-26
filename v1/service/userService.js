const User = require("../model/userModel");

const createUser = async (user) => {
  try {
    const newUser = (await User.create({ ...user })).toObject();
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async (filter) => {
  try {
    return await User.find(filter);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByKey = async (key) => {
  try {
    return await User.findOne({ ...key }).lean();
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (key, updateBody) => {
  try {
    return await User.findOneAndUpdate(
      { ...key },
      { ...updateBody },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (key) => {
  try {
    return await User.findOneAndDelete({ ...key });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByKey,
  updateUser,
  deleteUser,
};
