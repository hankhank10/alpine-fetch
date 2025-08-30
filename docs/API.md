# Alpine Fetch API Documentation

## Overview

Alpine Fetch provides three magic functions for making HTTP requests directly in Alpine.js markup:

- `$fetch` - Fetch text content from URLs
- `$fetchjson` - Fetch and parse JSON data
- `$fetchLoading` - Loading state management

## $fetch

Fetches text content from a URL.

### Syntax

```javascript
await $fetch(url, method, headers, body)
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | `string` | Required | The URL to fetch from |
| `method` | `string` | `'GET'` | HTTP method (GET, POST, PUT, DELETE, etc.) |
| `headers` | `object` | `{}` | Custom headers to send with the request |
| `body` | `any` | `null` | Request body for POST/PUT requests |

### Returns

- `Promise<string>` - The fetched text content
- Empty string `''` on error

### Examples

#### Basic GET request
```html
<div x-data>
    <span x-text="await $fetch('https://api.example.com/data')"></span>
</div>
```

#### POST request with JSON body
```html
<div x-data="{ user: { name: 'John', email: 'john@example.com' } }">
    <button @click="response = await $fetch('/api/users', 'POST', {}, user)">
        Create User
    </button>
    <div x-text="response"></div>
</div>
```

#### Request with custom headers
```html
<div x-data>
    <span x-text="await $fetch('/api/protected', 'GET', { 'Authorization': 'Bearer token123' })"></span>
</div>
```

## $fetchjson

Fetches and parses JSON data from a URL, optionally extracting a specific property.

### Syntax

```javascript
await $fetchjson(url, jsonItem, method, headers, body)
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | `string` | Required | The URL to fetch from |
| `jsonItem` | `string \| null` | `null` | The specific JSON property to extract |
| `method` | `string` | `'GET'` | HTTP method (GET, POST, PUT, DELETE, etc.) |
| `headers` | `object` | `{}` | Custom headers to send with the request |
| `body` | `any` | `null` | Request body for POST/PUT requests |

### Returns

- `Promise<any>` - The extracted JSON data or the entire JSON object
- `null` on error

### Examples

#### Fetch entire JSON object
```html
<div x-data>
    <pre x-text="JSON.stringify(await $fetchjson('https://api.example.com/data'), null, 2)"></pre>
</div>
```

#### Extract specific property
```html
<div x-data>
    <span x-text="await $fetchjson('https://api.example.com/weather', 'temperature')"></span>
</div>
```

#### POST JSON data
```html
<div x-data="{ data: { id: 1, name: 'test' } }">
    <button @click="result = await $fetchjson('/api/update', 'success', 'POST', {}, data)">
        Update Data
    </button>
    <div x-text="result"></div>
</div>
```

## $fetchLoading

Provides loading state management for requests.

### Syntax

```javascript
$fetchLoading
```

### Returns

- `object` - Loading state object with `isLoading` property

### Examples

#### Basic loading state
```html
<div x-data="{ data: null, loading: false }">
    <button @click="
        loading = true;
        data = await $fetch('/api/data');
        loading = false;
    ">
        Load Data
    </button>
    <div x-show="loading">Loading...</div>
    <div x-show="!loading && data" x-text="data"></div>
</div>
```

## Error Handling

Alpine Fetch includes built-in error handling:

### Automatic Error Handling
- Failed requests return empty string (`''`) for `$fetch`
- Failed requests return `null` for `$fetchjson`
- Errors are logged to console

### Manual Error Handling
```html
<div x-data="{ data: null, error: null }">
    <button @click="
        try {
            data = await $fetchjson('/api/data', 'result');
        } catch (e) {
            error = e.message;
        }
    ">
        Load Data
    </button>
    <div x-text="data"></div>
    <div x-show="error" x-text="error" style="color: red;"></div>
</div>
```

## HTTP Methods

All standard HTTP methods are supported:

- `GET` - Retrieve data
- `POST` - Create new data
- `PUT` - Update existing data
- `DELETE` - Remove data
- `PATCH` - Partial update
- `HEAD` - Get headers only
- `OPTIONS` - Get allowed methods

## Headers

### Default Headers
- `Content-Type: application/json` (for requests with body)

### Custom Headers
```html
<div x-data>
    <span x-text="await $fetch('/api/data', 'GET', {
        'Authorization': 'Bearer token123',
        'X-Custom-Header': 'value',
        'Accept': 'application/json'
    })"></span>
</div>
```

## Request Body

### JSON Body
```html
<div x-data="{ user: { name: 'John', email: 'john@example.com' } }">
    <button @click="response = await $fetch('/api/users', 'POST', {}, user)">
        Create User
    </button>
</div>
```

### String Body
```html
<div x-data>
    <button @click="response = await $fetch('/api/submit', 'POST', {}, 'raw data')">
        Submit Raw Data
    </button>
</div>
```

## Best Practices

### 1. Use Loading States
```html
<div x-data="{ data: null, loading: false }">
    <button @click="
        loading = true;
        data = await $fetch('/api/data');
        loading = false;
    ">
        Load Data
    </button>
    <div x-show="loading">Loading...</div>
    <div x-show="!loading && data" x-text="data"></div>
</div>
```

### 2. Handle Errors Gracefully
```html
<div x-data="{ data: null, error: null }">
    <button @click="
        try {
            data = await $fetchjson('/api/data', 'result');
        } catch (e) {
            error = e.message;
        }
    ">
        Load Data
    </button>
    <div x-show="error" x-text="error" style="color: red;"></div>
    <div x-show="!error && data" x-text="data"></div>
</div>
```

### 3. Cache Results
```html
<div x-data="{ 
    data: null,
    async loadData() {
        if (!this.data) {
            this.data = await $fetch('/api/data');
        }
    }
}">
    <button @click="loadData()">Load Data</button>
    <div x-text="data"></div>
</div>
```

### 4. Use Appropriate HTTP Methods
```html
<!-- GET for retrieving data -->
<span x-text="await $fetch('/api/users')"></span>

<!-- POST for creating data -->
<button @click="response = await $fetch('/api/users', 'POST', {}, newUser)">
    Create User
</button>

<!-- PUT for updating data -->
<button @click="response = await $fetch('/api/users/1', 'PUT', {}, updatedUser)">
    Update User
</button>

<!-- DELETE for removing data -->
<button @click="response = await $fetch('/api/users/1', 'DELETE')">
    Delete User
</button>
```

## Browser Support

Alpine Fetch requires:
- Modern browsers with `fetch` API support
- Alpine.js 3.x or later

## Performance Considerations

- Keep requests minimal and cache when possible
- Use appropriate HTTP methods
- Handle errors gracefully to prevent UI blocking
- Consider using loading states for better UX