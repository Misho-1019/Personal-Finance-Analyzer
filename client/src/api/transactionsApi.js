/* eslint-disable react-hooks/set-state-in-effect */
import request from "../utils/requester.js";
import useAuth from "../hooks/useAuth.js";
import { useEffect, useState } from "react";

const baseUrl = 'http://localhost:3030/transactions';

export const useCreateTransaction = () => {
    const { request } = useAuth();

    const create = async (transactionData) => 
        await request.post(baseUrl, { ...transactionData })

    return {
        create
    }
}

export const useTransactions = (filters = {}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState({})

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);

                const params = new URLSearchParams()

                const {
                    page = 1,
                    pageSize = 20,
                    from,
                    to,
                    type,
                    categoryId,
                } = filters;

                params.set('page', String(page))
                params.set('pageSize', String(pageSize))
        
                if (from) params.set('from', from);
                if (to) params.set('to', to);
        
                if (type && type !== 'ALL') params.set('type', type);
                if (categoryId) params.set('categoryId', categoryId);

                const data = await request.get(`${baseUrl}?${params.toString()}`)

                setTransactions(data)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(filters)])

    return { isLoading, transactions }
}

export const useTransaction = (transactionId) => {
    const [isLoading, setIsLoading] = useState(true)
    const [transaction, setTransaction] = useState('')

    useEffect(() => {
        setIsLoading(true);
        
        request.get(`${baseUrl}/${transactionId}`)
          .then(setTransaction)
          .finally(() => setIsLoading(false))
    }, [transactionId])

    return { isLoading, transaction }
}

export const usePatchTransaction = () => {
    const patch = async (transactionId, transactionData) =>
        await request.patch(`${baseUrl}/${transactionId}`, transactionData)

    return {
        patch
    }
}

export const useDeleteTransaction = () => {
    const deleteTransaction = async (transactionId) => 
        await request.delete(`${baseUrl}/${transactionId}`)

    return { deleteTransaction }
}