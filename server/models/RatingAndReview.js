const mongoose = require("mongoose");
const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    rating:{
        type:String,
        require:true,
    },
    review:{
        type:String,
        require:true,
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},

});

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema);