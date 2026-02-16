import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/transactions';

export default {
    async list() {
        const result = await request.get(baseUrl);

        const transactions = Object.values(result)

        return transactions;
    },
    async create(transactionData, userId) {
        return request.post(baseUrl, { ...transactionData, userId })
    }
}