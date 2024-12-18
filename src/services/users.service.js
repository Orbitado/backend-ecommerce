import { getUserDAO } from "../dao/index.factory.js";
import UserDTO from "../dto/user.dto.js";

class UserService {
  constructor() {
    this.UserDAO = null;
  }

  async init() {
    this.UserDAO = await getUserDAO();
  }

  async getAllUsers() {
    return await this.UserDAO.getAllUsers();
  }

  async getUserByID(uid) {
    return await this.UserDAO.getUserByID(uid);
  }

  async getUserByEmail(email) {
    return await this.UserDAO.getUserByEmail(email);
  }

  async createUser(user) {
    return await this.UserDAO.createUser(new UserDTO(user));
  }

  async updateUserByID(uid, userUpdate) {
    return await this.UserDAO.updateUserByID(uid, userUpdate);
  }

  async deleteUser(uid) {
    return await this.UserDAO.deleteUser(uid);
  }
}

const userService = new UserService();
await userService.init();
export default userService;
