/**
 * Convert number to kilo.
 * @param number - The number to convert to kilo.
 * @returns The formatted number.
 * @example
 * numberToKilo(1000); // 1K
 * numberToKilo(10000); // 10K
 */
export function numberToKilo(number: number): string {
  const formatter = new Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

export const currentYear = new Date().getFullYear();

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "An error occurred.";
}
