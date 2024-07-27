const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are require",
      });
    }

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

exports.showAllCategory = async (req, res) => {
  try {
    const allCategories = await Category.find({},{name:true , description:true});

    return res.status(200).json({
        success: true,
        message: "all Categories returned successfully",
        allCategories,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

exports.categoryPageDetails = async (req,res) => {
  try{
     const {categoryId} = req.body;

     const selectedCategory = await Category.findById(categoryId)
     .populate("courses")
     .exec();

     if(!selectedCategory){
      return res.status(404).json({
        success:false,
        message:"Data Not Found",
      })
     }

     

  } catch(err){



  }
}
