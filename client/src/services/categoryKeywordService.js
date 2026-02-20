import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/category-keywords';

export default {
    async getKeywords() {
        return await request.get(baseUrl)
    },
    async createKeyword(keywordData) {
        return await request.post(baseUrl, keywordData)
    },
    async deleteKeyword(keywordId) {
        return await request.delete(`${baseUrl}/${keywordId}`)
    }
}