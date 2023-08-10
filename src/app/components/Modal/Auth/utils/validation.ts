export type AuthValidation = {
  errorMessage: string;
  isValidated: boolean;
};

export type SignUpValidation = {
  username: AuthValidation;
  email: AuthValidation;
  password: AuthValidation;
  confirmPassword: AuthValidation;
  isValidated: boolean;
};

export type LoginValidation = {
  email: AuthValidation;
  password: AuthValidation;
  isValidated: boolean;
};

function validateUsername(username: string): AuthValidation {
  const USERNAME_REGEX = /^[a-zA-Z0-9_\.]{6,18}$/gm;
  const isValidated = USERNAME_REGEX.test(username);

  if (username.trim().length === 0) {
    return {
      errorMessage: 'Username is required.',
      isValidated: false,
    };
  }

  return {
    errorMessage: isValidated
      ? ''
      : 'The username must range between 6 and 18 characters long. Only alphanumerical, underscores [_] and dots [.] are allowed',
    isValidated: isValidated,
  };
}

export function validateEmail(email: string): AuthValidation {
  const EMAIL_REGEX = /^[\w\-\.]{3,64}@([\w-]+\.)+[\w-]{2,}$/gm;
  const isValidated = EMAIL_REGEX.test(email);

  if (email.trim().length === 0) {
    return {
      errorMessage: 'Email is required.',
      isValidated: false,
    };
  }

  if (email.length > 254) {
    return {
      errorMessage: 'Max length is 254 characters.',
      isValidated: false,
    };
  }

  return {
    errorMessage: isValidated ? '' : 'Invalid email format.',
    isValidated,
  };
}

function validatePassword(password: string): AuthValidation {
  const PASSWORD_REGEX =
    /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)[A-Za-z0-9]{8,32}$/gm;
  const isValidated = PASSWORD_REGEX.test(password);

  if (password.trim().length === 0) {
    return {
      errorMessage: 'Password is required.',
      isValidated: false,
    };
  }

  return {
    errorMessage: isValidated
      ? ''
      : 'The password must be at least 8 characters long and contain an uppercase character, a lowercase character, and a number.',
    isValidated,
  };
}

function validatePasswordConfirmation(
  password: string,
  confirmPassword: string
): AuthValidation {
  const isValidated = password === confirmPassword;

  return {
    errorMessage: isValidated ? '' : 'Passwords do not match.',
    isValidated,
  };
}

export function validateSignUpForm(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): SignUpValidation {
  const usernameValidation = validateUsername(username);
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const confirmationValidation = validatePasswordConfirmation(
    password,
    confirmPassword
  );
  const isValidated =
    usernameValidation.isValidated &&
    emailValidation.isValidated &&
    passwordValidation.isValidated &&
    confirmationValidation.isValidated;

  return {
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmationValidation,
    isValidated,
  };
}

export function validateLoginForm(
  email: string,
  password: string
): LoginValidation {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const isValidated =
    emailValidation.isValidated && passwordValidation.isValidated;

  return {
    email: emailValidation,
    password: passwordValidation,
    isValidated,
  };
}