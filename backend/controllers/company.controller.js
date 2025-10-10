import { Company } from "../models/company.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already registered",
        success: false,
      });
    }
    company = await Company.create({ name: companyName, userId: req.userId });
    return res.status(200).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.userId;
    let company = await Company.find({ userId });
    if (!company || company.length === 0) {
      return res.status(400).json({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
      message: "Companies retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    let company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
      message: "Company retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Information updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
