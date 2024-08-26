const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/Users");
const { uploadImageToCloudinary } = require("../utils/ImageUpload");

exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("id: ",userId);

    let { courseName,
       courseDescription,
       whatYouWillLearn,
        price,
        tag: _tag,
        category,
        status,
        instructions: _instructions,
       } =
      req.body;

    const thumbnail = req.files.thumbnailImage;

     // Convert the tag and instructions from stringified Array to Array

     const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)


    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      // !tag.length ||
      !thumbnail ||
      !category 
      // !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are require",
      });
    }

    if (!status || status === undefined) {
      status = "Draft"
    }

    const instructorDetails = await User.findById(userId , {
      accountType: "Instructor",
    });
    console.log("instructor", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details not found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    });

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {

            courses: newCourse._id,

        },
      },
      { new: true }
    );

    //  update the tag ka schema

    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)


    return res.status(200).json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to Created ",
      error: err.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all Courses fetched Successfully",
      data: allCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Cannot fetch course data ",
      error: err.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findOne(
      { _id: courseId })
      .populate({
        path: "Instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `could not find the course with ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


