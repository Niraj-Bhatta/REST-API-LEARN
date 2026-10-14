
const validateEmail = (email) => {
  const result = email.match(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  );

  return result !== null;
};

module.exports = validateEmail;
