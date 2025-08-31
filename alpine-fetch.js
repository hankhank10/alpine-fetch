

// Alpine listeners
document.addEventListener('alpine:init', async () => {

    Alpine.magic('fetchjson', () => {
        return async (
            url,
            jsonItem = null,
            method = "GET"
        ) => {
            let response = await xfetch(url = url, jsonItem = jsonItem, method = method)
            return await response;
        }
    })

    Alpine.magic('fetch', () => {
        return async (
            url,
            method = "GET"
        ) => {
            let response = await xfetch(url = url, jsonItem = null, method = method)
            return await response;
        }
    })

})

// Actual fetch function
async function xfetch(url, jsonItem = null, method = 'GET') {

    if (jsonItem == null) {

        return fetch(url, {method: method})
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then((responseText) => {
                return responseText
            })
            .catch((error) => {
              console.error('Fetch error:', error);
              throw error;
            });

    } else {

        return fetch(url, {method: method})
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((responseJson) => {
                if (jsonItem && !(jsonItem in responseJson)) {
                    throw new Error(`JSON property '${jsonItem}' not found in response`);
                }
                return responseJson[jsonItem]
            })
            .catch((error) => {
              console.error('Fetch error:', error);
              throw error;
            });

    }
}

