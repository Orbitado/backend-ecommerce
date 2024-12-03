import { hashSync, compareSync, genSaltSync } from "bcrypt";

const hashPassword = (password) => {
  try {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = (password, hash) => {
  try {
    const result = compareSync(password, hash);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword, comparePassword };
