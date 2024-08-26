export type SignUpErrorCode = "auth/email-exists" | "auth/unknown" | "unknown";

export type LoginErrorCode = "auth/invalid-credential" | "auth/unknown" | "unknown";

export type OobErrorCode = "auth/invalid-code" | "auth/unknown" | "unknown";

export class AuthError extends Error { }

export class SignUpError extends AuthError {
  code: SignUpErrorCode

  constructor(code: SignUpErrorCode) {
    super(code);
    this.code = code;
  }
}

export class LoginError extends AuthError {
  code: LoginErrorCode

  constructor(code: LoginErrorCode) {
    super(code);
    this.code = code;
  }
}

export class OobError extends AuthError {
  code: OobErrorCode

  constructor(code: OobErrorCode) {
    super(code);
    this.code = code;
  }
}

export class EmailVerificationError extends OobError { }

export class PasswordResetError extends OobError { }