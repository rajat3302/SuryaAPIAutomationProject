const { compareEndpoints } = require('../../utils/apiHelper');

// Yahan aap jitne marzi utne valid ya invalid customer numbers daal sakte hain
const testScenarios = [
    { customerNumber: "12-SURYA" },
    { customerNumber: "00-109DESN" }
];

testScenarios.forEach(({ customerNumber }) => {
    test(`Compare GetAddressLive API for Customer: ${customerNumber}`, async () => {
        await compareEndpoints(
            'get',
            '/test/ETL/api/Dynamics/GetAddressesLive',
            '/v1/test/ETL/api/Dynamics/GetAddressesLive',
            { customerNumber: customerNumber } // Yeh query parameter ban kar jayega
        );
    }, 10000); // timeout maximum
});