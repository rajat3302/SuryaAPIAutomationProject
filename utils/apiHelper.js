const axios = require('axios');

const BASE_URL = "https://api.surya.com";
const OLD_API_KEY = "447574CABE324ECC9A932DD4A85A6962";
const NEW_API_KEY = "kYxoW6fo_XOcrPFZe8Q1EeTk-Da6k9HT1D6pfjDHpXI";

async function compareEndpoints(method, oldPath, newPath, dataOrParams = {}, expectedOldStatus = 200) {
    const isGet = method.toLowerCase() === 'get';
    
    // Yahan request data print karne ke liye add kar diya hai
    console.log("=== REQUEST PAYLOAD / PARAMS ===", JSON.stringify(dataOrParams, null, 2));

    let oldResponseStatus;
    let oldData = null;

    // 1. Old API Request
    try {
        const oldConfig = {
            method: method,
            url: `${BASE_URL}${oldPath}`,
            headers: { 'apiKey': OLD_API_KEY, 'Content-Type': 'application/json' },
            [isGet ? 'params' : 'data']: dataOrParams
        };
        const oldResponse = await axios(oldConfig);
        oldResponseStatus = oldResponse.status;
        oldData = oldResponse.data; // <--- Old API ka data capture kiya
    } catch (error) {
        oldResponseStatus = error.response ? error.response.status : 500;
        oldData = error.response ? error.response.data : error.message;
        console.log("=== OLD API ERROR RESPONSE ===", JSON.stringify(oldData, null, 2));
    }

    // 2. New API Request
    const newConfig = {
        method: method,
        url: `${BASE_URL}${newPath}`,
        headers: { 'x-api-key': NEW_API_KEY, 'Content-Type': 'application/json' },
        [isGet ? 'params' : 'data']: dataOrParams
    };
    const newResponse = await axios(newConfig);
    const newResponseStatus = newResponse.status;
    const newData = newResponse.data; // <--- New API ka data capture kiya
    console.log("=== NEW API RESPONSE ===", JSON.stringify(newData, null, 2));
    
    // Validations (Status Codes)
    expect(newResponseStatus).toBe(200);
    expect(oldResponseStatus).toBe(expectedOldStatus);

    // Agar old API successful thi (200), tabhi data print aur compare hoga
    if (expectedOldStatus === 200) {
        if (oldData && typeof oldData === 'object' && newData && typeof newData === 'object') {
            delete oldData.From;
            delete newData.From;
        }

        // --- TERMINAL ME DEKHNE KE LIYE CONSOLE.LOG ---
        console.log("==================== OLD API DATA ====================");
        console.log(JSON.stringify(oldData, null, 2));
        
        console.log("==================== NEW API DATA ====================");
        console.log(JSON.stringify(newData, null, 2));
        console.log("======================================================");

        // --- FINAL DATA COMPARISON ---
        expect(newData).toEqual(oldData);
    }
}

module.exports = { compareEndpoints };