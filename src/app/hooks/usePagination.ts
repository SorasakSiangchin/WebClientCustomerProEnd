import React, { useState } from 'react'

interface Props {
    pageSize: number;
}

const usePagination = ({ pageSize }: Props) => {
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(pageSize);

    const handleChange = (page: any) => {
        setCurrent(page);
        setMinIndex((page - 1) * pageSize);
        setMaxIndex(page * pageSize);
    };

    return {
        handleChange,
        current,
        minIndex,
        maxIndex ,
        pageSize
    }
}

export default usePagination