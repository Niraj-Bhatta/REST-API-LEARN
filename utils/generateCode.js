const crypto = require("crypto");

const generateCode = (codeLength = 6) => {
  try {
    // Validate code length
    if (!Number.isInteger(codeLength) || codeLength !== 6) {
      throw new Error("Verification code length must be exactly 6 digits.");
    }

    // Generate a secure random integer between 0 and 999999
    const randomNumber = crypto.randomInt(0, 1000000);

    // Convert to string and ensure exactly 6 digits
    const verificationCode = randomNumber
      .toString()
      .padStart(6, "0");

    return verificationCode;
  } catch (error) {
    // Log the error for debugging
    console.error("Error generating verification code:", error.message);

    // Forward the error to the caller
    throw new Error("Failed to generate verification code.");
  }
};

module.exports = generateCode;
