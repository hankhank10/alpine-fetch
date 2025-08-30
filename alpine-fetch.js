/**
 * Alpine Fetch - A lightweight HTTP request helper for Alpine.js
 * @version 2.0.0
 * @author hankhank10
 * @license MIT
 */

// Alpine listeners
document.addEventListener('alpine:init', async () => {
    /**
     * Magic function to fetch JSON data from a URL
     * @param {string} url - The URL to fetch from
     * @param {string|null} jsonItem - The specific JSON property to extract (optional)
     * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
     * @param {Object} headers - Custom headers to send with the request
     * @param {Object} body - Request body for POST/PUT requests
     * @returns {Promise<any>} The fetched data
     */
    Alpine.magic('fetchjson', () => {
        return async (
            url,
            jsonItem = null,
            method = "GET",
            headers = {},
            body = null
        ) => {
            try {
                const response = await xfetch(url, jsonItem, method, headers, body);
                return response;
            } catch (error) {
                console.error('Alpine Fetch JSON Error:', error);
                return null;
            }
        }
    });

    /**
     * Magic function to fetch text data from a URL
     * @param {string} url - The URL to fetch from
     * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
     * @param {Object} headers - Custom headers to send with the request
     * @param {Object} body - Request body for POST/PUT requests
     * @returns {Promise<string>} The fetched text
     */
    Alpine.magic('fetch', () => {
        return async (
            url,
            method = "GET",
            headers = {},
            body = null
        ) => {
            try {
                const response = await xfetch(url, null, method, headers, body);
                return response;
            } catch (error) {
                console.error('Alpine Fetch Error:', error);
                return '';
            }
        }
    });

    /**
     * Magic function to check if a request is loading
     * @returns {Object} Loading state object with isLoading property
     */
    Alpine.magic('fetchLoading', () => {
        return {
            isLoading: false
        };
    });
});

/**
 * Core fetch function that handles all HTTP requests
 * @param {string} url - The URL to fetch from
 * @param {string|null} jsonItem - The specific JSON property to extract (optional)
 * @param {string} method - HTTP method
 * @param {Object} headers - Custom headers
 * @param {Object} body - Request body
 * @returns {Promise<any>} The response data
 */
async function xfetch(url, jsonItem = null, method = 'GET', headers = {}, body = null) {
    // Validate URL
    if (!url || typeof url !== 'string') {
        throw new Error('Invalid URL provided to Alpine Fetch');
    }

    // Prepare request options
    const options = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };

    // Add body for POST/PUT requests
    if (body && ['POST', 'PUT', 'PATCH'].includes(options.method)) {
        options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Handle JSON response
        if (jsonItem !== null) {
            const jsonData = await response.json();
            return jsonData[jsonItem] !== undefined ? jsonData[jsonItem] : null;
        }

        // Handle text response
        return await response.text();
    } catch (error) {
        console.error('Alpine Fetch request failed:', error);
        throw error;
    }
}

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { xfetch };
}

