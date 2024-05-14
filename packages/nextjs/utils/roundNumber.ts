export const roundNumber = (num: number, X: number): number => {
  if (!Number.isFinite(num) || !Number.isInteger(X) || X < 0) {
    throw new Error("Invalid input");
  }
  const factor = Math.pow(10, X);
  return Math.round(num * factor) / factor;
};
