import  { useState, useEffect } from 'react';

export function useFetch(url) {
    const [commentlist, setCommentList] = useState([]);

    useEffect(async () => {
        const result = await (await fetch(url)).json();
        setCommentList(result.sort((a, b) => b.fave - a.fave))
    }, [])

    return [commentlist, setCommentList];
}