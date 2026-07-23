const createCenter = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Create Center API Working",
  });
};

const getCenters = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get Centers API Working",
  });
};

const getSingleCenter = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get Single Center API Working",
  });
};

const updateCenter = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update Center API Working",
  });
};

const deleteCenter = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete Center API Working",
  });
};

export {
  createCenter,
  getCenters,
  getSingleCenter,
  updateCenter,
  deleteCenter,
};
