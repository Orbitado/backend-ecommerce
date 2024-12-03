import userModel from "../models/user.model.js";

class userDBManager {
  async getAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.error("Error obteniendo los usuarios", error);
      throw error;
    }
  }

  async getUserByID(uid) {
    try {
      const user = await userModel.findOne({ _id: uid });
      if (!user) {
        throw new Error(`Usuario con ID ${uid} no encontrado`);
      }
      return user;
    } catch (error) {
      console.error(`Error obteniendo el usuario con ID ${uid}`, error);
      throw error;
    }
  }

  async createUser(user) {
    if (!user) {
      throw new Error("No se proporcionaron datos para crear el usuario");
    }

    try {
      return await userModel.create(user);
    } catch (error) {
      console.error("Error creando el usuario", error);
      throw error;
    }
  }

  async updateUserByID(uid, userUpdate) {
    if (!uid || !userUpdate) {
      throw new Error("No se proporcionaron datos para actualizar el usuario");
    }

    try {
      const result = await userModel.updateOne({ _id: uid }, userUpdate);
      if (result.nModified === 0) {
        throw new Error(`Usuario con ID ${uid} no encontrado`);
      }
      return result;
    } catch (error) {
      console.error(`Error actualizando el usuario con ID ${uid}`, error);
      throw error;
    }
  }

  async deleteUser(uid) {
    if (!uid) {
      throw new Error("No se proporcion  el ID del usuario a eliminar");
    }

    try {
      const result = await userModel.deleteOne({ _id: uid });
      if (result.deletedCount === 0) {
        throw new Error(`Usuario con ID ${uid} no encontrado`);
      }
      return result;
    } catch (error) {
      console.error(`Error eliminando el usuario con ID ${uid}`, error);
      throw error;
    }
  }
}

export { userDBManager };
