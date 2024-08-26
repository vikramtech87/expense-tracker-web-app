import { EmailVerificationError, LoginError, LoginErrorCode, OobErrorCode, PasswordResetError, SignUpError, type SignUpErrorCode } from "@/lib/errors/auth-error";
import { promiseToResult, Result } from "@/lib/types/result";
import { applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import { auth } from "./client";
import { FirebaseError } from "firebase/app";

export const signUpWithEmailPassword = async (email: string, password: string): Promise<Result<UserCredential, SignUpError>> => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return {
      ok: true,
      value: user
    }
  } catch (err) {
    let errorCode: SignUpErrorCode = "unknown";

    if (err instanceof FirebaseError) {
      if (err.code === "auth/email-already-in-use") {
        errorCode = "auth/email-exists";
      } else {
        errorCode = "auth/unknown";
        console.error(`Unknown firebase signup error: ${err.code}`);
      }
    } else {
      console.error(`Unknown signup error: ${err}`);
    }

    return {
      ok: false,
      error: new SignUpError(errorCode)
    };
  }
}

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<Result<UserCredential, LoginError>> => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return {
      ok: true,
      value: user
    }
  } catch (err) {
    let errorCode: LoginErrorCode = "unknown";

    if (err instanceof FirebaseError) {
      const invalidCredentialsErrorCodes = [
        "auth/invalid-credential",
        "auth/user-not-found",
        "auth/wrong-password",
      ];

      if (invalidCredentialsErrorCodes.includes(err.code)) {
        errorCode = "auth/invalid-credential";
      } else {
        errorCode = "auth/unknown";
        console.error(`Unknown firebase login error: ${err.code}`);
      }

    } else {
      console.error(`Unknown login error: ${err}`);
    }

    return {
      ok: false,
      error: new LoginError(errorCode)
    };
  }
}

export const logout = async (): Promise<Result<void, unknown>> => promiseToResult(signOut(auth), (err) => err);

const errorToOobErrorCode = (err: unknown): OobErrorCode => {
  if (err instanceof FirebaseError) {
    const invalidOobErrorCodes = [
      "auth/expired-action-code",
      "auth/invalid-action-code",
      "auth/user-disabled",
      "auth/user-not-found",
    ];

    if (invalidOobErrorCodes.includes(err.code)) {
      return "auth/invalid-code";
    }

    console.error(`Unknown firebase oob code error: ${err.code}`);
    return "auth/unknown";
  }

  console.error(`Unknown oob code error: ${err}`);
  return "unknown";
};

export const verifyEmail = async (oobCode: string): Promise<Result<void, EmailVerificationError>> => {
  try {
    await applyActionCode(auth, oobCode);
    return {
      ok: true,
      value: undefined
    };
  } catch (err) {
    return {
      ok: false,
      error: new EmailVerificationError(errorToOobErrorCode(err)),
    }
  }
};

export const performPasswordReset = async (oobCode: string, newPassword: string): Promise<Result<void, PasswordResetError>> => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return {
      ok: true,
      value: undefined,
    }
  } catch (err) {
    return {
      ok: false,
      error: new PasswordResetError(errorToOobErrorCode(err))
    }
  }
};