import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/transactions';

export default {
    async list({page, pageSize, from, to, type, categoryId} = {}) {
        const params = new URLSearchParams()

        params.set('page', String(page))
        params.set('pageSize', String(pageSize))

        if (from) params.set('from', from);
        if (to) params.set('to', to);

        if (type && type !== 'ALL') params.set('type', type);
        if (categoryId) params.set('categoryId', categoryId)

        return await request.get(`${baseUrl}?${params.toString()}`)
    },
    async create(transactionData, userId) {
        return request.post(baseUrl, { ...transactionData, userId })
    },
    async getOne(transactionId) {
        return request.get(`${baseUrl}/${transactionId}`)
    },
    async patch(transactionId, transactionData) {
        return request.patch(`${baseUrl}/${transactionId}`, transactionData)
    },
    async delete(transactionId) {
        return request.delete(`${baseUrl}/${transactionId}`)
    }
}