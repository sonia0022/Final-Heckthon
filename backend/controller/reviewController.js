import Review from '../models/review.js';

export const createReview = async (req, res) => {
    try {
        const { text, rating } = req.body;
        const { hijabId } = req.params;  // Get hijabId from params, NOT body

        if (!text || !rating) {
            return res.status(400).json({ message: "Text and rating are required." });
        }

        // Logging to debug
        console.log("Creating review for hijabId:", hijabId);
        console.log("User ID:", req.user?.id);

        if (!req.user?.id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const review = await Review.create({
            text,
            rating,
            hijabId,
            userId: req.user.id,
        });

        res.status(201).json(review);
    } catch (err) {
        console.error("Error creating review:", err);
        res.status(500).json({ message: 'Failed to add review', error: err.message });
    }
};


export const getReviewsForStyle = async (req, res) => {
    try {
        const { hijabId } = req.params;
        const reviews = await Review.find({ hijabId }).populate('userId', 'name');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error getting reviews', error: err.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { text, rating } = req.body;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Optional: check if user owns the review
        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        review.text = text;
        review.rating = rating;
        await review.save();

        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update review', error: err.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Optional: check if user owns the review
        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.deleteOne();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting review', error: err.message });
    }
};
