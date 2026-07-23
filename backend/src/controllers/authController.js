const register = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Register API Working",
  });
};

const login = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login API Working",
  });
};

const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout API Working",
  });
};

const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Current User API Working",
  });
};

export { register, login, logout, getCurrentUser };
