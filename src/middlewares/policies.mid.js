export const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "No autorizado. Usuario no autenticado." });
    }

    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Acceso denegado. Rol insuficiente." });
    }

    next();
  };
};
