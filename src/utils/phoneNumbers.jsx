function normalizePhoneNumber(phoneNumber) {
  // Remove all non-numeric characters
  let numericOnly = phoneNumber.replace(/\D/g, '');

  if (numericOnly.startsWith('1')) {
    numericOnly = numericOnly.substring(1);

    if (numericOnly.length !== 10) {
      return 'Invalid phone number';
    }
  }

  const formattedNumber = `+1-${numericOnly.substring(0, 3)}-${numericOnly.substring(3, 6)}-${numericOnly.substring(6)}`;

  return formattedNumber;
}

export default normalizePhoneNumber;