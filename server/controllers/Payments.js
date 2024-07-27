const { instance } = require("../config/razorPay");
const Course = require("../models/Course");
const User = require("../models/Users");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async (req, res) => {
  const { course_id } = req.body;
  const userId = req.body.id;

  if (!course_id.length) {
    return res.json({
      success: false,
      message: "please provide valid course id",
    });
  }

  let course;

  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "Could not find the Course",
      });
    }
    // user id ko jo ki string type thi usko object id me convert me .. qki user id course ki model me object id
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res
        .status(200)
        .json({ success: false, message: "Student is already Enrolled" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }

  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id,
      userId,
    },
  };

  try {
    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Could Not initiate order",
    });
  }
};

exports.verifySignature = async (req, res) => {
  const webhookSecrete = "12345678";

  const signature = req.headers("x-razorpay-signature");

  const shasum = crypto.createHmac("sha256", webhookSecrete);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("payment is authorize");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }

      console.log(enrolledCourse);

      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { push: { courses: courseId } },
        { new: true }
      );

      console.log(enrolledCourse);

      const emailResponce = await mailSender(
        enrolledStudent.email,
        "Congratulations , you are ",
        "uiiu"
      );

      console.log(emailResponce);
      return res.status(200).json({
        success: true,
        message: "Signature verified and Course added",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }else {
    return res.status(400).json({
        success:false,
        message:"Invalid request"
    })
  }
};
