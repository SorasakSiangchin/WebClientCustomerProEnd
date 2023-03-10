import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchReviewByProductIdAsync, resetReviewByProductId } from '../store/reviewSilce';

interface Props {
    productId: string;
}

const useReview = ({ productId }: Props) => {
    const dispatch = useAppDispatch();
    const { reviews, reviewsLoaded } = useAppSelector(state => state.review);

    useEffect(() => {
        if (!reviewsLoaded) dispatch(fetchReviewByProductIdAsync(productId));
    }, [reviewsLoaded, dispatch]);

    useEffect(() => {
        () => {
            dispatch(resetReviewByProductId());
        }
    }, []);

    return {
        reviewsLoaded,
        reviews
    }
};

export default useReview