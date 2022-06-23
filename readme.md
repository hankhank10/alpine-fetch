# Alpine Fetch

Straightforward interactive HTTP requests from within HTTP requests to be executed within [Alpine.JS](https://alpinejs.dev/) markup.

## What does this do?

### Native Alpine

Alpine.JS is a rugged, minimal tool for composing behavior directly in your markup. It can be used, even by those with little experience in Javascript, to add interactivity to web pages.

One area where it does not excel, imho, is the ability to easily make HTTP requests from within your markup. Someone looking to make a call on an API endpoint, might need to do something like the following:

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

Alpine Fetch abstracts a lot of this away and makes it much more straightforward to populate your page via HTTP requests. The above example using Alpine Fetch would be:

````html
<div x-data>
    <span x-text="await $fetch('/endpoint)"></span>
</div>
````

Alpine Fetch can pull simple text from the server using the `$fetch` method or it can pull and parse JSON using the `$fetchjson` method.

It supports all HTTP methods such as `GET` and `POST` and `PUT`.

It has no dependencies other than Alpine.

## Installation
Include the following `<script>` tag in the `<head>` of your document, **before** Alpine:

```html
<script defer src="[to come]"></script>
```

## Usage

At its most basic `$fetch` accepts a URL and returns the contents of that URL.

Unlike the generic Javascript `fetch` method which requires dealing with promises, this simply waits for the response to be received and then returns it.

`$fetch` should be preceded by `await` to ensure that this happens.

### String to x-text

The most basic example is to pull a string from the server and populate it in your markup via the `x-text` method of alpine.

```html
<div x-data>
    <span x-text="await $fetch('https://weathermockapi.herokuapp.com/hello_world')"></span>
</div>
```

### HTML to x-html

The `$fetch` helper can be used anywhere, so if you don't want to render it as text you can pass it to the `x-html` method of Alpine - or to a class, or any other part of the markup. It behaves like any other variable.

```html
<div x-data>
    <span x-html="await $fetch('https://weathermockapi.herokuapp.com/hello_world_html')"></span>
</div>
```

### Retrieving once, using multiple times

You might want to use the same data in multiple places in your markup. In that case, it would make sense to just fetch it once and use it multiple times. You can do this by retrieving it into the `x-data` tag like any other variable.

```html
<div x-data="{ hello_world: await $fetch('https://weathermockapi.herokuapp.com/hello_world' }">
    <span x-text="hello_world"></span>
    <span x-text="hello_world"></span>
</div>
```

### Retrieving JSON

`$fetch` retrieves data which it expects to be text, but you can also use `$fetchjson` to retrieve data which is JSON and then render the relevant part of that into your page.

```html
<div x-data>
    <span x-text="await $fetchjson('https://weathermockapi.herokuapp.com/some_json', jsonItem='city_name')"></span>
</div>
```

### Specifying a method

`$fetch` and `$fetchjson` assume that you want to use a `GET` method but you can specify that you want to send another.

````html
<span x-text="await $fetch('/post_url', method='POST')"></span>
<span x-text="await $fetch('/delete_url', method='DELETE')"></span>
````