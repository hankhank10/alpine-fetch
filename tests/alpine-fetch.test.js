/**
 * Alpine Fetch Test Suite
 * Simple test framework for Alpine Fetch functionality
 */

// Simple test framework
class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    async run() {
        console.log('🧪 Running Alpine Fetch Tests...\n');
        
        for (const test of this.tests) {
            try {
                await test.fn();
                console.log(`✅ ${test.name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${test.name}`);
                console.log(`   Error: ${error.message}`);
                this.failed++;
            }
        }
        
        console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    }

    assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(`${message}: expected ${expected}, got ${actual}`);
        }
    }
}

// Mock browser environment
global.document = {
    addEventListener: (event, callback) => {
        if (event === 'alpine:init') {
            callback();
        }
    }
};

// Mock Alpine.js for testing
global.Alpine = {
    magic: (name, fn) => {
        global[`$${name}`] = fn();
    }
};

// Mock fetch for testing
global.fetch = async (url, options = {}) => {
    // Simulate different responses based on URL
    if (url.includes('json')) {
        return {
            ok: true,
            json: async () => ({ weather: 'sunny', temperature: 25 }),
            text: async () => JSON.stringify({ weather: 'sunny', temperature: 25 })
        };
    } else if (url.includes('text')) {
        return {
            ok: true,
            text: async () => 'Hello World!'
        };
    } else if (url.includes('error')) {
        return {
            ok: false,
            status: 404,
            statusText: 'Not Found'
        };
    }
    
    return {
        ok: true,
        text: async () => 'Default response'
    };
};

// Load the Alpine Fetch code
require('../alpine-fetch.js');

// Run tests
const runner = new TestRunner();

// Test basic fetch functionality
runner.test('Basic fetch returns text', async () => {
    const result = await $fetch('https://example.com/text');
    runner.assertEqual(result, 'Hello World!', 'Basic fetch should return text');
});

// Test JSON fetch functionality
runner.test('JSON fetch returns specific property', async () => {
    const result = await $fetchjson('https://example.com/json', 'weather');
    runner.assertEqual(result, 'sunny', 'JSON fetch should return specific property');
});

// Test error handling
runner.test('Error handling for failed requests', async () => {
    const result = await $fetch('https://example.com/error');
    runner.assertEqual(result, '', 'Failed requests should return empty string');
});

// Test method parameter
runner.test('HTTP method parameter works', async () => {
    const result = await $fetch('https://example.com/text', 'POST');
    runner.assertEqual(result, 'Hello World!', 'POST method should work');
});

// Test headers parameter
runner.test('Custom headers are supported', async () => {
    const result = await $fetch('https://example.com/text', 'GET', { 'Authorization': 'Bearer token' });
    runner.assertEqual(result, 'Hello World!', 'Custom headers should be supported');
});

// Test body parameter
runner.test('Request body is supported', async () => {
    const result = await $fetch('https://example.com/text', 'POST', {}, { name: 'test' });
    runner.assertEqual(result, 'Hello World!', 'Request body should be supported');
});

// Test URL validation
runner.test('Invalid URL handling', async () => {
    const result = await $fetch(null);
    runner.assertEqual(result, '', 'Invalid URL should return empty string');
});

// Test JSON error handling
runner.test('JSON fetch error handling', async () => {
    const result = await $fetchjson('https://example.com/error', 'weather');
    runner.assertEqual(result, null, 'JSON fetch errors should return null');
});

// Run all tests
runner.run();