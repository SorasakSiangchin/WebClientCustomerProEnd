export interface ReviewResponse {
    averageScore?: number;
    reviews?: Review[];
};

export interface Review {
    id?: number;
    information?: string;
    vdoUrl?: string;
    score?: number;
    created?: Date;
    accountID?: string;
    orderItemID?: number;
    imageReviews?: ImageReview[];
};

export interface ReviewRequest {
    information?: string;
    videoFiles?: any;
    imageFiles?: any[];
    score?: number;
    created?: Date;
    accountID?: string;
    orderItemID?: number;
};

export interface ImageReview {
    id?: number;
    imageUrl?: string;
    reviewID?: number;
    review?: null;
};