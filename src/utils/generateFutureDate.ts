export const generateFutureDate = (timeGap: number): Date => {
  const now = new Date();
  return new Date(now.getTime() + timeGap);
};
