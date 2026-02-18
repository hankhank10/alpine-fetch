
// Alpine listeners
document.addEventListener('alpine:init', () => {

    Alpine.magic('fetchjson', () => {
        return (url, jsonItem = null, method = "GET") => {
            return xfetch(url, jsonItem, method);
        }
    })

    Alpine.magic('fetch', () => {
        return (url, method = "GET") => {
            return xfetch(url, null, method);
        }
    })

})

// Actual fetch function
async function xfetch(url, jsonItem = null, method = 'GET') {

    if (jsonItem == null) {

        return fetch(url, {method: method})
            .then((response) => response.text())
            .catch((error) => {
              console.log(error)
            });

    } else {

        return fetch(url, {method: method})
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson[jsonItem]
            })
            .catch((error) => {
              console.log(error)
            });

    }
}
