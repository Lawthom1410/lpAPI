const request = require('request-promise-native');
const fs = require('fs');
const {constants} = fs.existsSync('./constants.js') ? require('./constants') : {constants: {accountId: null, oauth: null}};
require('dotenv').config();

async function lpAPI(method, uriPath, body, domainServiceName, accountId, oauth, headers){
    // if no accountId or oauth specified, look in constants.js, then look in .env
    try{
        accountId = accountId ? accountId : constants.accountId ? constants.accountId : process.env.accountId;
        oauth = oauth ? oauth : constants.oauth ? constants.oauth : oauth2(process.env.appKey, process.env.secret, process.env.accessToken, process.env.accessTokenSecret);
    } catch{
        throw new Error('Missing accountId or oauth arguments.')
    }
    // if no headers specified, set default
    headers = headers ? headers : {
        'Content-type': 'application/json'
    }

    // if domainServiceName is specified, domain API is used to get domain - uriPath should be everything after domain e.g. uriPath = `/api/account/${accountId}/configuration/le-users/skills`
    // if domainServiceName is not specified, uriPath should be full url including domain e.g. uriPath = `https://z2.acr.liveperson.net/api/account/${accountId}/configuration/le-users/skills`
    let uri = domainServiceName ? `https://${await getDomain(accountId, domainServiceName)}` : '';
    uri += uriPath;

    const apiRequest = {
        method: method,
        uri: uri,
        oauth: oauth,
        headers: headers,
        body: body
    }

    try{
        const response = await request(apiRequest);
        return JSON.parse(response);
    } catch(error){
        console.log(error);
    }
}

async function getDomain(accountId, domainServiceName){
    const domainApiUrl = `http://api.liveperson.net/api/account/${accountId}/service/${domainServiceName}/baseURI.json?version=1.0`;
    const domainRequest = {
        method: 'GET',
        uri: domainApiUrl
    };
    try {
        let domainResponse = await request(domainRequest);
        return JSON.parse(domainResponse).baseURI;
    } catch(error) {
        console.log(`Error: ${error}`);
    }
}

function oauth2(appKey, secret, accessToken, accessTokenSecret){
    return {
        "consumer_key": appKey,
        "consumer_secret": secret,
        "token": accessToken,
        "token_secret": accessTokenSecret
    }
}

module.exports = {
    lpAPI
}