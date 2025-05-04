export const getErrorMessage = (error: unknown): string | null => {
  return error instanceof Error ? error.message : null;
};
