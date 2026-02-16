import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/transactions';

export default {
    async create(transactionData, userId) {
        return request.post(baseUrl, { ...transactionData, userId })
    }
}