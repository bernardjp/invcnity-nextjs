function validateEmail(email: string): boolean {
  const EMAIL_REGEX = /^[\w\-\.]{3,64}@([\w-]+\.)+[\w-]{2,}$/gm;

  if (email.length > 254) return false;

  return EMAIL_REGEX.test(email);
}

function validatePassword(password: string): boolean {
  const PASSWORD_REGEX =
    /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)[A-Za-z0-9]{8,32}$/gm;

  return PASSWORD_REGEX.test(password);
}

function validatePasswordConfirmation(
  password: string,
  confirmPassword: string
): boolean {
  return password === confirmPassword;
}

export function validateSignUpForm(
  email: string,
  password: string,
  confirmPassword: string
): boolean {
  const isEmailValidated = validateEmail(email);
  const isPasswordValidated = validatePassword(password);
  const isPasswordConfirmed = validatePasswordConfirmation(
    password,
    confirmPassword
  );

  return isEmailValidated && isPasswordValidated && isPasswordConfirmed;
}
