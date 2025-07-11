const productModel = require("../model/product.model");
const cloudinary = require("../config/cloudinery");

const newProduct = async (req, res) => {
  try {
    const { productTitle, price, description } = req.body;
    const productCodeGenerator = Math.floor(Math.random() * 100000000);
    const cloudImage = await cloudinary.uploader.upload(req.file.path);
    const productNew = await productModel.create({
      productTitle,
      price,
      description,
      productImage: cloudImage.secure_url,
      productImageID: cloudImage.public_id,
      productCode: `REDCART - ${productCodeGenerator}`,
    });

    res.status(201).json({
      message: "Product created Successfully",
      data: productNew,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to create Product",
      data: error,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const getProduct = await productModel.find();
    res.status(200).json({
      message: "Product gotten successfully",
      data: getProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get Product",
      data: error,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const getProductOne = await productModel.findById(req.params.id);
    res.status(200).json({
      message: "Single product gotten successfully",
      data: getProductOne,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get One Product",
      data: error,
    });
  }
};

module.exports = { newProduct, getAllProduct, getOneProduct };
