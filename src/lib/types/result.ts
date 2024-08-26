export type Result<T, E> = {
  ok: true,
  value: T,
} | {
  ok: false,
  error: E
};

export const promiseToResult = async <T, E>(promise: Promise<T>, parseError: (error: unknown) => E): Promise<Result<T, E>> => {
  try {
    const value = await promise;
    return {
      ok: true,
      value
    }
  } catch (error) {
    const parsedError = parseError(error);
    return {
      ok: false,
      error: parsedError
    }
  }
}