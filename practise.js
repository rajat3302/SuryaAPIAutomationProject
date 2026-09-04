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

