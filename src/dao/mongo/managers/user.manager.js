import UserModel from "../models/user.model.js";

class userDBManager {
  async getAllUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.error("Error obteniendo los usuarios", error);
      throw error;
    }
  }

  async getUserByID(uid) {
    try {
      const user = await UserModel.findOne({ _id: uid });
      if (!user) {
        throw new Error(`Usuario con ID ${uid} no encontrado`);
      }
      return user;
    } catch (error) {
      console.error(`Error obteniendo el usuario con ID ${uid}`, error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      console.error(`Error obteniendo el usuario con email ${email}`, error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      if (
        !userData.first_name ||
        !userData.last_name ||
        !userData.email ||
        !userData.password
      ) {
        throw new Error("Faltan datos requeridos.");
      }

      const user = new UserModel({
        ...userData,
      });
      await user.save();
      return user;
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      throw error;
    }
  }

  async updateUserByID(uid, userUpdate) {
    if (!uid || !userUpdate) {
      throw new Error("No se proporcionaron datos para actualizar el usuario");
    }

    try {
      const result = await UserModel.findByIdAndUpdate(
        { _id: uid },
        userUpdate
      );

      if (result.matchedCount === 0) {
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
      const result = await UserModel.deleteOne({ _id: uid });
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
