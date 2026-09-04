const { compareEndpoints } = require('../../../utils/apiHelper');

test('Compare GetCustomers API Old vs New', async () => {
    await compareEndpoints(
        'get', 
        '/test/ETL/api/Dynamics/GetCustomers', 
        '/v1/test/ETL/api/Dynamics/GetCustomers', 
        { customerNumber: '12-SURYA' }
    );
}, 40000); // 40 seconds timeout