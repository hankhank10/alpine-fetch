/**
 * Alpine Fetch TypeScript declarations
 * @version 2.0.0
 */

declare global {
    interface Window {
        Alpine: {
            magic: (name: string, fn: () => any) => void;
        };
    }
}

export interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
    headers?: Record<string, string>;
    body?: any;
}

export interface AlpineFetch {
    /**
     * Fetch text content from a URL
     * @param url - The URL to fetch from
     * @param method - HTTP method (default: 'GET')
     * @param headers - Custom headers to send
     * @param body - Request body for POST/PUT requests
     * @returns Promise<string> - The fetched text content
     */
    (url: string, method?: string, headers?: Record<string, string>, body?: any): Promise<string>;
}

export interface AlpineFetchJson {
    /**
     * Fetch and parse JSON from a URL
     * @param url - The URL to fetch from
     * @param jsonItem - The specific JSON property to extract (optional)
     * @param method - HTTP method (default: 'GET')
     * @param headers - Custom headers to send
     * @param body - Request body for POST/PUT requests
     * @returns Promise<any> - The extracted JSON data
     */
    (url: string, jsonItem?: string | null, method?: string, headers?: Record<string, string>, body?: any): Promise<any>;
}

export interface AlpineFetchLoading {
    /**
     * Loading state object
     */
    isLoading: boolean;
}

declare module 'alpinejs' {
    interface Alpine {
        $fetch: AlpineFetch;
        $fetchjson: AlpineFetchJson;
        $fetchLoading: AlpineFetchLoading;
    }
}

export {};