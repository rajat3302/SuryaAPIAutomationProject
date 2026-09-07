console.log("Hello, world!");

// Const ka use (jo change nahi hoga)
const appName = "Surya Api automation";
console.log("App Name:", appName);

// Let ka use (jiski value change ho sakti hai)
let testCounter= 1;
console.log("Initial Test Count:", testCounter);

// Value change kar rhe hai
testCounter=2;
console.log("Updated Test Count:", testCounter);


function addNumbers(num1, num2){
    let sum= num1+ num2;
    return sum;
}
    // Function ko call kar rahe hain aur values pass kar rahe hain
    let result1 = addNumbers(10,20);
    console.log("Addition result1:", result1);

    let result2= addNumbers(50,50);
    console.log("Addition Result 2:", result2);


    const customer =["12-SURYA","00-109DESN","99-TEST"]

    // Array ki pehli value access karna (Index 0 se shuru hota hai)
    console.log("Fisrt Customer", customer[0]);

    // Array me nayi value add karna (.push method se)
    customer.push("16-WALTER");
    console.log("Upadted cutomers list", customer);


    // Ek customer ka object
    const customerDetails={
        customenumber :"12-SURYA",
        Customerphone  :"7878987868",
        CustomerStatus : "Active",
        customeremail :  "rshrotriya3@gmail.com"
    };

    // Object ki values ko access karna
    console.log("Customer number", customerDetails.customenumber);
    console.log("Customer Status", customerDetails.customeremail);

    const ProductIDs=["SKU001","SKU002","SKU003"];

    ProductIDs.push("SKU004");
    console.log("Updated Products ID'S:", ProductIDs);

    // 1. Array of Objects banaya (Jisme multiple test cases hain)
const apiTestCases = [
    { testName: "GetCustomerTest", expectedStatus: 200 },
    { testName: "GetAddressTest", expectedStatus: 200 },
    { testName: "DeleteCustomerTest", expectedStatus: 500 }
];

// 2. Ek function banaya jo array ko input lega aur print karega
function runTestSummary(testsArray) {
    console.log("=== API TEST CASES SUMMARY ===");
    
    // .forEach loop ka use karke har ek object par ja rahe hain
    testsArray.forEach((testCase) => {
        console.log(`Test: ${testCase.testName} | Expected Status: ${testCase.expectedStatus}`);
    });
}

// 3. Function ko call kar diya aur apna array pass kar diya
runTestSummary(apiTestCases);


const  marks =[45, 83, 33, 90, 60 ,25]
const  passedStudents = marks.filter((Score) => {
    return Score >= 40;
});

console.log("Original Marks:", marks);
console.log("Passed students marks", passedStudents);