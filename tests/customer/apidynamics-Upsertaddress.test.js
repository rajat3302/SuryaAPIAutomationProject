const { compareEndpoints } = require('../../utils/apiHelper');

test('UpsertAddress API Old vs New Comparison', async () => {
    const requestBody = {
        "customerKey": "12-SURYA",
        "addressKey": "string",
        "name": "string",
        "firstName": "string",
        "lastName": "string",
        "type": 1,
        "street1": "string",
        "street2": "string",
        "street3": "string",
        "city": "string",
        "state": "AL",
        "zipCode": "string",
        "country": "USA",
        "phone": "string",
        "email": "string",
        "residentialOrBusiness": 0,
        "dockDoorRequired": 0,
        "response": "string"
    };

    await compareEndpoints(
        'post',
        '/test/ETL/api/Dynamics/UpsertAddress',
        '/v1/test/ETL/api/Dynamics/UpsertAddress',
        requestBody,
        500 // <--- Yahan 500 pass kar diya kyunki old API ka 500 error expected hai
    );
}, 40000);