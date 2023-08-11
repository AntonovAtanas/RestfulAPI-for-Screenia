const reviewCounter = (reviewsList) => {
    let totalReviews = 0;

    if (reviewsList.length == 0) {
        return 0;
    }

    for (const review of reviewsList) {
        totalReviews += review.rating;
    }
    return Number((totalReviews / reviewsList.length).toFixed(1))
};

module.exports = reviewCounter;

