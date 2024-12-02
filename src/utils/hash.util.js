import { hashSync, compareSync, genSaltSync } from "bcrypt";

const hashPassword = (password) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

const comparePassword = (password, hash) => {
  const result = compareSync(password, hash);
  return result;
};

export { hashPassword, comparePassword };
