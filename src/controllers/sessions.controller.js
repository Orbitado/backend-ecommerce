export const registerUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ message: "Error al registrar el usuario." });
    }

    res.status(201).json({ message: "Usuario registrado exitosamente.", user });
  } catch (error) {
    res.status(500).json({
      message: "Error interno al registrar el usuario.",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email o contraseña incorrectos." });
    }

    res
      .cookie("token", user.token, { httpOnly: true })
      .status(200)
      .json({ message: "Sesión iniciada exitosamente.", user });
  } catch (error) {
    res.status(500).json({
      message: "Error interno al iniciar sesión.",
      error: error.message,
    });
  }
};

export const signOutUser = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Sesión cerrada exitosamente." });
  } catch (error) {
    res.status(500).json({
      message: "Error interno al cerrar la sesión.",
      error: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ message: "No se pudo obtener el usuario actual." });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: "Error interno al obtener el usuario actual.",
      error: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ message: "No se pudo verificar el usuario." });
    }

    res.status(200).json({ message: "Usuario verificado exitosamente.", user });
  } catch (error) {
    res.status(500).json({
      message: "Error interno al verificar el usuario.",
      error: error.message,
    });
  }
};
