import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/category-keywords';

export default {
    async getKeywords() {
        return await request.get(baseUrl)
    }
}