import { useCallback, useEffect, useState } from "react";
import request from "../utils/requester.js";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3030";

const baseUrl = `${API_BASE}/category-keywords`;

export const useGetKeywords = () => {
    const [keywords, setKeywords] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const fetchKeywords = useCallback(async () => {
        try {
            setIsLoading(true)

            const data = await request.get(baseUrl);
            setKeywords(data || [])
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchKeywords()
    }, [fetchKeywords])

    return {
        keywords,
        isLoading,
        setKeywords,
        refetch: fetchKeywords,
    }
}

export const useCreateKeyword = () => {
    const createKeyword = async (keywordData) =>
        await request.post(baseUrl, keywordData)

    return {
        createKeyword,
    }
}

export const useDeleteKeyword = () => {
    const deleteKeyword = async (keywordId) =>
        await request.delete(`${baseUrl}/${keywordId}`)

    return {
        deleteKeyword
    }
}