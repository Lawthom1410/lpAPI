const {lpAPI} = require('./lpAPI');
const {constants} = require('./constants');

async function main() {
    let allUsers = await lpAPI('GET', `/api/account/${constants.accountId}/configuration/le-users/users`, null , `accountConfigReadOnly`);
    console.log(allUsers);
}

main()