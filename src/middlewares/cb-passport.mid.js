import passport from "./passport.mid.js";

export const passportCb = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(info.statusCode).send({
          status: "error",
          message: info.message,
        });
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
