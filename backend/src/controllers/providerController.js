const createProviderProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Create Provider Profile API Working",
  });
};

const getProviderProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get Provider Profile API Working",
  });
};

const updateProviderProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update Provider Profile API Working",
  });
};

export { createProviderProfile, getProviderProfile, updateProviderProfile };
