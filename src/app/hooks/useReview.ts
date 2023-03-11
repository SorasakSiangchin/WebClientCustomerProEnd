import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchReviewByProductIdAsync, resetReviewByProductId, setParams } from '../store/reviewSilce';

interface Props {
    productId: string;
}

const useReview = ({ productId }: Props) => {
    const dispatch = useAppDispatch();
    const { reviews, reviewsLoaded, metaData } = useAppSelector(state => state.review);

    useEffect(() => {
        dispatch(fetchReviewByProductIdAsync());
    }, [reviewsLoaded ,dispatch]);

    useEffect(() => {
        dispatch(setParams({ productId }));
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetReviewByProductId());
        };
    }, []);

    return {
        reviewsLoaded,
        reviews,
        metaData,
        setParams
    }
};

export default useReview