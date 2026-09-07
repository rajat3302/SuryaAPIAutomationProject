const axios = require('axios');

const BASE_URL = 'https://api.surya.com';
const OLD_API_KEY = "447574CABE324ECC9A932DD4A85A6962";
const NEW_API_KEY = "kYxoW6fo_XOcrPFZe8Q1EeTk-Da6k9HT1D6pfjDHpXI";

test('Sequential Test with POST Response Comparison (Ignoring LoginDate)', async () => {
    
    const customerNumber = "12-SURYA";
    const getEndpointPath = '/test/ETL/api/Dynamics/GetCustomersLive';
    const queryParam = { customerNumber: customerNumber };

    let oldPostData = null;
    let newPostData = null;

    // ==========================================
    // STEP 1: OLD API FLOW (Post -> Get)
    // ==========================================
    console.log("--- Starting Old API Flow ---");
    
    const oldPayload = {
        "AccountNumber": customerNumber,
        "EmailAddress": "rajat.shrotriya@innoage.in",
        "LoginDate": "2026-08-22T07:20:01.524Z",
        "Updated": true
    };

    console.log("=== OLD API REQUEST PAYLOAD ===", JSON.stringify(oldPayload, null, 2));

    try {
        const oldPostRes = await axios.post(`${BASE_URL}/test/ETL/api/Dynamics/UpdateCustomerLastLogin`, oldPayload, {
            headers: { 'apiKey': OLD_API_KEY, 'Content-Type': 'application/json' }
        });
        oldPostData = oldPostRes.data;
        console.log("=== OLD API POST RESPONSE ===", JSON.stringify(oldPostData, null, 2));
    } catch (error) {
        console.log("=== OLD API POST ERROR ===", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }

    // Old API Get Request
    const oldGetResponse = await axios.get(`${BASE_URL}${getEndpointPath}`, {
        params: queryParam,
        headers: { 'apiKey': OLD_API_KEY, 'Content-Type': 'application/json' }
    });
    
    const oldLoginVal = oldGetResponse.data.value[0].SCILastLogin;
    console.log(`Old API SCILastLogin Result: ${oldLoginVal}`);


    // ==========================================
    // STEP 2: NEW API FLOW (Post -> Get)
    // ==========================================
    console.log("--- Starting New API Flow ---");

    const newPayload = {
        "AccountNumber": customerNumber,
        "EmailAddress": "rajat.shrotriya@innoage.in",
        "LoginDate": "2026-08-21T07:20:01.524Z",
        "Updated": true
    };

    console.log("=== NEW API REQUEST PAYLOAD ===", JSON.stringify(newPayload, null, 2));
    
    try {
        const newPostRes = await axios.post(`${BASE_URL}/v1/test/ETL/api/Dynamics/UpdateCustomerLastLogin`, newPayload, {
            headers: { 'x-api-key': NEW_API_KEY, 'Content-Type': 'application/json' }
        });
        newPostData = newPostRes.data;
        console.log("=== NEW API POST RESPONSE ===", JSON.stringify(newPostData, null, 2));
    } catch (error) {
        console.log("=== NEW API POST ERROR ===", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }

    // New API Get Request
    const newGetResponse = await axios.get(`${BASE_URL}/v1${getEndpointPath}`, {
        params: queryParam,
        headers: { 'x-api-key': NEW_API_KEY, 'Content-Type': 'application/json' }
    });

    const newLoginVal = newGetResponse.data.value[0].SCILastLogin;
    console.log(`New API SCILastLogin Result: ${newLoginVal}`);

    // ==========================================
    // ASSERTIONS & COMPARISON (Ignoring LoginDate)
    // ==========================================
    expect(oldLoginVal).toBeDefined();
    expect(newLoginVal).toBeDefined();

    if (oldPostData && newPostData) {
        // Copy banakar LoginDate ko delete kar rahe hain taaki original object kharab na ho
        const oldCleaned = { ...oldPostData };
        const newCleaned = { ...newPostData };

        delete oldCleaned.LoginDate;
        delete newCleaned.LoginDate;

        console.log("--- Comparing POST Responses (ignoring LoginDate) ---");
        expect(newCleaned).toEqual(oldCleaned);
        console.log("✅ POST Responses matched successfully (ignoring LoginDate)!");
    }

}, 60000);