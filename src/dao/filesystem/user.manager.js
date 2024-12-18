import fs from "fs/promises";
import path from "path";

class UserFSManager {
  constructor() {
    this.filePath = path.resolve("./src/dao/filesystem/files/users.json");
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        // Si el archivo no existe, inicializamos una estructura vacía
        await fs.writeFile(this.filePath, JSON.stringify([]));
        return [];
      }
      throw new Error("Error al leer el archivo de usuarios.");
    }
  }

  async _writeFile(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error("Error al escribir en el archivo de usuarios.");
    }
  }

  async getAllUsers() {
    try {
      const users = await this._readFile();
      return users;
    } catch (error) {
      console.error("Error obteniendo los usuarios", error);
      throw error;
    }
  }

  async getUserByID(uid) {
    try {
      const users = await this._readFile();
      const user = users.find((u) => u._id === uid);

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
      const users = await this._readFile();
      const user = users.find((u) => u.email === email);
      return user || null;
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

      const users = await this._readFile();
      const newUser = {
        _id: Date.now().toString(), // Generar un ID único
        ...userData,
      };

      users.push(newUser);
      await this._writeFile(users);

      return newUser;
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
      const users = await this._readFile();
      const index = users.findIndex((u) => u._id === uid);

      users[index] = { ...users[index], ...userUpdate };
      await this._writeFile(users);

      return users[index];
    } catch (error) {
      console.error(`Error actualizando el usuario con ID ${uid}`, error);
      throw error;
    }
  }

  async deleteUser(uid) {
    if (!uid) {
      throw new Error("No se proporcionó el ID del usuario a eliminar");
    }

    try {
      const users = await this._readFile();
      const index = users.findIndex((u) => u._id === uid);

      const deletedUser = users.splice(index, 1);
      await this._writeFile(users);

      return deletedUser[0];
    } catch (error) {
      console.error(`Error eliminando el usuario con ID ${uid}`, error);
      throw error;
    }
  }
}

export { UserFSManager };
