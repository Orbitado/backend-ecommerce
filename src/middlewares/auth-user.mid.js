import passport from "passport";

export const authenticateUser = (req, res, next) => {
  passport.authenticate("current", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error interno del servidor." });
    }
    if (!user) {
      return res
        .status(401)
        .json({
          message: info?.message || "No autorizado. Usuario no autenticado.",
        });
    }

    req.user = user;
    next();
  })(req, res, next);
};
