import { useCallback, useEffect, useState } from "react";
import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/categories';

export const useGetCategories = () => {
    const [isCategoriesLoading, setIsCategoryLoading] = useState(true)
    const [categories, setCategories] = useState([])

    const fetchCategories = useCallback(async () => {
        try {
            setIsCategoryLoading(true)

            const data = await request.get(baseUrl)
            setCategories(data || [])
        } finally {
            setIsCategoryLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories])

    return {
        categories,
        setCategories,
        isCategoriesLoading,
        refetch: fetchCategories
    }
}

export const useCreateCategories = () => {
    const create = async (categoryData) =>
        await request.post(baseUrl, categoryData)

    return {
        create
    }
}

export const usePatchCategories = () => {
    const patch = async (categoryId, categoryData) =>
        await request.patch(`${baseUrl}/${categoryId}`, categoryData)

    return {
        patch
    }
}

export const useDeleteCategories = () => {
    const deleteCategory = async (categoryId) =>
        await request.delete(`${baseUrl}/${categoryId}`)

    return {
        deleteCategory
    }
}