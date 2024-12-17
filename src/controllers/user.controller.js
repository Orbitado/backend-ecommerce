import { userDBManager } from "../managers/user.manager.js";

const UserService = new userDBManager();

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const user = await UserService.getUserByID(req.params.uid);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

export const updateUserByID = async (req, res) => {
  const { pid } = req.params;
  const userUpdate = req.body;

  try {
    const result = await UserService.updateUserByID(pid, userUpdate);
    res.status(200).json({
      status: "success",
      message: "Usuario actualizado correctamente",
      result,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserService.deleteUser(req.params.uid);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};
