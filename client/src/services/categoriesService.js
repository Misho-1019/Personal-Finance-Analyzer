import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/categories';

export default {
    async getCategories() {
        const result = await request.get(baseUrl)

        const categories = Object.values(result)

        return categories;
    }
}