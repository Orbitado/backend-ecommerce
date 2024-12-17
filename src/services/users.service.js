import { userDBManager } from "../dao/mongo/managers/user.manager.js";

const UserService = new userDBManager();

export const getAllUsers = async () => await UserService.getAllUsers();

export const getUserByID = async (uid) => await UserService.getUserByID(uid);

export const getUserByEmail = async (email) =>
  await UserService.getUserByEmail(email);

export const createUser = async (userData) =>
  await UserService.createUser(userData);

export const updateUserByID = async (uid, userUpdate) =>
  await UserService.updateUserByID(uid, userUpdate);

export const deleteUser = async (uid) => await UserService.deleteUser(uid);

export default UserService;
