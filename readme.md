# LivePerson APIs Function

An extensible function that returns the JSON response of most LivePerson API calls with one line of code.

Can be used in conjunction with constants.js or .env file to further simplify calls.

## Simple Request

let response = lpAPI(method, url, [body]);

e.g response = lpAPI('GET', 'https://z2.acr.liveperson.net/api/account/${accountId}/configuration/le-users/skills');

This type of request requires just the API's method and URL (and an optional body argument). This can only be used when the accountId and oauth arguments have been stored in a constants.js or .env file as outlined below.

### constants.js

If using a constants.js file, accountId and oauth should be stored as below.

```javascript
const constants = {
    accountId: 12345678,
    oauth: {
        "consumer_key": '123abc456def',
        "consumer_secret": 'abc123',
        "token": '123abc456def',
        "token_secret": 'abc123'
    }
}

module.exports = {constants};
```

### .env

If using a .env file, accountId and oauth parameters should be stored as below.

```bash
accountId = 12345678
appKey = 123abc456def
secret = abc123
accessToken = 123abc456def
accessTokenSecret = abc123
```

## Option to Use Service Name

let response = lpAPI(method, urlPath, [body], serviceName);

e.g response = lpAPI('GET', '/api/account/${accountId}/configuration/le-users/skills', null, 'accountConfigReadOnly');

This type of request allows the user to use the API domain's service name and url path instead of the full api url (including domain). 

This automates the use of LivePerson's Domain API to retrieve the required domain.

## Full Request

let response = lpAPI(method, urlPath, [body], serviceName, accountId, oauth, headers);

This type of request allows full customization of account IDs, oauth arguments, and headers per each request. 

Account IDs and oauth arguments specified here will take priority over ones stored in constants.js or .env files.