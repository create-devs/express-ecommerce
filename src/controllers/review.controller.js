const db = require("../config/db.config");
const Review = db.reviews;

exports.createReview = async (req, res) => {
    if(!req.body.review){
        return res.status(400).json({
            message: "Review can't be empty!"
        })
    }

    const review = req.body;
    
    try {
		const data = await Review.create(review);
		res.json(data);
	} catch (err) {
		res.status(500).json({
			message: err.message
		})
	}
}