// Function to convert MongoDB ObjectId into a 6-digit number
export function convertObjectIdToSixDigits(objectId) {
    // Convert ObjectId to an integer by treating it as a hexadecimal string
    const objectIdNumber = parseInt(objectId.slice(-6), 16);

    // Use modulo to ensure it's a 6-digit number
    const sixDigitNumber = objectIdNumber % 1000000;

    // Pad the result to make sure it always has 6 digits
    return String(sixDigitNumber).padStart(6, '0');
}
