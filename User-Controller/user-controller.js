const CRUD = require('./../User-Controller/handlerFactory');
const User = require('./../models/user-model');

exports.createUSer = CRUD.createOne(User);
exports.deleteUser = CRUD.deleteOne(User);
exports.updateOne = CRUD.updateOne(User);
exports.getAllUsers = CRUD.getAll(User);
exports.getOneUser = CRUD.getOne(User);
