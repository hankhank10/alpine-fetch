# Alpine Fetch

![GitHub file size in bytes](https://img.shields.io/github/size/hankhank10/alpine-fetch/alpine-fetch.js)
![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Straightforward interactive HTTP requests from within your [Alpine.JS](https://alpinejs.dev/) markup.

[View the live demo here](https://hankhank10.github.io/alpine-fetch/) | [Advanced Examples](./examples/advanced-examples.html)

## What does this do?

Alpine.JS is a rugged, minimal tool for composing behavior directly in your markup. It can be used, even by those with little experience in Javascript, to add interactivity to web pages.

Alpine Fetch is a magic helper for Alpine.JS which makes it easy to do HTTP requests within markup.

### Native Alpine approach to HTTP requests

One area where Alpine does require you to go outside markup is when making HTTP requests to dynamically populate parts of the page.

Someone looking to make a call on an API endpoint, might need to do something like the following:

````html
<div x-data="{
        result: null,
        async retrieveData() { 
            this.result = await (await fetch('/endpoint')).text(); 
        }
     }" 
     x-init="retrieveData()"
>
     <span x-text="result"></span>
</div>
````

... which is quite verbose, and involves promises which are not straightforward for beginners.

### Alpine Fetch

Alpine Fetch adds magic functions to abstract a lot of this away and makes it much more straightforward to populate your page via HTTP requests. The above example using Alpine Fetch would be:

````html
<div x-data>
    <span x-text="await $fetch('/endpoint)"></span>
</div>
````

Alpine Fetch can fetch simple text from the server using the `$fetch` method or it can fetch and parse JSON using the `$fetchjson` method.

It supports all HTTP methods such as `GET` and `POST` and `PUT`.

It has no dependencies other than Alpine.

## Installation
Include the following `<script>` tag in the `<head>` of your document, **before** Alpine:

```html
<script defer src="https://cdn.jsdelivr.net/gh/hankhank10/alpine-fetch@main/alpine-fetch.js"></script>
```

## Usage

At its most basic `$fetch` accepts a URL and returns the contents of that URL.

Unlike the generic Javascript `fetch` method which requires dealing with promises, this simply waits for the response to be received and then returns it.

`$fetch` should be preceded by `await` to ensure that this happens.

### String to x-text

The most basic example is to fetch a string from the server and populate it in your markup via the `x-text` method of alpine.

```html
<div x-data>
    <span x-text="await $fetch('https://expensive-crow-sarong.cyclic.cloud/hello_world')"></span>
</div>
```

### HTML to x-html

The `$fetch` helper can be used anywhere, so if you don't want to render it as text you can pass it to the `x-html` method of Alpine - or to a class, or any other part of the markup. It behaves like any other variable.

```html
<div x-data>
    <span x-html="await $fetch('https://expensive-crow-sarong.cyclic.cloud/hello_world_html')"></span>
</div>
```

### Retrieving once, using multiple times

You might want to use the same data in multiple places in your markup. In that case, it would make sense to just fetch it once and use it multiple times. You can do this by retrieving it into the `x-data` tag like any other variable.

```html
<div x-data="{ hello_world: await $fetch('https://expensive-crow-sarong.cyclic.cloud/hello_world' }">
    <span x-text="hello_world"></span>
    <span x-text="hello_world"></span>
</div>
```

### Retrieving JSON

`$fetch` retrieves data which it expects to be text, but you can also use `$fetchjson` to retrieve data which is JSON and then render the relevant part of that into your page.

```html
<div x-data>
    <span x-text="await $fetchjson('https://expensive-crow-sarong.cyclic.cloud/some_json', jsonItem='weather')"></span>
</div>
```

### Specifying a method

`$fetch` and `$fetchjson` assume that you want to use a `GET` method but you can specify that you want to send another.

````html
<span x-text="await $fetch('/post_url', method='POST')"></span>
<span x-text="await $fetch('/delete_url', method='DELETE')"></span>
````

### Custom headers and request body

You can pass custom headers and request body for more complex API interactions:

````html
<!-- With custom headers -->
<span x-text="await $fetch('/api/protected', 'GET', { 'Authorization': 'Bearer token' })"></span>

<!-- POST request with JSON body -->
<span x-text="await $fetch('/api/users', 'POST', {}, { name: 'John', email: 'john@example.com' })"></span>

<!-- JSON fetch with headers and body -->
<span x-text="await $fetchjson('/api/data', 'result', 'POST', { 'Content-Type': 'application/json' }, { id: 1 })"></span>
````

### Error handling

Alpine Fetch includes built-in error handling. Failed requests will return empty strings for text requests and `null` for JSON requests:

````html
<div x-data="{ data: null, error: null }">
    <button @click="
        try {
            data = await $fetchjson('/api/data', 'result');
        } catch (e) {
            error = e.message;
        }
    ">Load Data</button>
    <div x-text="data"></div>
    <div x-show="error" x-text="error" style="color: red;"></div>
</div>
````

### Responding to actions

If you specify a DOM element or a variable to be equal to `$fetch` or `$fetchjson` then the methods will automatically fetch on init.

However you can also customise when they do the fetch however you like. In the below example, it will fetch only when the user clicks the button.

````html
<div x-data="{ weather: 'uncertain at this stage' }">

    The weather is <span x-text="weather"></span>
    
    <button
            x-on:click="weather = await $fetchjson('https://expensive-crow-sarong.cyclic.cloud/some_json', jsonItem='weather')"
    >Click me to change the weather</button>

</div>
````

### Examples

You can view all of these examples in the `docs/index.html` file in this repo, or view a live hosted demo [here](https://hankhank10.github.io/alpine-fetch/examples/examples.html).

For advanced examples including headers, request bodies, and error handling, check out the [Advanced Examples](./examples/advanced-examples.html) page.

## Development

### Running tests

```bash
node tests/alpine-fetch.test.js
```

### Code quality

```bash
npm run lint    # Check code quality
npm run format  # Format code
```

## Changelog

### v2.0.0
- ✨ Added support for custom headers
- ✨ Added support for request bodies
- ✨ Improved error handling
- ✨ Added comprehensive JSDoc documentation
- ✨ Added test suite
- ✨ Added ESLint and Prettier configuration
- ✨ Added package.json for better project management
- 🐛 Fixed various edge cases and improved reliability

## Contributing

I very much welcome comments, suggestions and contributions.

If you notice issues please open an issue on Github.

If you have improvements or suggestions please submit a pull request.