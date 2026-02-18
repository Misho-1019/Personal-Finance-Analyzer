const API_BASE = 'http://localhost:3030';

let refreshPromise = null;

async function refreshSession() {
    if (!refreshPromise) {
        refreshPromise = fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        }).finally(() => {
            refreshPromise = null
        })
    }

    const response = await refreshPromise;

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))

        throw {
            message: error?.error || error?.message || 'Session expired!',
            status: response.status
        }
    }
}

const request = async (method, url, data, options = {}) => {
    const makeOptions = () => {
        let finalOptions = {...options};

        if (method !== 'GET') {
            finalOptions.method = method
        }

        
        if (data) {
            finalOptions = {
                ...finalOptions,
                headers: {
                    'Content-Type': 'application/json',
                    ...finalOptions.headers,
                },
                body: JSON.stringify(data)
            }
        }

        return {
            credentials: 'include',
            ...finalOptions,
        }
    }

    const doFetch = () => fetch(url, makeOptions())

    let response = await doFetch()

    const isRefreshCall = url === `${API_BASE}/auth/refresh`;
    if (response.status === 401 && !isRefreshCall) {
        await refreshSession();

        response = await doFetch();
    }

    if (response.status === 204) {
        return null
    }

    const contentType = response.headers.get('Content-Type') || '';
    const isJson = contentType.includes('application/json')

    if (!response.ok) {
        let errorData = null;

        if (isJson) {
            errorData = await response.json().catch(() => null)
        }

        throw (
            errorData || {
                message: `Request failed (${response.status})`,
                status: response.status
            }
        )
    }

    if (!isJson) {
        return null
    }

    return response.json();
}

export default {
    get: request.bind(null, 'GET'),
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    patch: request.bind(null, 'PATCH'),
    delete: request.bind(null, 'DELETE'),
    baseRequest: request,
}