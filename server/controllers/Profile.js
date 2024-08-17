const Profile = require("../models/Profile");
const User = require("../models/Users");
const CourseProgress = require("../models/CourseProgress");

const Course = require("../models/Course");

const { uploadImageToCloudinary } = require("../utils/ImageUpload");
const mongoose = require("mongoose");

const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateProfile = async (res, req) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;
    const id = req.user.id;

    // if (!contactNumber || !gender || !id) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All Fields are require",
    //   });
    // }

    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    await user.save();

    // const profileDetails = await Profile.findById(profileId);

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;
    await profileDetails.save();

    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profileDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(userDetails.additionalDetails),
    });

    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: id } },
        { new: true }
      );
    }

    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "User Delete Successfully",
    })




  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted successfully",
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


exports.getAlluserDetails = async (req,res) => { 
  try {

    const id = req.user.id;
    const userDetails = await User.findById(id)
    .populate("additionalDetails")
    .exec();

    console.log(userDetails);
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data:userDetails,
    });

  } catch(err){
    return res.status(500).json({
      success: false,
      error: err.message,
      });
  }
}

exports.getEnrollrdCourses = async (req,res) => {
    try{
      const userId = req.user.id;

      const userDetails = await User.findOne({
        _id:userId,
      })
      .populate("courses")
      .exec();

      if(!userDetails) {
        return res.status(404).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
          });
      }

      return res.status(200).json({
        success: true,
        data:userDetails.courses,
      })

    } catch(err){
      return res.status(500).json({
        success: false,
        error: err.message,
        });

    }
}
