import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/analytics';

export default {
    async getMonthlySummary({ from, to } = {}) {
        const params = new URLSearchParams();

        if (from) params.set('from', from);
        if (to) params.set('to', to);

        return await request.get(`${baseUrl}/monthly-summary?${params.toString()}`)
    }
}