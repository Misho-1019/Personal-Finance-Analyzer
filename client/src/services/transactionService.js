import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/transactions';

export default {
    async list({page, pageSize} = {}) {
        const params = new URLSearchParams({
            page: String(page),
            pageSize: String(pageSize),
        })

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