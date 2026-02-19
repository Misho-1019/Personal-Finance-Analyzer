import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/categories';

export default {
    async getCategories() {
        const result = await request.get(baseUrl)

        const categories = Object.values(result)

        return categories;
    },
    async createCategory(categoryData) {
        return await request.post(baseUrl, categoryData)
    },
    async updateCategory(categoryId, categoryData) {
        return await request.patch(`${baseUrl}/${categoryId}`, categoryData)
    },
    async deleteCategory(categoryId) {
        return await request.delete(`${baseUrl}/${categoryId}`)
    }
}